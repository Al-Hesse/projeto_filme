import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../../theme/theme';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Carregando...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
      {!!message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  text: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: 14,
  },
});
