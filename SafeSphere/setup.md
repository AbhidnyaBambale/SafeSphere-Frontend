# SafeSphere Setup Guide

## Quick Start Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npx expo start
```

### 3. Run on Specific Platforms
```bash
# Android
npx expo start --android

# iOS (requires macOS)
npx expo start --ios

# Web
npx expo start --web
```

## Environment Setup

### 1. Create Environment File
Create a `.env` file in the root directory:
```env
API_BASE_URL=http://localhost:5000/api
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Configure Google Maps (Optional)
1. Get a Google Maps API key from Google Cloud Console
2. Add the key to your `.env` file
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API

## Project Structure Overview

```
SafeSphere/
├── src/
│   ├── screens/           # All app screens
│   ├── navigation/        # Navigation setup
│   ├── redux/            # State management
│   ├── services/         # API services
│   ├── types/            # TypeScript types
│   └── config/           # Configuration
├── App.tsx               # Main app component
└── package.json          # Dependencies
```

## Key Features Implemented

✅ **Authentication System**
- Login/Register screens
- Redux-based auth state management

✅ **Safety Modules**
- Panic Alert with location sharing
- Threat Detection with AI simulation
- Disaster & Weather Alerts
- Emergency SOS with quick dial
- Safe Route Mapping
- Danger Zone Alerts
- Live Location Sharing
- Health Emergency Support

✅ **Navigation**
- Bottom tab navigation
- Stack navigation for each module
- Proper screen transitions

✅ **State Management**
- Redux Toolkit setup
- Auth, Alert, Location, and User slices
- Type-safe state management

✅ **API Integration**
- Axios configuration
- Mock API service structure
- Environment-based configuration

## Testing the App

1. **Start the app**: `npx expo start`
2. **Test on device**: Scan QR code with Expo Go app
3. **Test on simulator**: Press 'i' for iOS or 'a' for Android
4. **Test on web**: Press 'w' for web browser

## Demo User Credentials

For testing purposes, you can use any email/password combination. The app currently uses mock authentication.

## Next Steps

1. **Backend Integration**: Connect to your .NET backend API
2. **Real API Keys**: Add actual Google Maps and other service API keys
3. **Push Notifications**: Implement emergency alert notifications
4. **Testing**: Add unit and integration tests
5. **Deployment**: Configure for app store deployment

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Dependency conflicts**: Delete `node_modules` and run `npm install`
3. **TypeScript errors**: Check import paths and type definitions
4. **Navigation errors**: Ensure all screens are properly imported

### Getting Help

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Create an issue if you encounter problems

---

**Ready to build a safer world with SafeSphere! 🛡️**
