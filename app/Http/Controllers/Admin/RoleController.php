<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Http\Resources\Admin\RoleResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

class RoleController extends Controller
{
    public function index(): Response
    {
        $roles = Role::query()
            ->select(['id', 'name', 'guard_name', 'created_at'])
            ->when(request()->search, function ($query, $search) {
                $query->whereAny([
                    'name',
                    'guard_name',
                ], 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/Roles/Index', [
            'page_settings' => [
                'title' => 'Peran',
                'subtitle' => 'Menampilkan semua data peran yang tersedia pada platform ini',
            ],
            'roles' => RoleResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
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
        return inertia('Admin/Roles/Create', [
            'page_settings' => [
                'title' => 'Tambah Role',
                'subtitle' => 'Tambahkan data peran baru di sini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.roles.store'),
            ],
        ]);
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        try {
            Role::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name,
            ]);
            flashMessage(MessageType::CREATED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }
}
