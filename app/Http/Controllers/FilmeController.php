<?php

namespace App\Http\Controllers;

use App\Http\Resources\FilmeResource;
use App\Models\Filme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilmeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filmes = Filme::orderBy('id', 'desc')->get();

        return FilmeResource::collection($filmes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'genero' => 'required|string|max:100',
            'diretor' => 'required|string|max:255',
            'ano' => 'required|integer|min:1800|max:'.(date('Y') + 10),
            'duracao_em_minutos' => 'required|integer|min:1',
            'data_de_lancamento' => 'required|date',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('filmes', 'public');
            $data['foto'] = $path;
        }

        $filme = Filme::create($data);

        return response()->json([
            'message' => 'Filme cadastrado com sucesso!',
            'data' => new FilmeResource($filme),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Filme $filme)
    {
        return new FilmeResource($filme);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Filme $filme)
    {
        $rules = [
            'titulo' => 'sometimes|required|string|max:255',
            'genero' => 'sometimes|required|string|max:100',
            'diretor' => 'sometimes|required|string|max:255',
            'ano' => 'sometimes|required|integer|min:1800|max:'.(date('Y') + 10),
            'duracao_em_minutos' => 'sometimes|required|integer|min:1',
            'data_de_lancamento' => 'sometimes|required|date',
            'foto' => 'nullable',
        ];

        if ($request->hasFile('foto')) {
            $rules['foto'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240';
        }

        $data = $request->validate($rules);

        if ($request->hasFile('foto')) {
            if ($filme->foto && Storage::disk('public')->exists($filme->foto)) {
                Storage::disk('public')->delete($filme->foto);
            }
            $path = $request->file('foto')->store('filmes', 'public');
            $data['foto'] = $path;
        } elseif ($request->exists('foto') && $request->input('foto') === null) {
            if ($filme->foto && Storage::disk('public')->exists($filme->foto)) {
                Storage::disk('public')->delete($filme->foto);
            }
            $data['foto'] = null;
        } else {
            unset($data['foto']);
        }

        $filme->update($data);

        return response()->json([
            'message' => 'Filme atualizado com sucesso!',
            'data' => new FilmeResource($filme),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filme $filme)
    {
        if ($filme->foto && Storage::disk('public')->exists($filme->foto)) {
            Storage::disk('public')->delete($filme->foto);
        }

        $filme->delete();

        return response()->json([
            'message' => 'Filme excluído com sucesso!',
        ]);
    }
}
