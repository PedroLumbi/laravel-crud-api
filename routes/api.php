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

Route::get('students', [studentController::class, 'index']);

Route::get('students/{id}', [studentController::class, 'show']);

Route::post('students', [studentController::class, 'store']);

Route::put('students/{id}', [studentController::class, 'update']);

Route::patch('students/{id}', [studentController::class, 'updatePartial']);

Route::delete('students/{id}', [studentController::class, 'destroy']);
