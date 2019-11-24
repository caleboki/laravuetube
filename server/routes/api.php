<?php


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

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

Route::get('videos', 'VideoController@index');
Route::get('videos/{id}', 'VideoController@show');

Route::post('videos', 'VideoController@store')->middleware('auth:api', 'admin');
Route::delete('videos/{id}', 'VideoController@destroy');

Route::put('videos/{id}', 'VideoController@update')->middleware('auth:api', 'admin');

Route::get('users', 'UserController@index');
Route::get('users/{id}', 'UserController@show');
Route::post('users', 'UserController@store');
Route::post('video_played', 'UserController@playedVideos');

Route::get('tags', 'TagController@index');
Route::post('attach_tag', 'TagController@attachTag');
Route::post('detach_tag', 'TagController@detachTag');
Route::post('tags', 'TagController@store');
Route::get('tags/{id}', 'TagController@show');
Route::put('tags/{id}', 'TagController@update');
Route::delete('tags/{id}', 'TagController@destroy');