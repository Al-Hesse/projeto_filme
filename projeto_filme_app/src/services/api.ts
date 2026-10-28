import axios from 'axios';

// URL da API Laravel hospedada na nuvem (Render)
// Funciona em qualquer lugar (faculdade, casa, Wi-Fi, 4G, celular físico e emulador)
export const API_BASE_URL = 'https://projeto-filme-o03c.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});
