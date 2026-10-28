import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFilme, useDeleteFilme } from '../api/useFilmes';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FilmeDetailScreenProps } from '../../../navigation/types';
import { colors, spacing, borderRadius } from '../../../theme/theme';

export const FilmeDetailScreen: React.FC<FilmeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;
  const { data: filme, isLoading, isError, error } = useFilme(id);
  const deleteMutation = useDeleteFilme();

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir "${filme?.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync(id);
              Alert.alert('Sucesso', 'Filme excluído com sucesso!');
              navigation.goBack();
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível excluir o filme.');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingSpinner message="Carregando detalhes do filme..." />;
  }

  if (isError || !filme) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Filme não encontrado</Text>
        <Text style={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : 'Não foi possível carregar os detalhes do filme.'}
        </Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Poster */}
      <View style={styles.posterContainer}>
        {filme.foto ? (
          <Image
            source={{ uri: filme.foto }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.posterPlaceholder}>
            <Text style={styles.posterPlaceholderIcon}>🎬</Text>
            <Text style={styles.posterPlaceholderText}>Sem Imagem</Text>
          </View>
        )}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.header}>
          <Text style={styles.title}>{filme.titulo}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{filme.ano}</Text>
          </View>
        </View>

        <Text style={styles.genero}>{filme.genero}</Text>

        <View style={styles.divider} />

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>Diretor</Text>
            <Text style={styles.itemValue}>{filme.diretor}</Text>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>Duração</Text>
            <Text style={styles.itemValue}>
              {filme.duracao_em_minutos} minutos
            </Text>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>Data de Lançamento</Text>
            <Text style={styles.itemValue}>{filme.data_de_lancamento}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.editBtn]}
          onPress={() => navigation.navigate('FilmeForm', { id: filme.id })}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>✏️ Editar Filme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.deleteBtn]}
          onPress={handleDelete}
          disabled={deleteMutation.isPending}
          activeOpacity={0.8}
        >
          {deleteMutation.isPending ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={[styles.btnText, styles.deleteBtnText]}>
              🗑️ Excluir Filme
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  posterContainer: {
    width: '100%',
    height: 320,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  posterPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
  },
  posterPlaceholderIcon: {
    fontSize: 56,
    marginBottom: spacing.xs,
  },
  posterPlaceholderText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
  },
  badge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  genero: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: '600',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: spacing.md,
  },
  grid: {
    gap: spacing.md,
  },
  gridItem: {
    gap: 2,
  },
  itemLabel: {
    fontSize: 12,
    color: colors.textSubtle,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  itemValue: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '600',
  },
  actions: {
    gap: spacing.sm,
  },
  btn: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  deleteBtn: {
    backgroundColor: colors.dangerLight,
    borderWidth: 1.5,
    borderColor: colors.danger,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  deleteBtnText: {
    color: colors.secondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  errorMessage: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  backBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  backBtnText: {
    color: colors.white,
    fontWeight: '600',
  },
});
