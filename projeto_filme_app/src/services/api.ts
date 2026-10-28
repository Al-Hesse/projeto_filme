import axios from 'axios';
import { Platform } from 'react-native';

// O backend Laravel (Docker) está rodando na porta 8088
// - Para celular físico na mesma rede Wi-Fi: use o IP local (192.168.0.184:8088)
// - Para Android Emulator: 10.0.2.2:8088
// - Para iOS Simulator / Web: localhost:8088
export const API_BASE_URL = Platform.select({
  android: 'http://192.168.0.184:8088/api', // IP local para funcionar tanto em celular físico quanto emulador
  ios: 'http://192.168.0.184:8088/api',
  default: 'http://localhost:8088/api',
});

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});
