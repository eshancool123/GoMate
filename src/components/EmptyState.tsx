import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';
import { Button } from './Button';

interface EmptyStateProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
  actionTitle?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionTitle,
  onAction,
}) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Feather
        name={icon}
        size={64}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
        {message}
      </Text>
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    minWidth: 200,
  },
});
