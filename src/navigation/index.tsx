import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginSuccess } from '../redux/slices/authSlice';
import { setFavourites } from '../redux/slices/favouritesSlice';
import { setTheme } from '../redux/slices/themeSlice';
import { storageService } from '../services/storageService';
import { LoadingSpinner } from '../components';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Load user data from storage
      const user = await storageService.getUser();
      const token = await storageService.getToken();
      
      if (user && token) {
        dispatch(loginSuccess({ ...user, token }));
      }

      // Load favourites
      const favourites = await storageService.getFavourites();
      dispatch(setFavourites(favourites));

      // Load theme preference
      const isDark = await storageService.getTheme();
      dispatch(setTheme(isDark));
    } catch (error) {
      console.error('Error loading app data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
