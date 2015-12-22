<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Services\SecurityService;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		if ($request->has('name') && $request->has('email') && $request->has('password'))
		{
			AuthService::register($request->input('name'), $request->input('email'), $request->input('password'));
			return;
		}

		return response('Missing parameters.')
			->header('Status', 500);
	}

	public function login(Request $request)
	{
		$user = User::where('email', $request->input('email'))->first();

		if (AuthService::attemptLogin($user, $request->input('password')))
		{
			return response(['user' => $user, 'auth_token' => SecurityService::generateToken($user)]);
		}

		return response('Invalid credentials.')
			->header('Status', 401);
	}

	// public function logout()
	// {

	// }
}