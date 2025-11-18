import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { HomeNavigator } from './HomeNavigator';
import { FavouritesScreen, ProfileScreen } from '../screens';
import { MainTabParamList } from '../types';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
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
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
