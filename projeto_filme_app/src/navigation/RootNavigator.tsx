import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { FilmeListScreen } from '../features/filmes/screens/FilmeListScreen';
import { FilmeDetailScreen } from '../features/filmes/screens/FilmeDetailScreen';
import { FilmeFormScreen } from '../features/filmes/screens/FilmeFormScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import { useAuth } from '../features/auth/context/AuthContext';
import { colors, spacing, borderRadius } from '../theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.header,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Autenticação',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Criar Conta',
              headerBackTitle: 'Voltar',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="FilmeList"
            component={FilmeListScreen}
            options={{
              title: 'Catálogo de Filmes',
              headerRight: () => (
                <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Sair 🚪</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="FilmeDetail"
            component={FilmeDetailScreen}
            options={({ route }) => ({
              title: route.params.titulo || 'Detalhes do Filme',
            })}
          />
          <Stack.Screen
            name="FilmeForm"
            component={FilmeFormScreen}
            options={({ route }) => ({
              title: route.params?.id ? 'Editar Filme' : 'Novo Filme',
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primaryDark,
    borderRadius: borderRadius.sm,
  },
  logoutText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
