<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FoodController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('example', function () {
        return response()->json([
            'message' => 'This is an example endpoint.',
            'status' => 1,
            'title' => 'Heads up!'
        ]);
    })->name('example');

    Route::get('/foods', [FoodController::class, 'index']);
});
