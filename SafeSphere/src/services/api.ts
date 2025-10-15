import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ENV } from '../config/environment';
import { User, Alert, Location, EmergencyContact } from '../types';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken(); // You can implement this
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // You can dispatch logout action here
    }
    return Promise.reject(error);
  }
);

// API service class
export class ApiService {
  // Auth endpoints
  static async login(email: string, password: string): Promise<User> {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  }

  static async register(userData: Partial<User> & { password: string }): Promise<User> {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }

  // User endpoints
  static async getUserProfile(): Promise<User> {
    const response = await apiClient.get('/user/profile');
    return response.data;
  }

  static async updateUserProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.put('/user/profile', updates);
    return response.data;
  }

  // Emergency contacts
  static async getEmergencyContacts(): Promise<EmergencyContact[]> {
    const response = await apiClient.get('/user/emergency-contacts');
    return response.data;
  }

  static async addEmergencyContact(contact: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> {
    const response = await apiClient.post('/user/emergency-contacts', contact);
    return response.data;
  }

  static async updateEmergencyContact(id: string, contact: Partial<EmergencyContact>): Promise<EmergencyContact> {
    const response = await apiClient.put(`/user/emergency-contacts/${id}`, contact);
    return response.data;
  }

  static async deleteEmergencyContact(id: string): Promise<void> {
    await apiClient.delete(`/user/emergency-contacts/${id}`);
  }

  // Alert endpoints
  static async createAlert(alert: Omit<Alert, 'id' | 'timestamp'>): Promise<Alert> {
    const response = await apiClient.post('/alerts', alert);
    return response.data;
  }

  static async getActiveAlerts(): Promise<Alert[]> {
    const response = await apiClient.get('/alerts/active');
    return response.data;
  }

  static async getAlertHistory(): Promise<Alert[]> {
    const response = await apiClient.get('/alerts/history');
    return response.data;
  }

  static async updateAlert(id: string, updates: Partial<Alert>): Promise<Alert> {
    const response = await apiClient.put(`/alerts/${id}`, updates);
    return response.data;
  }

  static async resolveAlert(id: string): Promise<void> {
    await apiClient.post(`/alerts/${id}/resolve`);
  }

  static async cancelAlert(id: string): Promise<void> {
    await apiClient.post(`/alerts/${id}/cancel`);
  }

  // Location endpoints
  static async updateLocation(location: Location): Promise<void> {
    await apiClient.post('/location/update', location);
  }

  static async getLocationHistory(): Promise<Location[]> {
    const response = await apiClient.get('/location/history');
    return response.data;
  }

  // Safe routes
  static async getSafeRoutes(startLocation: Location, endLocation: Location): Promise<any[]> {
    const response = await apiClient.post('/routes/safe', { startLocation, endLocation });
    return response.data;
  }

  // Danger zones
  static async getDangerZones(location: Location, radius: number = 5000): Promise<any[]> {
    const response = await apiClient.get(`/danger-zones?lat=${location.latitude}&lng=${location.longitude}&radius=${radius}`);
    return response.data;
  }

  // Weather alerts
  static async getWeatherAlerts(location: Location): Promise<any[]> {
    const response = await apiClient.get(`/weather/alerts?lat=${location.latitude}&lng=${location.longitude}`);
    return response.data;
  }
}

export default apiClient;
