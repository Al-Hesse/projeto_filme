import { api } from '../../../services/api';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', credentials);
  return response.data;
};

export const registerApi = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register', credentials);
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post('/logout');
};

export const getMeApi = async (): Promise<User> => {
  const response = await api.get<{ user: User }>('/me');
  return response.data.user;
};
