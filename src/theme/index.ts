import { lightColors, darkColors, Colors } from './colors';

export interface Theme {
  dark: boolean;
  colors: Colors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const lightTheme: Theme = {
  dark: false,
  colors: lightColors,
  spacing,
  borderRadius,
  fontSize,
};

export const darkTheme: Theme = {
  dark: true,
  colors: darkColors,
  spacing,
  borderRadius,
  fontSize,
};

export { lightColors, darkColors };
