<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\UserGender;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'name', 'username', 'email', 'phone', 'avatar', 'gender', 'date_of_birth', 'address', 'created_At'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/Users/Index', [
            'page_settings' => [
                'title' => 'Pengguna',
                'subtitle' => 'Menampilkan semua data pengguna yang tersedia pada platform ini.'
            ],
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }
    public function create(): Response
    {
        return inertia('Admin/Users/Create', [
            'page_settings' => [
                'title' => 'Tambah Pengguna',
                'subtitle' => 'Buat pengguna baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.users.store'),
            ],
            'genders' => UserGender::options(),
        ]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        try {
            $user = User::create([
                'name' => $name = $request->name,
                'username' => usernameGenerator($name),
                'email' => $request->email,
                'password' => Hash::make(request()->password),
                'phone' => $request->phone,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'avatar' => $this->upload_file($request, 'avatar', 'users'),
                'address' => $request->address,
            ]);
            flashMessage(MessageType::CREATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }
}
