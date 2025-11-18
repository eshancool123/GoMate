import axios from 'axios';
import { Destination } from '../types';

// Using REST Countries API for destinations
const COUNTRIES_API = 'https://restcountries.com/v3.1';

// Curated list of popular travel destinations with images
const DESTINATIONS_DATA = [
  { name: 'France', capital: 'Paris', region: 'Europe', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800' },
  { name: 'Italy', capital: 'Rome', region: 'Europe', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800' },
  { name: 'Spain', capital: 'Madrid', region: 'Europe', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800' },
  { name: 'Japan', capital: 'Tokyo', region: 'Asia', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800' },
  { name: 'Thailand', capital: 'Bangkok', region: 'Asia', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800' },
  { name: 'Greece', capital: 'Athens', region: 'Europe', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800' },
  { name: 'United Kingdom', capital: 'London', region: 'Europe', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800' },
  { name: 'Germany', capital: 'Berlin', region: 'Europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800' },
  { name: 'Australia', capital: 'Canberra', region: 'Oceania', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800' },
  { name: 'Brazil', capital: 'Brasília', region: 'Americas', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800' },
  { name: 'United States', capital: 'Washington', region: 'Americas', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800' },
  { name: 'Canada', capital: 'Ottawa', region: 'Americas', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800' },
  { name: 'Iceland', capital: 'Reykjavik', region: 'Europe', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800' },
  { name: 'Portugal', capital: 'Lisbon', region: 'Europe', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800' },
  { name: 'Mexico', capital: 'Mexico City', region: 'Americas', image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800' },
  { name: 'New Zealand', capital: 'Wellington', region: 'Oceania', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800' },
  { name: 'Switzerland', capital: 'Bern', region: 'Europe', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { name: 'Netherlands', capital: 'Amsterdam', region: 'Europe', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800' },
  { name: 'Austria', capital: 'Vienna', region: 'Europe', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800' },
  { name: 'Norway', capital: 'Oslo', region: 'Europe', image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800' },
];

export const destinationService = {
  async getDestinations(): Promise<Destination[]> {
    try {
      // Return destinations with proper images
      const destinations: Destination[] = DESTINATIONS_DATA.map((dest, index) => ({
        id: dest.name.toLowerCase().replace(/\s+/g, '-'),
        name: dest.name,
        description: `Explore ${dest.capital} and discover amazing attractions`,
        image: dest.image,
        country: dest.name,
        type: dest.region,
        rating: (4 + Math.random()).toFixed(1),
        status: index % 3 === 0 ? 'Popular' : index % 3 === 1 ? 'Trending' : 'Featured',
      }));

      console.log('Destinations processed:', destinations.length);
      console.log('Sample destination image:', destinations[0]?.image);
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
