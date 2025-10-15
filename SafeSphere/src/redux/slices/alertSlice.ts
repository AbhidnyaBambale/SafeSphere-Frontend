import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '../../types';

interface AlertState {
  activeAlerts: Alert[];
  alertHistory: Alert[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AlertState = {
  activeAlerts: [],
  alertHistory: [],
  isLoading: false,
  error: null,
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<Alert>) => {
      state.activeAlerts.push(action.payload);
    },
    updateAlert: (state, action: PayloadAction<{ id: string; updates: Partial<Alert> }>) => {
      const { id, updates } = action.payload;
      const alertIndex = state.activeAlerts.findIndex(alert => alert.id === id);
      if (alertIndex !== -1) {
        state.activeAlerts[alertIndex] = { ...state.activeAlerts[alertIndex], ...updates };
      }
    },
    resolveAlert: (state, action: PayloadAction<string>) => {
      const alertId = action.payload;
      const alertIndex = state.activeAlerts.findIndex(alert => alert.id === alertId);
      if (alertIndex !== -1) {
        const resolvedAlert = { ...state.activeAlerts[alertIndex], status: 'resolved' as const };
        state.alertHistory.push(resolvedAlert);
        state.activeAlerts.splice(alertIndex, 1);
      }
    },
    cancelAlert: (state, action: PayloadAction<string>) => {
      const alertId = action.payload;
      const alertIndex = state.activeAlerts.findIndex(alert => alert.id === alertId);
      if (alertIndex !== -1) {
        const cancelledAlert = { ...state.activeAlerts[alertIndex], status: 'cancelled' as const };
        state.alertHistory.push(cancelledAlert);
        state.activeAlerts.splice(alertIndex, 1);
      }
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
  createAlert,
  updateAlert,
  resolveAlert,
  cancelAlert,
  setLoading,
  setError,
  clearError,
} = alertSlice.actions;
export default alertSlice.reducer;
