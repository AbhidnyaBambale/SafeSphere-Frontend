import React, { useState, useEffect } from 'react';
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

const ThreatDetectionScreen: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [threats, setThreats] = useState([
    {
      id: '1',
      type: 'Suspicious Activity',
      level: 'Medium',
      location: 'Nearby',
      timestamp: new Date().toISOString(),
      description: 'Unusual movement detected in the area',
    },
  ]);

  const startThreatScan = () => {
    setIsScanning(true);
    // Simulate threat detection
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        'Threat Scan Complete',
        'Scan completed. No immediate threats detected in your vicinity.'
      );
    }, 3000);
  };

  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  const getThreatIcon = (type: string) => {
    if (type.toLowerCase().includes('suspicious')) return 'eye';
    if (type.toLowerCase().includes('weapon')) return 'shield';
    if (type.toLowerCase().includes('crowd')) return 'people';
    return 'warning';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="shield" size={60} color="#f39c12" />
            <Text style={styles.title}>Threat Detection</Text>
            <Text style={styles.subtitle}>
              AI-powered threat detection and analysis
            </Text>
          </View>

          <View style={styles.scanContainer}>
            <TouchableOpacity
              style={[styles.scanButton, isScanning && styles.scanButtonActive]}
              onPress={startThreatScan}
              disabled={isScanning}
            >
              <Ionicons
                name={isScanning ? 'stop' : 'scan'}
                size={32}
                color="#fff"
              />
              <Text style={styles.scanButtonText}>
                {isScanning ? 'Scanning...' : 'Start Threat Scan'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <Text style={styles.statusText}>AI Detection: Active</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color="#3498db" />
              <Text style={styles.statusText}>Area Coverage: 500m radius</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time" size={20} color="#9b59b6" />
              <Text style={styles.statusText}>
                Last Scan: {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={styles.threatsSection}>
            <Text style={styles.sectionTitle}>Recent Threats</Text>
            {threats.map((threat) => (
              <View key={threat.id} style={styles.threatCard}>
                <View style={styles.threatHeader}>
                  <View style={styles.threatIconContainer}>
                    <Ionicons
                      name={getThreatIcon(threat.type) as any}
                      size={24}
                      color={getThreatLevelColor(threat.level)}
                    />
                  </View>
                  <View style={styles.threatInfo}>
                    <Text style={styles.threatType}>{threat.type}</Text>
                    <Text style={styles.threatLocation}>{threat.location}</Text>
                  </View>
                  <View
                    style={[
                      styles.threatLevel,
                      { backgroundColor: getThreatLevelColor(threat.level) },
                    ]}
                  >
                    <Text style={styles.threatLevelText}>{threat.level}</Text>
                  </View>
                </View>
                <Text style={styles.threatDescription}>{threat.description}</Text>
                <Text style={styles.threatTimestamp}>
                  {new Date(threat.timestamp).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Detection Features</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="eye" size={20} color="#3498db" />
                <Text style={styles.featureText}>Suspicious behavior detection</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people" size={20} color="#3498db" />
                <Text style={styles.featureText}>Crowd density analysis</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="location" size={20} color="#3498db" />
                <Text style={styles.featureText}>Real-time location tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="notifications" size={20} color="#3498db" />
                <Text style={styles.featureText}>Instant threat alerts</Text>
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
  scanContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scanButton: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  scanButtonActive: {
    backgroundColor: '#e67e22',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
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
  threatsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  threatCard: {
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
  threatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  threatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  threatInfo: {
    flex: 1,
  },
  threatType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  threatLocation: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  threatLevel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  threatLevelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  threatDescription: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
  },
  threatTimestamp: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featureList: {
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
});

export default ThreatDetectionScreen;
