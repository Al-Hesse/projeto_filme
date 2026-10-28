<?php

namespace Tests\Feature;

use App\Models\Filme;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FilmeTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_all_movies(): void
    {
        Filme::factory()->count(3)->create();

        $response = $this->getJson('/api/filmes');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'titulo',
                        'genero',
                        'diretor',
                        'ano',
                        'duracao_em_minutos',
                        'data_de_lancamento',
                        'foto',
                        'created_at',
                        'updated_at',
                    ],
                ],
            ]);
    }

    public function test_can_create_movie_without_photo(): void
    {
        $payload = [
            'titulo' => 'Matrix',
            'genero' => 'Ficção Científica',
            'diretor' => 'Lana Wachowski, Lilly Wachowski',
            'ano' => 1999,
            'duracao_em_minutos' => 136,
            'data_de_lancamento' => '1999-05-21',
        ];

        $response = $this->postJson('/api/filmes', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'titulo' => 'Matrix',
                'genero' => 'Ficção Científica',
                'foto' => null,
            ]);

        $this->assertDatabaseHas('filmes', [
            'titulo' => 'Matrix',
            'ano' => 1999,
        ]);
    }

    public function test_can_create_movie_with_photo(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('poster.jpg', 100, 'image/jpeg');

        $payload = [
            'titulo' => 'Interstellar',
            'genero' => 'Ficção Científica',
            'diretor' => 'Christopher Nolan',
            'ano' => 2014,
            'duracao_em_minutos' => 169,
            'data_de_lancamento' => '2014-11-06',
            'foto' => $file,
        ];

        $response = $this->postJson('/api/filmes', $payload);

        $response->assertStatus(201);

        $filme = Filme::first();
        $this->assertNotNull($filme->foto);
        Storage::disk('public')->assertExists($filme->foto);

        $response->assertJsonFragment([
            'foto' => url('storage/'.$filme->foto),
        ]);
    }

    public function test_can_show_movie_by_id(): void
    {
        $filme = Filme::factory()->create();

        $response = $this->getJson("/api/filmes/{$filme->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $filme->id)
            ->assertJsonPath('data.titulo', $filme->titulo);
    }

    public function test_can_update_movie_text_fields(): void
    {
        $filme = Filme::factory()->create([
            'titulo' => 'Old Title',
            'ano' => 2000,
        ]);

        $response = $this->putJson("/api/filmes/{$filme->id}", [
            'titulo' => 'New Title',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.titulo', 'New Title')
            ->assertJsonPath('data.ano', 2000); // kept unchanged

        $this->assertDatabaseHas('filmes', [
            'id' => $filme->id,
            'titulo' => 'New Title',
        ]);
    }

    public function test_can_update_movie_photo(): void
    {
        Storage::fake('public');

        $oldFile = UploadedFile::fake()->create('old.jpg', 100, 'image/jpeg');
        $newFile = UploadedFile::fake()->create('new.jpg', 100, 'image/jpeg');

        // Create movie with old photo
        $filme = Filme::factory()->create([
            'foto' => $oldFile->store('filmes', 'public'),
        ]);

        // Verify old file exists
        Storage::disk('public')->assertExists($filme->foto);
        $oldPath = $filme->foto;

        // Perform POST request with _method=PUT to emulate multipart PUT in Laravel
        $response = $this->postJson("/api/filmes/{$filme->id}", [
            '_method' => 'PUT',
            'foto' => $newFile,
        ]);

        $response->assertStatus(200);

        // Verify old file was deleted
        Storage::disk('public')->assertMissing($oldPath);

        // Verify new file exists
        $filme->refresh();
        Storage::disk('public')->assertExists($filme->foto);
    }

    public function test_can_delete_movie(): void
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->create('delete-me.jpg', 100, 'image/jpeg');

        $filme = Filme::factory()->create([
            'foto' => $file->store('filmes', 'public'),
        ]);

        $photoPath = $filme->foto;
        Storage::disk('public')->assertExists($photoPath);

        $response = $this->deleteJson("/api/filmes/{$filme->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Filme excluído com sucesso!',
            ]);

        $this->assertDatabaseMissing('filmes', [
            'id' => $filme->id,
        ]);

        Storage::disk('public')->assertMissing($photoPath);
    }

    public function test_create_movie_validation_errors(): void
    {
        $response = $this->postJson('/api/filmes', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'titulo',
                'genero',
                'diretor',
                'ano',
                'duracao_em_minutos',
                'data_de_lancamento',
            ]);
    }
}
