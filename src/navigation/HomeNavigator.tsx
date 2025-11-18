import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, DetailsScreen } from '../screens';
import { HomeStackParamList } from '../types';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
