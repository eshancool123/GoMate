import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { clearFavourites } from '../redux/slices/favouritesSlice';
import { storageService } from '../services/storageService';
import { lightTheme, darkTheme } from '../theme';

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const { user } = useAppSelector((state) => state.auth);
  const { favourites } = useAppSelector((state) => state.favourites);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await storageService.clearAll();
            dispatch(logout());
          },
        },
      ]
    );
  };

  const handleToggleTheme = async () => {
    dispatch(toggleTheme());
    await storageService.saveTheme(!isDark);
  };

  const handleClearFavourites = () => {
    Alert.alert(
      'Clear Favourites',
      'Are you sure you want to remove all favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            dispatch(clearFavourites());
            await storageService.clearFavourites();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.avatarText}>
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={[styles.username, { color: theme.colors.text }]}>
          {user?.username || 'User'}
        </Text>
        <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
          {user?.email || 'user@example.com'}
        </Text>
      </View>

      <View style={[styles.statsContainer, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.statItem}>
          <Feather name="heart" size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {favourites.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Favourites
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Feather name="map-pin" size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {favourites.length > 0 ? favourites.length : '0'}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Visited
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Preferences
        </Text>
        
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          onPress={handleToggleTheme}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Feather
              name={isDark ? 'moon' : 'sun'}
              size={22}
              color={theme.colors.primary}
            />
            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={handleToggleTheme}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Account
        </Text>
        
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Feather name="user" size={22} color={theme.colors.primary} />
            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
              Edit Profile
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Feather name="bell" size={22} color={theme.colors.primary} />
            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
              Notifications
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        {favourites.length > 0 && (
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
            onPress={handleClearFavourites}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="trash-2" size={22} color={theme.colors.error} />
              <Text style={[styles.menuItemText, { color: theme.colors.error }]}>
                Clear Favourites
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About
        </Text>
        
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Feather name="help-circle" size={22} color={theme.colors.primary} />
            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
              Help & Support
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Feather name="info" size={22} color={theme.colors.primary} />
            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
              About GoMate
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Feather name="log-out" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: theme.colors.textSecondary }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 32,
  },
});
