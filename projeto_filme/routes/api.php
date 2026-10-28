<?php

use App\Http\Controllers\FilmeController;
use Illuminate\Support\Facades\Route;

Route::apiResource('filmes', FilmeController::class);
