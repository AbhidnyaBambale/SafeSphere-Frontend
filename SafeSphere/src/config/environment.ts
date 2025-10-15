// Environment configuration for SafeSphere
export const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api',
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key_here',
  IS_DEVELOPMENT: __DEV__,
} as const;
