import axios from 'axios';
import { Destination } from '../types';

// Using REST Countries API for travel destinations (as per assignment requirements)
// API Documentation: https://restcountries.com
const COUNTRIES_API = 'https://restcountries.com/v3.1';

// Popular travel destinations
const POPULAR_DESTINATIONS = [
  'France', 'Italy', 'Spain', 'Japan', 'Thailand', 'Greece',
  'United Kingdom', 'Germany', 'Australia', 'Brazil',
  'United States', 'Canada', 'Iceland', 'Portugal', 'Mexico',
  'New Zealand', 'Switzerland', 'Netherlands', 'Austria', 'Norway'
];

// Unsplash image mapping for better destination visuals
const DESTINATION_IMAGES: Record<string, string> = {
  'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  'Italy': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
  'Spain': 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800',
  'Japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  'Thailand': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
  'Greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
  'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
  'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
  'Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
  'United States': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800',
  'Canada': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
  'Iceland': 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
  'Portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
  'Mexico': 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800',
  'New Zealand': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800',
  'Switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'Netherlands': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
  'Austria': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800',
  'Norway': 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800',
};

export const destinationService = {
  async getDestinations(): Promise<Destination[]> {
    try {
      // Fetch data from REST Countries API
      const response = await axios.get(
        `${COUNTRIES_API}/all?fields=name,capital,region,population,languages,currencies,timezones`
      );

      const countries = Array.isArray(response.data) ? response.data : [];
      
      console.log('Countries fetched from API:', countries.length);

      // Filter and transform popular destinations
      const destinations: Destination[] = countries
        .filter((country: any) => 
          country.name?.common && POPULAR_DESTINATIONS.includes(country.name.common)
        )
        .map((country: any, index: number) => {
          const countryName = country.name.common;
          const capital = country.capital?.[0] || countryName;
          
          return {
            id: countryName.toLowerCase().replace(/\s+/g, '-'),
            name: countryName,
            description: `Explore ${capital} and discover amazing attractions, culture, and landmarks`,
            image: DESTINATION_IMAGES[countryName] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
            country: countryName,
            type: country.region || 'Unknown',
            rating: parseFloat((4 + Math.random()).toFixed(1)),
            status: index % 3 === 0 ? 'Popular' : index % 3 === 1 ? 'Trending' : 'Featured',
          };
        });

      console.log('Destinations processed:', destinations.length);
      return destinations;
    } catch (error: any) {
      console.error('Error fetching destinations from API:', error.message);
      throw new Error('Failed to fetch destinations from REST Countries API');
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
