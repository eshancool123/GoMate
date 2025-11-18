import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';
import { Feather } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  iconName?: keyof typeof Feather.glyphMap;
  touched?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  iconName,
  touched,
  style,
  ...props
}) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  const showError = touched && error;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: showError ? theme.colors.error : theme.colors.border,
          },
        ]}
      >
        {iconName && (
          <Feather
            name={iconName}
            size={20}
            color={theme.colors.textSecondary}
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={[
            styles.input,
            { color: theme.colors.text },
            iconName && styles.inputWithIcon,
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
      </View>
      {showError && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});
