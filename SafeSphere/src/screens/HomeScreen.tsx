import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  screen: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);

  const modules: ModuleCard[] = [
    {
      id: 'panic',
      title: 'Panic Alert',
      description: 'Send emergency alert',
      icon: 'alert-circle',
      color: '#e74c3c',
      screen: 'PanicAlert',
    },
    {
      id: 'threat',
      title: 'Threat Detection',
      description: 'AI-powered threat detection',
      icon: 'shield',
      color: '#f39c12',
      screen: 'ThreatDetection',
    },
    {
      id: 'disaster',
      title: 'Disaster Alert',
      description: 'Natural disaster warnings',
      icon: 'warning',
      color: '#e67e22',
      screen: 'DisasterAlert',
    },
    {
      id: 'weather',
      title: 'Weather Alert',
      description: 'Weather condition updates',
      icon: 'cloud',
      color: '#3498db',
      screen: 'WeatherAlert',
    },
    {
      id: 'sos',
      title: 'Emergency SOS',
      description: 'Quick emergency response',
      icon: 'call',
      color: '#e74c3c',
      screen: 'EmergencySOS',
    },
    {
      id: 'route',
      title: 'Safe Route',
      description: 'Find safest path',
      icon: 'map',
      color: '#27ae60',
      screen: 'SafeRouteMapping',
    },
    {
      id: 'danger',
      title: 'Danger Zones',
      description: 'Avoid dangerous areas',
      icon: 'location',
      color: '#8e44ad',
      screen: 'DangerZoneAlerts',
    },
    {
      id: 'location',
      title: 'Live Location',
      description: 'Share your location',
      icon: 'location-outline',
      color: '#16a085',
      screen: 'LiveLocationSharing',
    },
    {
      id: 'health',
      title: 'Health Emergency',
      description: 'Medical emergency support',
      icon: 'medical',
      color: '#c0392b',
      screen: 'HealthEmergency',
    },
  ];

  const handleModulePress = (module: ModuleCard) => {
    // Navigate to the appropriate screen based on the module
    if (module.screen === 'PanicAlert') {
      navigation.navigate('Alerts', { screen: 'AlertList' });
    } else if (module.screen === 'ThreatDetection') {
      navigation.navigate('Alerts', { screen: 'ThreatDetection' });
    } else if (module.screen === 'DisasterAlert') {
      navigation.navigate('Alerts', { screen: 'DisasterAlert' });
    } else if (module.screen === 'WeatherAlert') {
      navigation.navigate('Alerts', { screen: 'WeatherAlert' });
    } else if (module.screen === 'EmergencySOS') {
      navigation.navigate('Safety', { screen: 'EmergencySOS' });
    } else if (module.screen === 'SafeRouteMapping') {
      navigation.navigate('Location', { screen: 'SafeRouteMapping' });
    } else if (module.screen === 'DangerZoneAlerts') {
      navigation.navigate('Location', { screen: 'DangerZoneAlerts' });
    } else if (module.screen === 'LiveLocationSharing') {
      navigation.navigate('Location', { screen: 'LiveLocationSharing' });
    } else if (module.screen === 'HealthEmergency') {
      navigation.navigate('Safety', { screen: 'HealthEmergency' });
    }
  };

  const renderModuleCard = (module: ModuleCard) => (
    <TouchableOpacity
      key={module.id}
      style={[styles.moduleCard, { backgroundColor: module.color }]}
      onPress={() => handleModulePress(module)}
    >
      <Ionicons name={module.icon} size={32} color="#fff" style={styles.moduleIcon} />
      <Text style={styles.moduleTitle}>{module.title}</Text>
      <Text style={styles.moduleDescription}>{module.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}!
          </Text>
          <Text style={styles.subtitle}>Your safety is our priority</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Ionicons name="location" size={20} color="#27ae60" />
            <Text style={styles.statusText}>
              {currentLocation ? 'Location Active' : 'Location Inactive'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="shield-checkmark" size={20} color="#27ae60" />
            <Text style={styles.statusText}>Safety Mode: ON</Text>
          </View>
        </View>

        <View style={styles.modulesContainer}>
          <Text style={styles.sectionTitle}>Safety Modules</Text>
          <View style={styles.modulesGrid}>
            {modules.map(renderModuleCard)}
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionButtons}>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: '#e74c3c' }]}
              onPress={() => handleModulePress(modules[0])} // Panic Alert
            >
              <Ionicons name="alert-circle" size={24} color="#fff" />
              <Text style={styles.quickActionText}>Panic Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: '#27ae60' }]}
              onPress={() => handleModulePress(modules[4])} // Emergency SOS
            >
              <Ionicons name="call" size={24} color="#fff" />
              <Text style={styles.quickActionText}>Emergency SOS</Text>
            </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  statusCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
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
  modulesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: cardWidth,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleIcon: {
    marginBottom: 10,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  moduleDescription: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomeScreen;
