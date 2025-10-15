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

interface HealthEmergency {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  symptoms: string[];
  firstAid: string[];
}

const HealthEmergencySupportScreen: React.FC = () => {
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);

  const healthEmergencies: HealthEmergency[] = [
    {
      id: '1',
      type: 'Heart Attack',
      severity: 'critical',
      description: 'Sudden cardiac event requiring immediate medical attention',
      symptoms: ['Chest pain', 'Shortness of breath', 'Nausea', 'Cold sweat', 'Pain in arm/jaw'],
      firstAid: ['Call 911 immediately', 'Have person sit down', 'Give aspirin if available', 'Monitor breathing', 'Prepare for CPR if needed'],
    },
    {
      id: '2',
      type: 'Stroke',
      severity: 'critical',
      description: 'Brain attack requiring immediate emergency care',
      symptoms: ['Facial drooping', 'Arm weakness', 'Speech difficulties', 'Sudden severe headache', 'Vision problems'],
      firstAid: ['Call 911 immediately', 'Note time of onset', 'Keep person calm', 'Do not give food/water', 'Monitor consciousness'],
    },
    {
      id: '3',
      type: 'Severe Allergic Reaction',
      severity: 'high',
      description: 'Anaphylaxis requiring immediate treatment',
      symptoms: ['Difficulty breathing', 'Swelling of face/throat', 'Rash or hives', 'Rapid pulse', 'Dizziness'],
      firstAid: ['Call 911 immediately', 'Use epinephrine auto-injector if available', 'Help person sit up', 'Monitor breathing', 'Stay with person'],
    },
    {
      id: '4',
      type: 'Choking',
      severity: 'high',
      description: 'Blocked airway requiring immediate intervention',
      symptoms: ['Unable to speak', 'Coughing or gagging', 'Blue lips/fingernails', 'Clutching throat', 'Loss of consciousness'],
      firstAid: ['Call 911', 'Perform Heimlich maneuver', 'Give 5 back blows', 'Alternate between back blows and abdominal thrusts', 'Continue until object is expelled'],
    },
    {
      id: '5',
      type: 'Severe Bleeding',
      severity: 'high',
      description: 'Uncontrolled bleeding requiring immediate attention',
      symptoms: ['Heavy bleeding', 'Blood soaking through bandages', 'Pale skin', 'Rapid pulse', 'Dizziness'],
      firstAid: ['Call 911', 'Apply direct pressure', 'Elevate injured area', 'Use pressure points if needed', 'Do not remove embedded objects'],
    },
  ];

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

  const getHealthIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'heart attack':
        return 'heart';
      case 'stroke':
        return 'medical';
      case 'allergic reaction':
      case 'severe allergic reaction':
        return 'warning';
      case 'choking':
        return 'airplane';
      case 'bleeding':
      case 'severe bleeding':
        return 'water';
      default:
        return 'medical';
    }
  };

  const handleEmergencyPress = (emergency: HealthEmergency) => {
    setSelectedEmergency(emergency.id);
    Alert.alert(
      emergency.type,
      `${emergency.description}\n\nSeverity: ${emergency.severity.toUpperCase()}`,
      [
        { text: 'View Details', style: 'default' },
        { text: 'Call 911', style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const callEmergency = () => {
    Alert.alert(
      'Emergency Call',
      'Calling 911 for medical emergency. Stay calm and follow instructions.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', style: 'default' },
      ]
    );
  };

  const getFirstAidGuide = () => {
    Alert.alert(
      'First Aid Guide',
      'Access comprehensive first aid instructions and emergency procedures.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Guide', style: 'default' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="medical" size={60} color="#c0392b" />
            <Text style={styles.title}>Health Emergency Support</Text>
            <Text style={styles.subtitle}>
              Medical emergency assistance and first aid guidance
            </Text>
          </View>

          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.emergencyCallButton} onPress={callEmergency}>
              <Ionicons name="call" size={32} color="#fff" />
              <Text style={styles.emergencyCallText}>Call 911</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.firstAidButton} onPress={getFirstAidGuide}>
              <Ionicons name="book" size={32} color="#fff" />
              <Text style={styles.firstAidText}>First Aid Guide</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color="#27ae60" />
              <Text style={styles.statusText}>Location: Active</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time" size={20} color="#3498db" />
              <Text style={styles.statusText}>
                Last Update: {new Date().toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="medical" size={20} color="#c0392b" />
              <Text style={styles.statusText}>Emergency Services: Ready</Text>
            </View>
          </View>

          <View style={styles.emergenciesSection}>
            <Text style={styles.sectionTitle}>Common Health Emergencies</Text>
            {healthEmergencies.map((emergency) => (
              <TouchableOpacity
                key={emergency.id}
                style={styles.emergencyCard}
                onPress={() => handleEmergencyPress(emergency)}
              >
                <View style={styles.emergencyHeader}>
                  <View style={styles.emergencyIconContainer}>
                    <Ionicons
                      name={getHealthIcon(emergency.type) as any}
                      size={24}
                      color={getSeverityColor(emergency.severity)}
                    />
                  </View>
                  <View style={styles.emergencyInfo}>
                    <Text style={styles.emergencyType}>{emergency.type}</Text>
                    <Text style={styles.emergencyDescription}>{emergency.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(emergency.severity) },
                    ]}
                  >
                    <Text style={styles.severityText}>
                      {emergency.severity.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.symptomsContainer}>
                  <Text style={styles.symptomsTitle}>Key Symptoms:</Text>
                  <View style={styles.symptomsList}>
                    {emergency.symptoms.slice(0, 3).map((symptom, index) => (
                      <Text key={index} style={styles.symptomText}>
                        • {symptom}
                      </Text>
                    ))}
                    {emergency.symptoms.length > 3 && (
                      <Text style={styles.symptomText}>
                        • +{emergency.symptoms.length - 3} more...
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.emergencyContactsSection}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            <View style={styles.contactsContainer}>
              <View style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  <Ionicons name="call" size={20} color="#e74c3c" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Emergency Medical Services</Text>
                  <Text style={styles.contactNumber}>911</Text>
                </View>
                <TouchableOpacity style={styles.contactCallButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  <Ionicons name="medical" size={20} color="#c0392b" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Poison Control</Text>
                  <Text style={styles.contactNumber}>1-800-222-1222</Text>
                </View>
                <TouchableOpacity style={styles.contactCallButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  <Ionicons name="people" size={20} color="#3498db" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>Mental Health Crisis</Text>
                  <Text style={styles.contactNumber}>988</Text>
                </View>
                <TouchableOpacity style={styles.contactCallButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Emergency Preparedness</Text>
            <View style={styles.tipsContainer}>
              <Text style={styles.tipText}>
                • Keep emergency contacts easily accessible
              </Text>
              <Text style={styles.tipText}>
                • Know your medical history and allergies
              </Text>
              <Text style={styles.tipText}>
                • Keep a first aid kit in your home and car
              </Text>
              <Text style={styles.tipText}>
                • Learn basic CPR and first aid techniques
              </Text>
              <Text style={styles.tipText}>
                • Share your location with emergency contacts
              </Text>
              <Text style={styles.tipText}>
                • Stay calm and follow emergency procedures
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
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emergencyCallButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emergencyCallText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  firstAidButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  firstAidText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
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
  emergenciesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  emergencyCard: {
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
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  emergencyDescription: {
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
  symptomsContainer: {
    marginTop: 10,
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  symptomText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 10,
    marginBottom: 2,
  },
  emergencyContactsSection: {
    marginBottom: 20,
  },
  contactsContainer: {
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

export default HealthEmergencySupportScreen;
