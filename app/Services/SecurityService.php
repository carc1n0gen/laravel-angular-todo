<?php

namespace App\Services;

use Hash;
use DateTime;
use App\User;
use App\Token;
use DateInterval;

class SecurityService
{
	public static function checkPassword($password, $hashedPassword)
	{
		return Hash::check($password, $hashedPassword);
	}

	public static function hashPassword($password)
	{
		return Hash::make($password);
	}

	public static function generateToken($user)
	{
		$token = new Token();
		$token->auth_token = bin2hex(openssl_random_pseudo_bytes(16));
		$token->expires_at = ( new DateTime() )->add( new DateInterval('PT10M') );
		$token->user()->associate($user);
		$token->save();
		return $token->auth_token;
	}
}