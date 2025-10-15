import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface DangerZone {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  distance: string;
  description: string;
  timestamp: string;
  radius: number;
}

const DangerZoneAlertsScreen: React.FC = () => {
  const [dangerZones, setDangerZones] = useState<DangerZone[]>([
    {
      id: '1',
      type: 'Crime Alert',
      severity: 'high',
      location: 'Downtown Area',
      distance: '0.3 miles',
      description: 'Recent reports of theft and vandalism in this area',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      radius: 500,
    },
    {
      id: '2',
      type: 'Accident Zone',
      severity: 'medium',
      location: 'Highway 101',
      distance: '1.2 miles',
      description: 'Traffic accident causing delays and potential hazards',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      radius: 200,
    },
    {
      id: '3',
      type: 'Construction',
      severity: 'low',
      location: 'Main Street',
      distance: '0.8 miles',
      description: 'Road construction with limited access',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      radius: 300,
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return '#27ae60';
      case 'medium':
        return '#f39c12';
      case 'high':
        return '#e74c3c';
      case 'critical':
        return '#8e44ad';
      default:
        return '#7f8c8d';
    }
  };

  const getDangerIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'crime':
      case 'crime alert':
        return 'shield';
      case 'accident':
      case 'accident zone':
        return 'car';
      case 'construction':
        return 'construct';
      case 'fire':
        return 'flame';
      case 'flood':
        return 'water';
      default:
        return 'warning';
    }
  };

  const handleZonePress = (zone: DangerZone) => {
    Alert.alert(
      zone.type,
      `${zone.description}\n\nLocation: ${zone.location}\nDistance: ${zone.distance}\nSeverity: ${zone.severity.toUpperCase()}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Avoid Area', style: 'default' },
        { text: 'Report Issue', style: 'default' },
      ]
    );
  };

  const refreshZones = () => {
    Alert.alert('Refreshing', 'Updating danger zone information...');
  };

  const reportDangerZone = () => {
    Alert.alert(
      'Report Danger Zone',
      'Report a new danger zone or safety concern in your area.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'default' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="location" size={60} color="#8e44ad" />
            <Text style={styles.title}>Danger Zone Alerts</Text>
            <Text style={styles.subtitle}>
              Stay informed about dangerous areas and safety concerns
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshZones}>
              <Ionicons name="refresh" size={20} color="#3498db" />
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportButton} onPress={reportDangerZone}>
              <Ionicons name="add-circle" size={20} color="#e74c3c" />
              <Text style={styles.reportButtonText}>Report</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons name="warning" size={20} color="#e74c3c" />
              <Text style={styles.statusText}>
                Active Danger Zones: {dangerZones.length}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color="#27ae60" />
              <Text style={styles.statusText}>Monitoring Radius: 5 miles</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time" size={20} color="#3498db" />
              <Text style={styles.statusText}>
                Last Update: {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={styles.zonesSection}>
            <Text style={styles.sectionTitle}>Nearby Danger Zones</Text>
            {dangerZones.length === 0 ? (
              <View style={styles.noZonesContainer}>
                <Ionicons name="checkmark-circle" size={48} color="#27ae60" />
                <Text style={styles.noZonesText}>No danger zones detected</Text>
                <Text style={styles.noZonesSubtext}>
                  Your area appears to be safe. Continue to stay alert.
                </Text>
              </View>
            ) : (
              dangerZones.map((zone) => (
                <TouchableOpacity
                  key={zone.id}
                  style={styles.zoneCard}
                  onPress={() => handleZonePress(zone)}
                >
                  <View style={styles.zoneHeader}>
                    <View style={styles.zoneIconContainer}>
                      <Ionicons
                        name={getDangerIcon(zone.type) as any}
                        size={24}
                        color={getSeverityColor(zone.severity)}
                      />
                    </View>
                    <View style={styles.zoneInfo}>
                      <Text style={styles.zoneType}>{zone.type}</Text>
                      <Text style={styles.zoneLocation}>{zone.location}</Text>
                    </View>
                    <View
                      style={[
                        styles.severityBadge,
                        { backgroundColor: getSeverityColor(zone.severity) },
                      ]}
                    >
                      <Text style={styles.severityText}>
                        {zone.severity.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.zoneDescription}>{zone.description}</Text>
                  
                  <View style={styles.zoneDetails}>
                    <View style={styles.zoneDetail}>
                      <Ionicons name="location" size={16} color="#3498db" />
                      <Text style={styles.zoneDetailText}>{zone.distance} away</Text>
                    </View>
                    <View style={styles.zoneDetail}>
                      <Ionicons name="time" size={16} color="#9b59b6" />
                      <Text style={styles.zoneDetailText}>
                        {new Date(zone.timestamp).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.zoneDetail}>
                      <Ionicons name="radio" size={16} color="#e67e22" />
                      <Text style={styles.zoneDetailText}>{zone.radius}m radius</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          <View style={styles.safetyFeaturesSection}>
            <Text style={styles.sectionTitle}>Safety Features</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="notifications" size={20} color="#e74c3c" />
                <Text style={styles.featureText}>Real-time danger zone alerts</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="location" size={20} color="#3498db" />
                <Text style={styles.featureText}>GPS-based proximity warnings</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people" size={20} color="#27ae60" />
                <Text style={styles.featureText}>Community-reported incidents</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="shield" size={20} color="#9b59b6" />
                <Text style={styles.featureText}>Verified safety data</Text>
              </View>
            </View>
          </View>

          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Safety Tips</Text>
            <View style={styles.tipsContainer}>
              <Text style={styles.tipText}>
                • Avoid areas marked as high-risk danger zones
              </Text>
              <Text style={styles.tipText}>
                • Stay alert when passing through medium-risk areas
              </Text>
              <Text style={styles.tipText}>
                • Report any suspicious activity or safety concerns
              </Text>
              <Text style={styles.tipText}>
                • Share your location with trusted contacts
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  reportButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#e74c3c',
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
  zonesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  noZonesContainer: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noZonesText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27ae60',
    marginTop: 15,
    marginBottom: 5,
  },
  noZonesSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  zoneCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  zoneIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  zoneLocation: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  zoneDescription: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 20,
  },
  zoneDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  zoneDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneDetailText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#7f8c8d',
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

export default DangerZoneAlertsScreen;
