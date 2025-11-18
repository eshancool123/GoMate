import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addFavourite, removeFavourite } from '../redux/slices/favouritesSlice';
import { storageService } from '../services/storageService';
import { lightTheme, darkTheme } from '../theme';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'DetailsScreen'>;
type DetailsScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'DetailsScreen'>;

interface Props {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

export const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { destination } = route.params;
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const { favourites } = useAppSelector((state) => state.favourites);

  const isFavourite = favourites.some((fav) => fav.id === destination.id);

  const handleFavouritePress = async () => {
    if (isFavourite) {
      dispatch(removeFavourite(destination.id));
    } else {
      dispatch(addFavourite(destination));
    }

    const updatedFavourites = isFavourite
      ? favourites.filter((fav) => fav.id !== destination.id)
      : [...favourites, destination];
    
    await storageService.saveFavourites(updatedFavourites);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: destination.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favouriteButton, { backgroundColor: theme.colors.card }]}
            onPress={handleFavouritePress}
          >
            <Feather
              name={isFavourite ? 'heart' : 'heart'}
              size={24}
              color={isFavourite ? '#F44336' : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
          <View style={styles.headerSection}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {destination.name}
              </Text>
              {destination.status && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        destination.status === 'Popular'
                          ? '#4CAF50'
                          : destination.status === 'Trending'
                          ? '#FF9800'
                          : '#2196F3',
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>{destination.status}</Text>
                </View>
              )}
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="map-pin" size={18} color={theme.colors.primary} />
                <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
                  {destination.type}
                </Text>
              </View>
              {destination.rating && (
                <View style={styles.infoItem}>
                  <Feather name="star" size={18} color="#FFB300" />
                  <Text style={[styles.infoText, { color: theme.colors.text }]}>
                    {destination.rating} Rating
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              About
            </Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {destination.description}
            </Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {destination.name} is one of the most beautiful destinations in {destination.country}. 
              Known for its stunning landscapes, rich culture, and unforgettable experiences, 
              this destination offers something for every traveler.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Highlights
            </Text>
            <View style={styles.highlightItem}>
              <Feather name="check-circle" size={20} color={theme.colors.success} />
              <Text style={[styles.highlightText, { color: theme.colors.text }]}>
                Amazing cultural heritage sites
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="check-circle" size={20} color={theme.colors.success} />
              <Text style={[styles.highlightText, { color: theme.colors.text }]}>
                Breathtaking natural scenery
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="check-circle" size={20} color={theme.colors.success} />
              <Text style={[styles.highlightText, { color: theme.colors.text }]}>
                World-class cuisine and dining
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="check-circle" size={20} color={theme.colors.success} />
              <Text style={[styles.highlightText, { color: theme.colors.text }]}>
                Vibrant local markets and shopping
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Travel Information
            </Text>
            <View style={styles.travelInfoCard}>
              <View style={styles.travelInfoItem}>
                <Feather name="globe" size={24} color={theme.colors.primary} />
                <View style={styles.travelInfoContent}>
                  <Text style={[styles.travelInfoLabel, { color: theme.colors.textSecondary }]}>
                    Country
                  </Text>
                  <Text style={[styles.travelInfoValue, { color: theme.colors.text }]}>
                    {destination.country}
                  </Text>
                </View>
              </View>
              <View style={styles.travelInfoItem}>
                <Feather name="compass" size={24} color={theme.colors.primary} />
                <View style={styles.travelInfoContent}>
                  <Text style={[styles.travelInfoLabel, { color: theme.colors.textSecondary }]}>
                    Region
                  </Text>
                  <Text style={[styles.travelInfoValue, { color: theme.colors.text }]}>
                    {destination.type}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: height * 0.4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  favouriteButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  headerSection: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  highlightText: {
    fontSize: 15,
    flex: 1,
  },
  travelInfoCard: {
    gap: 16,
  },
  travelInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  travelInfoContent: {
    flex: 1,
  },
  travelInfoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  travelInfoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
