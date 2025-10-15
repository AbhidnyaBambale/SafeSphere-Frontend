import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import PanicAlertScreen from '../screens/PanicAlertScreen';
import ThreatDetectionScreen from '../screens/ThreatDetectionScreen';
import DisasterAlertScreen from '../screens/DisasterAlertScreen';
import WeatherAlertScreen from '../screens/WeatherAlertScreen';
import EmergencySOSScreen from '../screens/EmergencySOSScreen';
import SafeRouteMappingScreen from '../screens/SafeRouteMappingScreen';
import DangerZoneAlertsScreen from '../screens/DangerZoneAlertsScreen';
import LiveLocationSharingScreen from '../screens/LiveLocationSharingScreen';
import HealthEmergencySupportScreen from '../screens/HealthEmergencySupportScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main Tab Navigator for authenticated users
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Alerts':
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';
              break;
            case 'Safety':
              iconName = focused ? 'shield' : 'shield-outline';
              break;
            case 'Location':
              iconName = focused ? 'location' : 'location-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#e74c3c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'SafeSphere' }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertStackNavigator}
        options={{ title: 'Alerts' }}
      />
      <Tab.Screen 
        name="Safety" 
        component={SafetyStackNavigator}
        options={{ title: 'Safety' }}
      />
      <Tab.Screen 
        name="Location" 
        component={LocationStackNavigator}
        options={{ title: 'Location' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Alert Stack Navigator
const AlertStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AlertList" 
        component={PanicAlertScreen}
        options={{ title: 'Panic Alert' }}
      />
      <Stack.Screen 
        name="ThreatDetection" 
        component={ThreatDetectionScreen}
        options={{ title: 'Threat Detection' }}
      />
      <Stack.Screen 
        name="DisasterAlert" 
        component={DisasterAlertScreen}
        options={{ title: 'Disaster Alert' }}
      />
      <Stack.Screen 
        name="WeatherAlert" 
        component={WeatherAlertScreen}
        options={{ title: 'Weather Alert' }}
      />
    </Stack.Navigator>
  );
};

// Safety Stack Navigator
const SafetyStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EmergencySOS" 
        component={EmergencySOSScreen}
        options={{ title: 'Emergency SOS' }}
      />
      <Stack.Screen 
        name="HealthEmergency" 
        component={HealthEmergencySupportScreen}
        options={{ title: 'Health Emergency' }}
      />
    </Stack.Navigator>
  );
};

// Location Stack Navigator
const LocationStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SafeRouteMapping" 
        component={SafeRouteMappingScreen}
        options={{ title: 'Safe Route Mapping' }}
      />
      <Stack.Screen 
        name="DangerZoneAlerts" 
        component={DangerZoneAlertsScreen}
        options={{ title: 'Danger Zone Alerts' }}
      />
      <Stack.Screen 
        name="LiveLocationSharing" 
        component={LiveLocationSharingScreen}
        options={{ title: 'Live Location Sharing' }}
      />
    </Stack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={HomeScreen} // Placeholder - you can create a proper profile screen
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};

// Auth Stack Navigator
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
