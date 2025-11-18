import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFavourite } from '../redux/slices/favouritesSlice';
import { storageService } from '../services/storageService';
import { DestinationCard, EmptyState } from '../components';
import { lightTheme, darkTheme } from '../theme';
import { Destination } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList, HomeStackParamList } from '../types';

type FavouritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Favourites'>,
  StackNavigationProp<HomeStackParamList>
>;

interface Props {
  navigation: FavouritesScreenNavigationProp;
}

export const FavouritesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const { favourites } = useAppSelector((state) => state.favourites);

  const handleDestinationPress = (destination: Destination) => {
    // @ts-ignore - Navigation typing issue with nested navigators
    navigation.navigate('Home', {
      screen: 'DetailsScreen',
      params: { destination },
    });
  };

  const handleFavouritePress = async (destination: Destination) => {
    dispatch(removeFavourite(destination.id));
    const updatedFavourites = favourites.filter((fav) => fav.id !== destination.id);
    await storageService.saveFavourites(updatedFavourites);
  };

  const isFavourite = (destinationId: string) => {
    return favourites.some((fav) => fav.id === destinationId);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          My Favourites
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {favourites.length} {favourites.length === 1 ? 'destination' : 'destinations'}
        </Text>
      </View>

      {favourites.length === 0 ? (
        <EmptyState
          icon="heart"
          title="No Favourites Yet"
          message="Start adding destinations to your favourites and they'll appear here"
          actionTitle="Explore Destinations"
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              onPress={() => handleDestinationPress(item)}
              onFavouritePress={() => handleFavouritePress(item)}
              isFavourite={isFavourite(item.id)}
            />
          )}
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
    padding: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 16,
  },
});
