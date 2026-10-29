import { z } from 'zod';

const currentYear = new Date().getFullYear();

/**
 * Normaliza qualquer formato de data comum (DD/MM/AAAA, DD-MM-AAAA, AAAA-MM-DD, AAAA/MM/DD, DDMMAAAA)
 * para o formato padrão do banco de dados (AAAA-MM-DD).
 */
export const normalizeDateToISO = (val: string): string | null => {
  if (!val) return null;
  const clean = val.trim();

  // Formato AAAA-MM-DD ou AAAA/MM/DD
  const isoMatch = clean.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const m = Number(month);
    const d = Number(day);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  // Formato DD/MM/AAAA ou DD-MM-AAAA
  const brMatch = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (brMatch) {
    const [, day, month, year] = brMatch;
    const m = Number(month);
    const d = Number(day);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  // Formato numérico puro DDMMAAAA (ex: 25122023)
  const digitsOnly = clean.replace(/\D/g, '');
  if (digitsOnly.length === 8) {
    const day = digitsOnly.substring(0, 2);
    const month = digitsOnly.substring(2, 4);
    const year = digitsOnly.substring(4, 8);
    const m = Number(month);
    const d = Number(day);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${month}-${day}`;
    }
  }

  return null;
};

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
    .refine((val) => normalizeDateToISO(val) !== null, {
      message: 'Data inválida. Ex: 25/12/2023, 25-12-2023 ou 2023-12-25',
    })
    .transform((val) => normalizeDateToISO(val) as string),
});

export type FilmeFormData = z.infer<typeof filmeFormSchema>;
