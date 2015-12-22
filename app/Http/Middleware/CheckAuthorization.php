<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use App\Token;
use App\Services\AuthService;

class CheckAuthorization
{
	public function handle($request, Closure $next)
	{
		$authToken = $request->header('Auth-token');

		if (!$authToken || !AuthService::tokenIsValid($authToken))
		{
			//return abort(401, 'Not authorized.');

			return response('Not authorized.')
				->header('Status', 401);
		}

		AuthService::extendToken($authToken);
		Auth::login(Token::where('auth_token', $authToken)->first()->user);
		return $next($request);
	}
}