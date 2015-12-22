<?php

namespace App\Services;

use DateTime;
use App\User;
use App\Token;
use DateInterval;

class AuthService
{
	public static function register($name, $email, $password)
	{
		$user = new User();
		$user->name = $name;
		$user->email = $email;
		$user->password = SecurityService::hashPassword($password);
		$user->save();
	}

	public static function attemptLogin($user, $password)
	{
		return $user && SecurityService::checkPassword($password, $user->password);
	}

	public static function tokenIsValid($authToken)
	{
		$token = Token::where('auth_token', $authToken)->first();
		return $token && new DateTime() < new DateTime($token->expires_at);
	}

	public static function extendToken($authToken)
	{
		$token = Token::where('auth_token', $authToken)->first();
		$token->expires_at = (new DateTime())->add( new DateInterval('PT10M') );
		$token->save();
	}
}