<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route de fallback para garantir que o Render sirva as imagens do storage mesmo se o link simbólico não existir
Route::get('/storage/filmes/{filename}', function ($filename) {
    $path = storage_path('app/public/filmes/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file, 200)->header("Content-Type", $type);
});
