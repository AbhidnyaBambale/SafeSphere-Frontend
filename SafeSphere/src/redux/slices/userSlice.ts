import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, EmergencyContact } from '../../types';

interface UserState {
  profile: User | null;
  emergencyContacts: EmergencyContact[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  emergencyContacts: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setEmergencyContacts: (state, action: PayloadAction<EmergencyContact[]>) => {
      state.emergencyContacts = action.payload;
    },
    addEmergencyContact: (state, action: PayloadAction<EmergencyContact>) => {
      state.emergencyContacts.push(action.payload);
    },
    updateEmergencyContact: (state, action: PayloadAction<{ id: string; contact: EmergencyContact }>) => {
      const { id, contact } = action.payload;
      const index = state.emergencyContacts.findIndex(c => c.id === id);
      if (index !== -1) {
        state.emergencyContacts[index] = contact;
      }
    },
    removeEmergencyContact: (state, action: PayloadAction<string>) => {
      state.emergencyContacts = state.emergencyContacts.filter(c => c.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setEmergencyContacts,
  addEmergencyContact,
  updateEmergencyContact,
  removeEmergencyContact,
  setLoading,
  setError,
  clearError,
} = userSlice.actions;
export default userSlice.reducer;
