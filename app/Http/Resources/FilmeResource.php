<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilmeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'genero' => $this->genero,
            'diretor' => $this->diretor,
            'ano' => $this->ano,
            'duracao_em_minutos' => $this->duracao_em_minutos,
            'data_de_lancamento' => $this->data_de_lancamento instanceof \DateTimeInterface
                ? $this->data_de_lancamento->format('Y-m-d')
                : $this->data_de_lancamento,
            'foto' => $this->foto ? url('storage/'.$this->foto) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
