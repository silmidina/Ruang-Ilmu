<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function index(): Response
    {
        $announcements = Announcement::query()
            ->select(['id', 'message', 'url', 'is_active', 'created_at'])
            ->paginate(1)
            ->withQueryString();

        return inertia('Admin/Announcements/Index', [
            'page_settings' => [
                'title' => 'Pengumuman',
                'subtitle' => 'Menampilkan semua data pengumuman yang tersedia pada platform ini.',
            ],
            'announcements' => AnnouncementResource::collection($announcements)->additional([
                'meta' => [
                    'has_page' => $announcements->hasPages(),
                ],
            ]),
        ]);
    }
}
