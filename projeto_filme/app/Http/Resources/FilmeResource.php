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
        $fotoUrl = null;
        if ($this->foto) {
            if (str_starts_with($this->foto, 'http://') || str_starts_with($this->foto, 'https://')) {
                $fotoUrl = $this->foto;
            } else {
                $baseUrl = $request->schemeAndHttpHost();
                $fotoUrl = $baseUrl . '/storage/' . ltrim($this->foto, '/');
            }
        }

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
            'foto' => $fotoUrl,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
