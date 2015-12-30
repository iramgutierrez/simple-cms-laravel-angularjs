<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => 'web'], function () {

    //Route::auth();

    Route::get('/' , function(){
        return File::get(public_path() . '/cms/index.html');
    });

    Route::post('/login' , 'Auth\AuthController@login');

    Route::get('/logout' , 'Auth\AuthController@logout');

    Route::get('checkLogin' , function(){

        return response()->json(["loggedIn" => \Auth::check() ]);
    });

    Route::resource('posts' , 'PostController');

    Route::resource('categories' , 'CategoryController');

    Route::post('posts/upload-image' , 'PostController@uploadImage');

    Route::group(['prefix' => 'api'], function () {

        Route::resource('posts', 'Api\PostController',
            ['only' => ['index', 'show']]);

        Route::resource('categories', 'Api\CategoryController',
            ['only' => ['index', 'show']]);

    });

});
