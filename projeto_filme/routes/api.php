<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmeController;
use Illuminate\Support\Facades\Route;

// Rotas públicas de Autenticação
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Consulta de Filmes (Pública - permite visualizar o catálogo)
Route::get('/filmes', [FilmeController::class, 'index']);
Route::get('/filmes/{filme}', [FilmeController::class, 'show']);

// Rotas protegidas por Sanctum (Ações que alteram dados)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Inserção, Edição e Exclusão de Filmes (Requer Autenticação)
    Route::post('/filmes', [FilmeController::class, 'store']);
    Route::match(['put', 'patch'], '/filmes/{filme}', [FilmeController::class, 'update']);
    Route::delete('/filmes/{filme}', [FilmeController::class, 'destroy']);
});
