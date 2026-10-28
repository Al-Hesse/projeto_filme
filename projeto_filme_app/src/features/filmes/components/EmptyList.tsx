import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme/theme';

interface EmptyListProps {
  message?: string;
}

export const EmptyList: React.FC<EmptyListProps> = ({
  message = 'Nenhum filme encontrado.',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎬</Text>
      <Text style={styles.title}>Lista Vazia</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
