<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReturnBookFrontResource;
use App\Models\ReturnBook;
use Illuminate\Http\Request;
use Inertia\Response;

class ReturnBookFrontController extends Controller
{
    public function index(): Response
    {
        $return_books = ReturnBook::query()
            ->select(['id', 'return_book_code', 'status', 'loan_id', 'user_id', 'book_id', 'return_date', 'created_at'])
            ->where('user_id', auth()->user()->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Front/ReturnBooks/Index', [
            'page_settings' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Menampilkan semua data pengembalian anda yang tersedia pada platform ini.',
            ],
            'return_books' => ReturnBookFrontResource::collection($return_books)->additional([
                'meta' => [
                    'has_pages' => $return_books->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],
            'page_data' => [
                'returned' => ReturnBook::query()->member(auth()->user()->id)->returned()->count(),
                'fine' => ReturnBook::query()->member(auth()->user()->id)->fine()->count(),
                'checked' => ReturnBook::query()->member(auth()->user()->id)->checked()->count(),
            ],
        ]);
    }
}
