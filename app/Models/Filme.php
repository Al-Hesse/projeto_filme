<?php

namespace App\Models;

use Database\Factories\FilmeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filme extends Model
{
    /** @use HasFactory<FilmeFactory> */
    use HasFactory;

    protected $fillable = [
        'titulo',
        'genero',
        'diretor',
        'ano',
        'duracao_em_minutos',
        'data_de_lancamento',
        'foto',
    ];

    protected $casts = [
        'ano' => 'integer',
        'duracao_em_minutos' => 'integer',
        'data_de_lancamento' => 'date',
    ];
}
