<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\FinePaymentStatus;

class Fine extends Model
{
    protected $fillable = [
        'return_book_id',
        'user_id',
        'late_fee',
        'other_fee',
        'total_fee',
        'payment_status',
        'fine_date',
    ];

    protected function casts(): array
    {
        return [
            'payment_status' => FinePaymentStatus::class,
            'fine_date' => 'date',
        ];
    }
}
