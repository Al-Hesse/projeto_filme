import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useFilme, useCreateFilme, useUpdateFilme } from '../api/useFilmes';
import { FilmeForm } from '../components/FilmeForm';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FilmeFormScreenProps } from '../../../navigation/types';
import { FilmeFormData } from '../schemas/filme.schema';
import { SelectedImage } from '../types/filme.types';
import { colors } from '../../../theme/theme';

export const FilmeFormScreen: React.FC<FilmeFormScreenProps> = ({
  route,
  navigation,
}) => {
  const id = route.params?.id;
  const isEditing = !!id;

  const { data: filme, isLoading: isLoadingFilme } = useFilme(id ?? 0);
  const createMutation = useCreateFilme();
  const updateMutation = useUpdateFilme();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (
    data: FilmeFormData,
    image: SelectedImage | null
  ) => {
    try {
      if (isEditing && id) {
        await updateMutation.mutateAsync({ id, data, image });
        Alert.alert('Sucesso', 'Filme atualizado com sucesso!');
        navigation.goBack();
      } else {
        await createMutation.mutateAsync({ data, image });
        Alert.alert('Sucesso', 'Filme cadastrado com sucesso!');
        navigation.goBack();
      }
    } catch (error: any) {
      const serverMessage =
        error?.response?.data?.message ||
        'Ocorreu um erro ao salvar o filme. Verifique os dados e tente novamente.';
      Alert.alert('Erro ao Salvar', serverMessage);
    }
  };

  if (isEditing && isLoadingFilme) {
    return <LoadingSpinner message="Carregando dados do filme..." />;
  }

  return (
    <View style={styles.container}>
      <FilmeForm
        initialData={isEditing ? filme : null}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitButtonText={isEditing ? 'Salvar Alterações' : 'Cadastrar Filme'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
