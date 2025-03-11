<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        // $masyarakatRole = Role::create(['name' => RolesEnum::Masyarakat->value]);
        $kabalaiRole = Role::create(['name' => RolesEnum::Kabalai->value]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@bpkhtl15gorontalo.com',
        ])->assignRole($adminRole);
        // User::factory()->create([
        //     'name' => 'Masyarakat',
        //     'email' => 'moh.fikryansyah@gmail.com',
        // ])->assignRole($masyarakatRole);
        User::factory()->create([
            'name' => 'Kabalai',
            'email' => 'kabalai@bpkhtl15gorontalo.com',
        ])->assignRole($kabalaiRole);

    }
}
