import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFilmes,
  getFilmeById,
  createFilme,
  updateFilme,
  deleteFilme,
} from './filmes.api';
import { FilmeFormData } from '../schemas/filme.schema';
import { SelectedImage } from '../types/filme.types';

export const FILMES_QUERY_KEY = ['filmes'];

export const useFilmes = () => {
  return useQuery({
    queryKey: FILMES_QUERY_KEY,
    queryFn: getFilmes,
  });
};

export const useFilme = (id: number) => {
  return useQuery({
    queryKey: ['filmes', id],
    queryFn: () => getFilmeById(id),
    enabled: !!id && !isNaN(id),
  });
};

export const useCreateFilme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      image,
    }: {
      data: FilmeFormData;
      image?: SelectedImage | null;
    }) => createFilme(data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FILMES_QUERY_KEY });
    },
  });
};

export const useUpdateFilme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      image,
    }: {
      id: number;
      data: FilmeFormData;
      image?: SelectedImage | null;
    }) => updateFilme(id, data, image),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: FILMES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['filmes', variables.id] });
    },
  });
};

export const useDeleteFilme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFilme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FILMES_QUERY_KEY });
    },
  });
};
