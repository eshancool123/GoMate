import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchDestinationsStart,
  fetchDestinationsSuccess,
  fetchDestinationsFailure,
} from '../redux/slices/destinationSlice';
import { addFavourite, removeFavourite } from '../redux/slices/favouritesSlice';
import { destinationService } from '../services/destinationService';
import { storageService } from '../services/storageService';
import { DestinationCard, LoadingSpinner, EmptyState } from '../components';
import { lightTheme, darkTheme } from '../theme';
import { Destination } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const { destinations, loading } = useAppSelector((state) => state.destinations);
  const { favourites } = useAppSelector((state) => state.favourites);
  const { user } = useAppSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [searchQuery, destinations]);

  const loadDestinations = async () => {
    try {
      dispatch(fetchDestinationsStart());
      const data = await destinationService.getDestinations();
      dispatch(fetchDestinationsSuccess(data));
    } catch (error: any) {
      dispatch(fetchDestinationsFailure(error.message));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDestinations();
    setRefreshing(false);
  };

  const filterDestinations = () => {
    if (!searchQuery.trim()) {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  };

  const handleDestinationPress = (destination: Destination) => {
    navigation.navigate('DetailsScreen', { destination });
  };

  const handleFavouritePress = async (destination: Destination) => {
    const isFavourite = favourites.some((fav) => fav.id === destination.id);
    
    if (isFavourite) {
      dispatch(removeFavourite(destination.id));
    } else {
      dispatch(addFavourite(destination));
    }

    // Persist to storage
    const updatedFavourites = isFavourite
      ? favourites.filter((fav) => fav.id !== destination.id)
      : [...favourites, destination];
    
    await storageService.saveFavourites(updatedFavourites);
  };

  const isFavourite = (destinationId: string) => {
    return favourites.some((fav) => fav.id === destinationId);
  };

  if (loading && destinations.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
            Welcome back,
          </Text>
          <Text style={[styles.username, { color: theme.colors.text }]}>
            {user?.username || 'Traveler'}
          </Text>
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <Feather name="search" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search destinations..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Feather
            name="x"
            size={20}
            color={theme.colors.textSecondary}
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      {filteredDestinations.length === 0 ? (
        <EmptyState
          icon="compass"
          title="No Destinations Found"
          message={
            searchQuery
              ? 'Try adjusting your search'
              : 'Start exploring amazing destinations'
          }
          actionTitle={searchQuery ? 'Clear Search' : 'Refresh'}
          onAction={searchQuery ? () => setSearchQuery('') : onRefresh}
        />
      ) : (
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              onPress={() => handleDestinationPress(item)}
              onFavouritePress={() => handleFavouritePress(item)}
              isFavourite={isFavourite(item.id)}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});
