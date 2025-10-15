import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Route {
  id: string;
  name: string;
  distance: string;
  duration: string;
  safetyScore: number;
  dangerZones: number;
  description: string;
}

const SafeRouteMappingScreen: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const routes: Route[] = [
    {
      id: '1',
      name: 'Safest Route',
      distance: '2.3 miles',
      duration: '8 minutes',
      safetyScore: 95,
      dangerZones: 0,
      description: 'Most secure path with minimal risk factors',
    },
    {
      id: '2',
      name: 'Fastest Route',
      distance: '1.8 miles',
      duration: '6 minutes',
      safetyScore: 78,
      dangerZones: 2,
      description: 'Quickest path with some risk areas',
    },
    {
      id: '3',
      name: 'Alternative Route',
      distance: '2.7 miles',
      duration: '10 minutes',
      safetyScore: 88,
      dangerZones: 1,
      description: 'Alternative path with good safety rating',
    },
  ];

  const getSafetyColor = (score: number) => {
    if (score >= 90) return '#27ae60';
    if (score >= 70) return '#f39c12';
    return '#e74c3c';
  };

  const getSafetyText = (score: number) => {
    if (score >= 90) return 'Very Safe';
    if (score >= 70) return 'Moderately Safe';
    return 'Use Caution';
  };

  const startNavigation = (routeId: string) => {
    setSelectedRoute(routeId);
    setIsNavigating(true);
    Alert.alert(
      'Navigation Started',
      'Turn-by-turn directions will be provided. Stay alert and follow safety guidelines.',
      [
        {
          text: 'Stop Navigation',
          style: 'destructive',
          onPress: () => {
            setIsNavigating(false);
            setSelectedRoute(null);
          },
        },
        {
          text: 'Continue',
          style: 'default',
        },
      ]
    );
  };

  const refreshRoutes = () => {
    Alert.alert('Refreshing', 'Updating route information and safety data...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="map" size={60} color="#27ae60" />
            <Text style={styles.title}>Safe Route Mapping</Text>
            <Text style={styles.subtitle}>
              Find the safest path to your destination
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshRoutes}>
              <Ionicons name="refresh" size={20} color="#3498db" />
              <Text style={styles.refreshButtonText}>Refresh Routes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color="#27ae60" />
              <Text style={styles.statusText}>Current Location: Active</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="shield" size={20} color="#3498db" />
              <Text style={styles.statusText}>Safety Analysis: Updated</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time" size={20} color="#9b59b6" />
              <Text style={styles.statusText}>
                Last Update: {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={styles.routesSection}>
            <Text style={styles.sectionTitle}>Available Routes</Text>
            {routes.map((route) => (
              <View key={route.id} style={styles.routeCard}>
                <View style={styles.routeHeader}>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    <Text style={styles.routeDescription}>{route.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.safetyBadge,
                      { backgroundColor: getSafetyColor(route.safetyScore) },
                    ]}
                  >
                    <Text style={styles.safetyBadgeText}>
                      {route.safetyScore}%
                    </Text>
                  </View>
                </View>

                <View style={styles.routeDetails}>
                  <View style={styles.routeDetail}>
                    <Ionicons name="time" size={16} color="#3498db" />
                    <Text style={styles.routeDetailText}>{route.duration}</Text>
                  </View>
                  <View style={styles.routeDetail}>
                    <Ionicons name="location" size={16} color="#27ae60" />
                    <Text style={styles.routeDetailText}>{route.distance}</Text>
                  </View>
                  <View style={styles.routeDetail}>
                    <Ionicons name="warning" size={16} color="#e74c3c" />
                    <Text style={styles.routeDetailText}>
                      {route.dangerZones} danger zones
                    </Text>
                  </View>
                </View>

                <View style={styles.safetyInfo}>
                  <Text style={styles.safetyText}>
                    Safety Rating: {getSafetyText(route.safetyScore)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.navigateButton,
                    selectedRoute === route.id && styles.navigateButtonActive,
                  ]}
                  onPress={() => startNavigation(route.id)}
                >
                  <Ionicons
                    name={isNavigating && selectedRoute === route.id ? 'stop' : 'navigate'}
                    size={20}
                    color="#fff"
                  />
                  <Text style={styles.navigateButtonText}>
                    {isNavigating && selectedRoute === route.id
                      ? 'Stop Navigation'
                      : 'Start Navigation'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.safetyFeaturesSection}>
            <Text style={styles.sectionTitle}>Safety Features</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark" size={20} color="#27ae60" />
                <Text style={styles.featureText}>Real-time danger zone detection</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people" size={20} color="#3498db" />
                <Text style={styles.featureText}>Crowd density analysis</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="time" size={20} color="#9b59b6" />
                <Text style={styles.featureText}>Time-based safety scoring</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="notifications" size={20} color="#e74c3c" />
                <Text style={styles.featureText}>Live safety alerts</Text>
              </View>
            </View>
          </View>

          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Safety Tips</Text>
            <View style={styles.tipsContainer}>
              <Text style={styles.tipText}>
                • Stay on well-lit paths during nighttime
              </Text>
              <Text style={styles.tipText}>
                • Avoid isolated areas when possible
              </Text>
              <Text style={styles.tipText}>
                • Share your route with trusted contacts
              </Text>
              <Text style={styles.tipText}>
                • Keep your phone charged and accessible
              </Text>
              <Text style={styles.tipText}>
                • Trust your instincts and change routes if needed
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  refreshButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  routesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  routeCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  routeDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  safetyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  safetyBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDetailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#7f8c8d',
  },
  safetyInfo: {
    marginBottom: 15,
  },
  safetyText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  navigateButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButtonActive: {
    backgroundColor: '#e74c3c',
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  safetyFeaturesSection: {
    marginBottom: 20,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  safetyTipsSection: {
    marginBottom: 20,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default SafeRouteMappingScreen;
