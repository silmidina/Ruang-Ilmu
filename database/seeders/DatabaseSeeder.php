<?php

namespace Database\Seeders;

use App\Models\Publisher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Roronoa Zoro',
            'username' => 'Zoro',
            'email' => 'zoro@gmail.com',
        ]);
        $this->call(CategorySeeder::class);
        $this->call(PublisherSeeder::class);
    }
}
