<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        
        $user = new App\User;
        $user->name = 'Bob';
        $user->email = 'bob@example.com';
        $user->password = bcrypt('1234');
        $user->save();
        
        $todo = new App\Todo;
        $todo->user_id = $user->id;
        $todo->name = 'Do the thing!';
        $todo->save();
    }
}
