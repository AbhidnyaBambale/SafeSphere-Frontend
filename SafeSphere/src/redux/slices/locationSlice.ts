import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../../types';

interface LocationState {
  currentLocation: Location | null;
  isTracking: boolean;
  locationHistory: Location[];
  permissionGranted: boolean;
  error: string | null;
}

const initialState: LocationState = {
  currentLocation: null,
  isTracking: false,
  locationHistory: [],
  permissionGranted: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
      state.locationHistory.push(action.payload);
      // Keep only last 100 locations to prevent memory issues
      if (state.locationHistory.length > 100) {
        state.locationHistory = state.locationHistory.slice(-100);
      }
    },
    setTracking: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload;
    },
    setPermissionGranted: (state, action: PayloadAction<boolean>) => {
      state.permissionGranted = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearLocationHistory: (state) => {
      state.locationHistory = [];
    },
  },
});

export const {
  setCurrentLocation,
  setTracking,
  setPermissionGranted,
  setError,
  clearLocationHistory,
} = locationSlice.actions;
export default locationSlice.reducer;
