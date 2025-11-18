import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Destination } from '../../types';

interface DestinationState {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
}

const initialState: DestinationState = {
  destinations: [],
  loading: false,
  error: null,
};

const destinationSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    fetchDestinationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDestinationsSuccess: (state, action: PayloadAction<Destination[]>) => {
      state.loading = false;
      state.destinations = action.payload;
      state.error = null;
    },
    fetchDestinationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDestinationsStart,
  fetchDestinationsSuccess,
  fetchDestinationsFailure,
} = destinationSlice.actions;

export default destinationSlice.reducer;
