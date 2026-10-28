import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useFilmes } from '../api/useFilmes';
import { FilmeCard } from '../components/FilmeCard';
import { EmptyList } from '../components/EmptyList';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FilmeListScreenProps } from '../../../navigation/types';
import { colors, spacing, borderRadius } from '../../../theme/theme';

export const FilmeListScreen: React.FC<FilmeListScreenProps> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: filmes, isLoading, isError, error, refetch, isRefetching } =
    useFilmes();

  const filteredFilmes = useMemo(() => {
    if (!filmes) return [];
    if (!searchQuery.trim()) return filmes;
    const q = searchQuery.toLowerCase();
    return filmes.filter(
      (f) =>
        f.titulo.toLowerCase().includes(q) ||
        f.genero.toLowerCase().includes(q) ||
        f.diretor.toLowerCase().includes(q)
    );
  }, [filmes, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner message="Carregando catálogo de filmes..." />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Erro ao carregar filmes</Text>
        <Text style={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : 'Não foi possível conectar ao servidor.'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título, gênero ou diretor..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredFilmes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FilmeCard
            filme={item}
            onPress={() =>
              navigation.navigate('FilmeDetail', {
                id: item.id,
                titulo: item.titulo,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[colors.secondary]}
            tintColor={colors.secondary}
          />
        }
        ListEmptyComponent={
          <EmptyList
            message={
              searchQuery
                ? 'Nenhum filme corresponde à sua busca.'
                : 'Nenhum filme cadastrado ainda.'
            }
          />
        }
      />

      {/* Floating Action Button (Cadastrar Novo) */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('FilmeForm', {})}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  searchInput: {
    backgroundColor: colors.inputBg,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.white,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 80,
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
    marginBottom: spacing.xs,
  },
  errorMessage: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
  },
  fabIcon: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 34,
  },
});
