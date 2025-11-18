import axios from 'axios';
import { Destination } from '../types';

// Using REST Countries API for destinations
const COUNTRIES_API = 'https://restcountries.com/v3.1';

// Curated list of popular travel destinations
const POPULAR_DESTINATIONS = [
  'France', 'Italy', 'Spain', 'Japan', 'Thailand', 'Greece',
  'United Kingdom', 'Germany', 'Australia', 'Brazil',
  'United States', 'Canada', 'Iceland', 'Portugal', 'Mexico',
  'New Zealand', 'Switzerland', 'Netherlands', 'Austria', 'Norway'
];

export const destinationService = {
  async getDestinations(): Promise<Destination[]> {
    try {
      // Fetch multiple countries in one request
      const response = await axios.get(
        `${COUNTRIES_API}/all?fields=name,capital,region,flags,population,languages`
      );

      // Filter for popular destinations and transform data
      const destinations: Destination[] = response.data
        .filter((country: any) => 
          POPULAR_DESTINATIONS.includes(country.name.common)
        )
        .slice(0, 20)
        .map((country: any, index: number) => ({
          id: country.name.common.toLowerCase().replace(/\s+/g, '-'),
          name: country.name.common,
          description: `Explore ${country.capital?.[0] || country.name.common} and discover amazing attractions`,
          image: country.flags.png,
          country: country.name.common,
          type: country.region,
          rating: (4 + Math.random()).toFixed(1),
          status: index % 3 === 0 ? 'Popular' : index % 3 === 1 ? 'Trending' : 'Featured',
        }));

      return destinations;
    } catch (error: any) {
      console.error('Error fetching destinations:', error);
      throw new Error('Failed to fetch destinations');
    }
  },

  async getDestinationById(id: string): Promise<Destination | null> {
    try {
      const destinations = await this.getDestinations();
      return destinations.find(dest => dest.id === id) || null;
    } catch (error) {
      console.error('Error fetching destination:', error);
      return null;
    }
  },

  async searchDestinations(query: string): Promise<Destination[]> {
    try {
      const destinations = await this.getDestinations();
      return destinations.filter(dest =>
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.country.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching destinations:', error);
      return [];
    }
  },
};
