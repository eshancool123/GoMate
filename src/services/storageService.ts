import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@GoMate:token';
const USER_KEY = '@GoMate:user';
const FAVOURITES_KEY = '@GoMate:favourites';
const THEME_KEY = '@GoMate:theme';

export const storageService = {
  // Token operations
  async saveToken(token: string): Promise<void> {
    try {
      if (!token || token === 'undefined' || token === 'null') {
        console.warn('Attempted to save invalid token, skipping');
        return;
      }
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
      throw error;
    }
  },

  // User operations
  async saveUser(user: any): Promise<void> {
    try {
      if (!user) {
        console.warn('Attempted to save invalid user, skipping');
        return;
      }
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async getUser(): Promise<any | null> {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  },

  // Favourites operations
  async saveFavourites(favourites: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites:', error);
      throw error;
    }
  },

  async getFavourites(): Promise<any[]> {
    try {
      const favourites = await AsyncStorage.getItem(FAVOURITES_KEY);
      return favourites ? JSON.parse(favourites) : [];
    } catch (error) {
      console.error('Error getting favourites:', error);
      return [];
    }
  },

  async clearFavourites(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVOURITES_KEY);
    } catch (error) {
      console.error('Error clearing favourites:', error);
      throw error;
    }
  },

  // Theme operations
  async saveTheme(isDark: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;
    }
  },

  async getTheme(): Promise<boolean> {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return theme ? JSON.parse(theme) : false;
    } catch (error) {
      console.error('Error getting theme:', error);
      return false;
    }
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, FAVOURITES_KEY]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  },
};
