import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import destinationReducer from './slices/destinationSlice';
import favouritesReducer from './slices/favouritesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationReducer,
    favourites: favouritesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
