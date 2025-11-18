import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button];
    
    if (variant === 'primary') {
      baseStyle.push({ backgroundColor: theme.colors.primary });
    } else if (variant === 'secondary') {
      baseStyle.push({ backgroundColor: theme.colors.secondary });
    } else if (variant === 'outline') {
      baseStyle.push({
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
      });
    }

    if (disabled || loading) {
      baseStyle.push({ opacity: 0.6 });
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.text];
    
    if (variant === 'outline') {
      baseStyle.push({ color: theme.colors.primary });
    } else {
      baseStyle.push({ color: '#FFFFFF' });
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
