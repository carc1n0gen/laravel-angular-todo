<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function status()
    {
        if (Auth::check()) {
            return;
        }

        return response('', 401);
    }
}
