<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmeController;
use Illuminate\Support\Facades\Route;

// Rotas públicas de Autenticação
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // CRUD completo de Filmes (Requer Autenticação)
    Route::apiResource('filmes', FilmeController::class);
});
