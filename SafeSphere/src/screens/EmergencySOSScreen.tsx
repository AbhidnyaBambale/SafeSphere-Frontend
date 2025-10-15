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

const EmergencySOSScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string | null>(null);

  const emergencyTypes = [
    { id: 'medical', title: 'Medical Emergency', icon: 'medical', color: '#e74c3c' },
    { id: 'fire', title: 'Fire Emergency', icon: 'flame', color: '#e67e22' },
    { id: 'police', title: 'Police Emergency', icon: 'shield', color: '#3498db' },
    { id: 'other', title: 'Other Emergency', icon: 'help-circle', color: '#9b59b6' },
  ];

  const handleEmergencyCall = (type: string) => {
    setEmergencyType(type);
    setIsActive(true);
    
    const emergencyNumber = getEmergencyNumber(type);
    
    Alert.alert(
      'Emergency Call',
      `Calling ${emergencyNumber} for ${type} emergency.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setIsActive(false);
            setEmergencyType(null);
          },
        },
        {
          text: 'Call',
          style: 'default',
          onPress: () => {
            // In a real app, this would initiate the actual call
            Alert.alert('Call Initiated', `Connecting to ${emergencyNumber}...`);
          },
        },
      ]
    );
  };

  const getEmergencyNumber = (type: string) => {
    switch (type) {
      case 'medical':
        return '911 (Medical)';
      case 'fire':
        return '911 (Fire)';
      case 'police':
        return '911 (Police)';
      default:
        return '911';
    }
  };

  const getEmergencyIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return 'medical';
      case 'fire':
        return 'flame';
      case 'police':
        return 'shield';
      default:
        return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="call" size={60} color="#e74c3c" />
            <Text style={styles.title}>Emergency SOS</Text>
            <Text style={styles.subtitle}>
              Quick access to emergency services
            </Text>
          </View>

          <View style={styles.emergencyTypesContainer}>
            <Text style={styles.sectionTitle}>Select Emergency Type</Text>
            <View style={styles.emergencyTypesGrid}>
              {emergencyTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.emergencyTypeCard, { backgroundColor: type.color }]}
                  onPress={() => handleEmergencyCall(type.id)}
                >
                  <Ionicons name={type.icon as any} size={32} color="#fff" />
                  <Text style={styles.emergencyTypeTitle}>{type.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.quickCallContainer}>
            <Text style={styles.sectionTitle}>Quick Emergency Call</Text>
            <TouchableOpacity
              style={styles.quickCallButton}
              onPress={() => handleEmergencyCall('general')}
            >
              <Ionicons name="call" size={40} color="#fff" />
              <Text style={styles.quickCallText}>Call 911</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.emergencyContactsContainer}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            <View style={styles.contactList}>
              <View style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  <Ionicons name="medical" size={20} color="#e74c3c" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Emergency Medical</Text>
                  <Text style={styles.contactNumber}>911</Text>
                </View>
                <TouchableOpacity style={styles.contactCallButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  <Ionicons name="flame" size={20} color="#e67e22" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Fire Department</Text>
                  <Text style={styles.contactNumber}>911</Text>
                </View>
                <TouchableOpacity style={styles.contactCallButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  <Ionicons name="shield" size={20} color="#3498db" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Police</Text>
                  <Text style={styles.contactNumber}>911</Text>
                </View>
                <TouchableOpacity style={styles.contactCallButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.safetyInfoContainer}>
            <Text style={styles.sectionTitle}>Emergency Information</Text>
            <View style={styles.safetyInfoCard}>
              <View style={styles.safetyInfoItem}>
                <Ionicons name="location" size={20} color="#27ae60" />
                <Text style={styles.safetyInfoText}>
                  Your location will be automatically shared
                </Text>
              </View>
              <View style={styles.safetyInfoItem}>
                <Ionicons name="time" size={20} color="#3498db" />
                <Text style={styles.safetyInfoText}>
                  Emergency services will be notified immediately
                </Text>
              </View>
              <View style={styles.safetyInfoItem}>
                <Ionicons name="people" size={20} color="#9b59b6" />
                <Text style={styles.safetyInfoText}>
                  Emergency contacts will be alerted
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.sectionTitle}>Emergency Instructions</Text>
            <View style={styles.instructionsCard}>
              <Text style={styles.instructionText}>
                1. Stay calm and assess the situation
              </Text>
              <Text style={styles.instructionText}>
                2. Call 911 immediately for life-threatening emergencies
              </Text>
              <Text style={styles.instructionText}>
                3. Provide clear information about your location
              </Text>
              <Text style={styles.instructionText}>
                4. Follow the dispatcher's instructions
              </Text>
              <Text style={styles.instructionText}>
                5. Stay on the line until help arrives
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
  emergencyTypesContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  emergencyTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emergencyTypeCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emergencyTypeTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  quickCallContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  quickCallButton: {
    backgroundColor: '#e74c3c',
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  quickCallText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emergencyContactsContainer: {
    marginBottom: 30,
  },
  contactList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  contactNumber: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  contactCallButton: {
    backgroundColor: '#27ae60',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyInfoContainer: {
    marginBottom: 30,
  },
  safetyInfoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  safetyInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  safetyInfoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default EmergencySOSScreen;
