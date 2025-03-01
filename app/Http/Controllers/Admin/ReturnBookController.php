<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\ReturnBookCondition;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReturnBookRequest;
use App\Http\Resources\Admin\ReturnBookResource;
use App\Models\FineSetting;
use App\Models\Loan;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class ReturnBookController extends Controller
{
    public function index(): Response
    {
        $return_books = ReturnBook::query()
            ->select(['id', 'return_book_code', 'status', 'loan_id', 'user_id', 'book_id', 'return_date', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/ReturnBooks/Index', [
            'page_settings' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Menampilkan semua data pengembalian yang tersedia pada platform ini.',
            ],
            'return_books' => ReturnBookResource::collection($return_books)->additional([
                'meta' => [
                    'has_pages' => $return_books->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],
        ]);
    }

    public function create(Loan $loan): Response|RedirectResponse
    {
        if ($loan->returnBook()->exists()) {
            return to_route('admin.loans.index');
        }

        if (!FineSetting::first()) {
            return to_route('admin.fine-settings.create');
        }
        return inertia('Admin/ReturnBooks/Create', [
            'page_settings' => [
                'title' => 'Pengembalian Buku',
                'subtitle' => 'Kembalikan buku yang dipinjam disini. Klik kembalikan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.return-books.store', $loan),
            ],
            'loan' => $loan->load([
                'user',
                'book' => fn($query) => $query->with('publisher'),
            ]),
            'date' => [
                'return_date' => Carbon::now()->toDateString(),
            ],
            'conditions' => ReturnBookCondition::options(),
        ]);
    }

    public function store(Loan $loan, ReturnBookRequest $request): RedirectResponse
    {
        try {
            $return_book = $loan->returnBook()->create([
                'return_book_code' => str()->lower(str()->random(10)),
                'book_id' => $loan->book_id,
                'user_id' => $loan->user_id,
                'return_date' => Carbon::today(),
            ]);
            $return_book_check = $return_book->returnBookCheck()->create([
                'condition' => $request->condition,
                'notes' => $request->notes,
            ]);
            flashMessage('Berhasil mengembalikan buku.');
            return to_route('admin.return-books.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.loans.index');
        }
    }
}
