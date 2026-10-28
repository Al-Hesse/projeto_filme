export interface Filme {
  id: number;
  titulo: string;
  genero: string;
  diretor: string;
  ano: number;
  duracao_em_minutos: number;
  data_de_lancamento: string;
  foto: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface FilmeListResponse {
  data: Filme[];
}

export interface FilmeSingleResponse {
  data: Filme;
  message?: string;
}

export interface SelectedImage {
  uri: string;
  name?: string;
  type?: string;
}
