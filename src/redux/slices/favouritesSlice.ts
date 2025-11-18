import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Destination } from '../../types';

interface FavouritesState {
  favourites: Destination[];
}

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Destination>) => {
      const exists = state.favourites.find(fav => fav.id === action.payload.id);
      if (!exists) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(fav => fav.id !== action.payload);
    },
    setFavourites: (state, action: PayloadAction<Destination[]>) => {
      state.favourites = action.payload;
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavourites,
  clearFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
