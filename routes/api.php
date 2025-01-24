<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

use App\Http\Controllers\api\studentController;

/*
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::get('students', function () {
    return "Get student List";
});

Route::get('students/{id}', function ($id) {
    return "Get a student with ID: " . $id;
});

Route::post('students/{id}', function ($id) {
    return "Create a student with ID: $id";
});

Route::put('students/{id}', function ($id) {
    return "Updating student with ID: $id";
});

Route::delete('students/{id}', function ($id) {
    return "Deleting student with ID: $id";
});
