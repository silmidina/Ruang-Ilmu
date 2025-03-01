<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class FineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'late_fee' => $this->late_fee,
            'other_fee' => $this->other_fee,
            'total_feee' => $this->total_feee,
            'payment_status' => $this->payment_status,
            'loan' => $this->whenLoaded('returnBook', [
                'id' => $this->returnBook?->laon?->id,
                'loan_code' => $this->returnBook?->laon?->loan_code,
                'loan_date' => Carbon::parse($this->returnBook?->loan->loan_date)->format('d M Y'),
                'due_date' => Carbon::parse($this->returnBook?->loan->due_date)->format('d M Y'),
            ]),
            'return_book' => $this->whenLoaded('returnBook', [
                'return_book_code' => $this->returnBook?->return_book_code,
                'return_date' => Carbon::parse($this->returnBook?->return_date)->format('d M Y'),
            ]),
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],
        ];
    }
}
