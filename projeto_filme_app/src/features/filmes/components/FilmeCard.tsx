import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Filme } from '../types/filme.types';
import { colors, spacing, borderRadius } from '../../../theme/theme';

interface FilmeCardProps {
  filme: Filme;
  onPress: () => void;
}

export const FilmeCard: React.FC<FilmeCardProps> = ({ filme, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {filme.foto ? (
          <Image
            source={{ uri: filme.foto }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>🎬</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {filme.titulo}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{filme.ano}</Text>
          </View>
        </View>

        <Text style={styles.genero} numberOfLines={1}>
          {filme.genero}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.meta} numberOfLines={1}>
            👤 {filme.diretor}
          </Text>
          <Text style={styles.meta}>
            ⏱ {filme.duracao_em_minutos} min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 90,
    height: 120,
    backgroundColor: colors.primaryDark,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
  },
  placeholderIcon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  badge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  badgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  genero: {
    fontSize: 13,
    color: colors.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
