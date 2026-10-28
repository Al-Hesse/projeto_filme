import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const filmeFormSchema = z.object({
  titulo: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(255, 'Máximo de 255 caracteres'),
  genero: z
    .string()
    .min(1, 'O gênero é obrigatório')
    .max(100, 'Máximo de 100 caracteres'),
  diretor: z
    .string()
    .min(1, 'O diretor é obrigatório')
    .max(255, 'Máximo de 255 caracteres'),
  ano: z
    .string()
    .min(1, 'O ano é obrigatório')
    .refine((val) => !isNaN(Number(val)) && Number.isInteger(Number(val)), {
      message: 'Ano inválido',
    })
    .refine((val) => Number(val) >= 1800, {
      message: 'O ano deve ser no mínimo 1800',
    })
    .refine((val) => Number(val) <= currentYear + 10, {
      message: `O ano não pode ser maior que ${currentYear + 10}`,
    }),
  duracao_em_minutos: z
    .string()
    .min(1, 'A duração é obrigatória')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: 'A duração deve ser de pelo menos 1 minuto',
    }),
  data_de_lancamento: z
    .string()
    .min(1, 'A data de lançamento é obrigatória')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido (AAAA-MM-DD)'),
});

export type FilmeFormData = z.infer<typeof filmeFormSchema>;
