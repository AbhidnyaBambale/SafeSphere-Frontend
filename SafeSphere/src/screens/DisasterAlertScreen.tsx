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

interface DisasterAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  timestamp: string;
  expiresAt: string;
}

const DisasterAlertScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<DisasterAlert[]>([
    {
      id: '1',
      type: 'Earthquake',
      severity: 'high',
      location: 'San Francisco Bay Area',
      description: 'Magnitude 4.2 earthquake detected. Aftershocks possible.',
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      type: 'Flood Warning',
      severity: 'medium',
      location: 'Sacramento Valley',
      description: 'Heavy rainfall expected. Flooding possible in low-lying areas.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
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

  const getDisasterIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'earthquake':
        return 'earth';
      case 'flood':
      case 'flood warning':
        return 'water';
      case 'fire':
        return 'flame';
      case 'hurricane':
        return 'tornado';
      case 'tornado':
        return 'tornado';
      default:
        return 'warning';
    }
  };

  const handleAlertPress = (alert: DisasterAlert) => {
    Alert.alert(
      alert.type,
      `${alert.description}\n\nLocation: ${alert.location}\nSeverity: ${alert.severity.toUpperCase()}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Get Safety Tips', style: 'default' },
      ]
    );
  };

  const refreshAlerts = () => {
    Alert.alert('Refreshing', 'Checking for new disaster alerts...');
    // In a real app, this would fetch from the API
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="warning" size={60} color="#e67e22" />
            <Text style={styles.title}>Disaster Alerts</Text>
            <Text style={styles.subtitle}>
              Stay informed about natural disasters and emergencies
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshAlerts}>
              <Ionicons name="refresh" size={20} color="#3498db" />
              <Text style={styles.refreshButtonText}>Refresh Alerts</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons name="notifications" size={20} color="#e74c3c" />
              <Text style={styles.statusText}>
                Active Alerts: {alerts.length}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color="#27ae60" />
              <Text style={styles.statusText}>Monitoring: California</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time" size={20} color="#3498db" />
              <Text style={styles.statusText}>
                Last Update: {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>Active Disaster Alerts</Text>
            {alerts.length === 0 ? (
              <View style={styles.noAlertsContainer}>
                <Ionicons name="checkmark-circle" size={48} color="#27ae60" />
                <Text style={styles.noAlertsText}>No active disaster alerts</Text>
                <Text style={styles.noAlertsSubtext}>
                  You're safe! No immediate threats detected in your area.
                </Text>
              </View>
            ) : (
              alerts.map((alert) => (
                <TouchableOpacity
                  key={alert.id}
                  style={styles.alertCard}
                  onPress={() => handleAlertPress(alert)}
                >
                  <View style={styles.alertHeader}>
                    <View style={styles.alertIconContainer}>
                      <Ionicons
                        name={getDisasterIcon(alert.type) as any}
                        size={24}
                        color={getSeverityColor(alert.severity)}
                      />
                    </View>
                    <View style={styles.alertInfo}>
                      <Text style={styles.alertType}>{alert.type}</Text>
                      <Text style={styles.alertLocation}>{alert.location}</Text>
                    </View>
                    <View
                      style={[
                        styles.severityBadge,
                        { backgroundColor: getSeverityColor(alert.severity) },
                      ]}
                    >
                      <Text style={styles.severityText}>
                        {alert.severity.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.alertDescription}>{alert.description}</Text>
                  <View style={styles.alertFooter}>
                    <Text style={styles.alertTimestamp}>
                      Issued: {new Date(alert.timestamp).toLocaleString()}
                    </Text>
                    <Text style={styles.alertExpiry}>
                      Expires: {new Date(alert.expiresAt).toLocaleString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Emergency Preparedness</Text>
            <View style={styles.tipsContainer}>
              <View style={styles.tipItem}>
                <Ionicons name="home" size={20} color="#3498db" />
                <Text style={styles.tipText}>Create an emergency kit</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="people" size={20} color="#3498db" />
                <Text style={styles.tipText}>Plan evacuation routes</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="call" size={20} color="#3498db" />
                <Text style={styles.tipText}>Keep emergency contacts ready</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="battery-charging" size={20} color="#3498db" />
                <Text style={styles.tipText}>Charge devices before storms</Text>
              </View>
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
  alertsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  noAlertsContainer: {
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
  noAlertsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27ae60',
    marginTop: 15,
    marginBottom: 5,
  },
  noAlertsSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  alertCard: {
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
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertInfo: {
    flex: 1,
  },
  alertType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  alertLocation: {
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
  alertDescription: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 20,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  alertExpiry: {
    fontSize: 12,
    color: '#e74c3c',
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tipText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default DisasterAlertScreen;
