<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Response;

class PublisherController extends Controller
{
    public function index(): Response
    {
        $publishers = Publisher::query()
            ->select(['id', 'name', 'slug', 'address', 'email', 'phone', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        return inertia('Admin/Publishers/Index', [
            'page_settings' => [
                'title' => 'Penerbit',
                'subtitle' => 'Menampilkan semua data penerbit yang tersedia pada platform ini',
            ],
            'publishers' => PublisherResource::collection($publishers)->additional([
                'meta' => [
                    'has_pages' => $publishers->hasPages(),
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
