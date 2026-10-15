<?php

namespace Database\Seeders;

use App\Models\Filme;
use Illuminate\Database\Seeder;

class FilmeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filmes = [
            [
                'titulo' => 'O Enigma do Horizonte Cósmico',
                'genero' => 'Ficção Científica',
                'diretor' => 'Valéria Vance',
                'ano' => 2024,
                'duracao_em_minutos' => 142,
                'data_de_lancamento' => '2024-03-15',
                'foto' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'Sombras no Vale da Névoa',
                'genero' => 'Suspense',
                'diretor' => 'Henrique Thorne',
                'ano' => 2023,
                'duracao_em_minutos' => 118,
                'data_de_lancamento' => '2023-10-20',
                'foto' => 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'O Último Samurai Cibernético',
                'genero' => 'Ação',
                'diretor' => 'Kenji Takahashi',
                'ano' => 2025,
                'duracao_em_minutos' => 135,
                'data_de_lancamento' => '2025-07-08',
                'foto' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'A Sinfonia das Estrelas Perdidas',
                'genero' => 'Drama',
                'diretor' => 'Elena Rostova',
                'ano' => 2022,
                'duracao_em_minutos' => 156,
                'data_de_lancamento' => '2022-11-12',
                'foto' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'O Segredo da Mansão Ravenwood',
                'genero' => 'Terror',
                'diretor' => 'Arthur Pendelton',
                'ano' => 2023,
                'duracao_em_minutos' => 105,
                'data_de_lancamento' => '2023-08-31',
                'foto' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'Crônicas de um Reino Esquecido',
                'genero' => 'Fantasia',
                'diretor' => 'Morgana Lefay',
                'ano' => 2021,
                'duracao_em_minutos' => 168,
                'data_de_lancamento' => '2021-12-18',
                'foto' => 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'Amor em Tempos de Supernova',
                'genero' => 'Romance',
                'diretor' => 'Gabriel Moreau',
                'ano' => 2024,
                'duracao_em_minutos' => 110,
                'data_de_lancamento' => '2024-06-12',
                'foto' => 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'Operação Crepúsculo Rubro',
                'genero' => 'Ação',
                'diretor' => 'Marcus Holloway',
                'ano' => 2025,
                'duracao_em_minutos' => 128,
                'data_de_lancamento' => '2025-01-26',
                'foto' => 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'O Mistério do Relógio Ancestral',
                'genero' => 'Aventura',
                'diretor' => 'Clara Lindqvist',
                'ano' => 2020,
                'duracao_em_minutos' => 98,
                'data_de_lancamento' => '2020-09-04',
                'foto' => 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'titulo' => 'A Dança dos Fantasmas de Neon',
                'genero' => 'Cyberpunk',
                'diretor' => 'Dante Sterling',
                'ano' => 2026,
                'duracao_em_minutos' => 140,
                'data_de_lancamento' => '2026-05-19',
                'foto' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
            ],
        ];

        Filme::truncate();

        foreach ($filmes as $filme) {
            Filme::create($filme);
        }
    }
}
