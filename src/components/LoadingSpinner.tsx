import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

export const LoadingSpinner: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
