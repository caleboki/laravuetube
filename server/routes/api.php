<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('videos', 'VideoController@index');
Route::get('videos/{id}', 'VideoController@show');

Route::post('videos', 'VideoController@store');
Route::delete('videos/{id}', 'VideoController@destroy');

Route::put('videos/{id}', 'VideoController@update');

Route::get('users', 'UserController@index');
Route::post('users', 'UserController@store');

Route::post('sessions', 'CustomAuthController@login');