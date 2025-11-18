import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Destination } from '../types';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
  onFavouritePress: () => void;
  isFavourite: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onPress,
  onFavouritePress,
  isFavourite,
}) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: destination.image }}
        style={styles.image}
        resizeMode="cover"
        onError={(error) => console.log('Image load error:', destination.name, error.nativeEvent.error)}
        onLoad={() => console.log('Image loaded:', destination.name)}
      />
      
      <TouchableOpacity
        style={[styles.favouriteButton, { backgroundColor: theme.colors.card }]}
        onPress={onFavouritePress}
        activeOpacity={0.7}
      >
        <Feather
          name={isFavourite ? 'heart' : 'heart'}
          size={20}
          color={isFavourite ? '#F44336' : theme.colors.textSecondary}
          style={{ fontWeight: isFavourite ? 'bold' : 'normal' }}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={1}
          >
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

        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
        >
          {destination.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <Feather
              name="map-pin"
              size={14}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.location, { color: theme.colors.textSecondary }]}
            >
              {destination.type}
            </Text>
          </View>
          
          {destination.rating && (
            <View style={styles.ratingContainer}>
              <Feather name="star" size={14} color="#FFB300" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>
                {destination.rating}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});
