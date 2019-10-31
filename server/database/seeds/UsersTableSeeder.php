<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Caleb Oki',
            'email' => 'caleboki@gmail.com',
            'admin' => 1,
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'admin' => 0,
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'admin' => 0,
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'admin' => 0,
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'admin' => 0,
            'password' => bcrypt('password')
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'admin' => 0,
            'password' => bcrypt('password')
        ]);
    }
}
