<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AssignUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class AssignUserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'email', 'username'])
            ->when(request()->search, function ($query, $search) {
                $query->where('email', 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->with('roles')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/AssignUsers/Index', [
            'page_settings' => [
                'title' => 'Tetapkan Peran',
                'subtitle' => 'Menampilkan semua data tetapkan peran yang tersedia pada platform ini',
            ],
            'users' => AssignUserResource::collection($users)->additional([
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
}
