import { api } from '../../../services/api';
import { Filme, FilmeListResponse, FilmeSingleResponse, SelectedImage } from '../types/filme.types';
import { FilmeFormData } from '../schemas/filme.schema';

export const getFilmes = async (): Promise<Filme[]> => {
  const response = await api.get<FilmeListResponse>('/filmes');
  return response.data.data;
};

export const getFilmeById = async (id: number): Promise<Filme> => {
  const response = await api.get<FilmeSingleResponse>(`/filmes/${id}`);
  return response.data.data;
};

export const createFilme = async (
  data: FilmeFormData,
  image?: SelectedImage | null
): Promise<Filme> => {
  const formData = new FormData();
  formData.append('titulo', data.titulo);
  formData.append('genero', data.genero);
  formData.append('diretor', data.diretor);
  formData.append('ano', String(Number(data.ano)));
  formData.append('duracao_em_minutos', String(Number(data.duracao_em_minutos)));
  formData.append('data_de_lancamento', data.data_de_lancamento);

  if (image && image.uri) {
    const filename = image.uri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('foto', {
      uri: image.uri,
      name: filename,
      type: image.type || type,
    } as unknown as Blob);
  }

  const response = await api.post<FilmeSingleResponse>('/filmes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

export const updateFilme = async (
  id: number,
  data: FilmeFormData,
  image?: SelectedImage | null
): Promise<Filme> => {
  const formData = new FormData();
  formData.append('_method', 'PUT');
  formData.append('titulo', data.titulo);
  formData.append('genero', data.genero);
  formData.append('diretor', data.diretor);
  formData.append('ano', String(Number(data.ano)));
  formData.append('duracao_em_minutos', String(Number(data.duracao_em_minutos)));
  formData.append('data_de_lancamento', data.data_de_lancamento);

  if (image && image.uri) {
    const filename = image.uri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('foto', {
      uri: image.uri,
      name: filename,
      type: image.type || type,
    } as unknown as Blob);
  }

  const response = await api.post<FilmeSingleResponse>(`/filmes/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

export const deleteFilme = async (id: number): Promise<void> => {
  await api.delete(`/filmes/${id}`);
};
