import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { loginApi, registerApi, logoutApi } from '../api/auth.api';
import { setAuthToken } from '../../../services/api';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Carrega credenciais salvas do AsyncStorage ao iniciar o aplicativo
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedUser = await AsyncStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          setAuthToken(storedToken);
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.warn('Erro ao carregar token salvo:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await loginApi(credentials);
      setAuthToken(response.access_token);
      setToken(response.access_token);
      setUser(response.user);

      // Persiste no celular
      await AsyncStorage.setItem(TOKEN_KEY, response.access_token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const response = await registerApi(credentials);
      setAuthToken(response.access_token);
      setToken(response.access_token);
      setUser(response.user);

      // Persiste no celular
      await AsyncStorage.setItem(TOKEN_KEY, response.access_token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
    } catch (e) {
      // Limpa localmente mesmo se falhar a rede
    } finally {
      setAuthToken(null);
      setToken(null);
      setUser(null);

      // Remove do celular
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
