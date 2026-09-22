<?php

namespace Database\Factories;

use App\Models\Filme;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Filme>
 */
class FilmeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'genero' => $this->faker->randomElement(['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance', 'Documentário']),
            'diretor' => $this->faker->name(),
            'ano' => $this->faker->numberBetween(1980, 2026),
            'duracao_em_minutos' => $this->faker->numberBetween(80, 200),
            'data_de_lancamento' => $this->faker->date(),
            'foto' => null, // Photo starts empty unless uploaded
        ];
    }
}
