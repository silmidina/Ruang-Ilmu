<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryFrontResource;
use App\Models\Category;
use Illuminate\Http\Request;

class BookFrontController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->whereHas('books')
            ->with([
                'books' => fn($query) => $query->limit(4),
            ])
            ->latest('created_at')
            ->get();

        return inertia('Front/Books/Index', [
            'page_settings' => [
                'title' => 'Buku',
                'subtitle' => 'Menampilkan semua buku yang tersedia pada platform ini'
            ],
            'categories' => CategoryFrontResource::collection($categories),
        ]);
    }
}
