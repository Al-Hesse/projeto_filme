import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { FilmeListScreen } from '../features/filmes/screens/FilmeListScreen';
import { FilmeDetailScreen } from '../features/filmes/screens/FilmeDetailScreen';
import { FilmeFormScreen } from '../features/filmes/screens/FilmeFormScreen';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="FilmeList"
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
      <Stack.Screen
        name="FilmeList"
        component={FilmeListScreen}
        options={{
          title: 'Catálogo de Filmes',
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
    </Stack.Navigator>
  );
};
