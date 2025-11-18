// User types
export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Destination types
export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  country: string;
  type: string;
  rating?: number;
  status?: string;
}

// Transport types
export interface TransportSchedule {
  id: string;
  route: string;
  departure: string;
  arrival: string;
  type: string;
  price?: number;
  status: string;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  DetailsScreen: { destination: Destination };
};
