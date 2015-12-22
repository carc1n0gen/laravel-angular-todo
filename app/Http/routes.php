<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::post('/v1/auth/login', 'AuthController@login');
Route::post('/v1/auth/register', 'AuthController@register');

Route::group(['middleware' => 'auth'], function () {
	Route::resource('/v1/task', 'TaskController',
		['except' => ['create', 'edit']]);
});
