<?php

use Illuminate\Database\Seeder;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'username' => env('ADMIN_USERNAME', 'admin'),
            'email' => 'admin@mail.com',
            'password' => bcrypt(env('ADMIN_PASSWORD', 'secret')),
        ]);
    }
}
