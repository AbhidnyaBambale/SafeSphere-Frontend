import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  isSharing: boolean;
  lastSeen: string;
}

const LiveLocationSharingScreen: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [sharingDuration, setSharingDuration] = useState('1 hour');
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      phoneNumber: '+1 (555) 123-4567',
      isSharing: true,
      lastSeen: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      phoneNumber: '+1 (555) 987-6543',
      isSharing: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Emergency Contact',
      phoneNumber: '+1 (555) 911-0000',
      isSharing: true,
      lastSeen: new Date().toISOString(),
    },
  ]);

  const durationOptions = ['30 minutes', '1 hour', '2 hours', '4 hours', '8 hours', '24 hours'];

  const toggleLocationSharing = () => {
    if (!isSharing) {
      Alert.alert(
        'Start Location Sharing',
        'Your location will be shared with selected contacts. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Start Sharing',
            style: 'default',
            onPress: () => setIsSharing(true),
          },
        ]
      );
    } else {
      Alert.alert(
        'Stop Location Sharing',
        'Your location sharing will be stopped. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Stop Sharing',
            style: 'default',
            onPress: () => setIsSharing(false),
          },
        ]
      );
    }
  };

  const toggleContactSharing = (contactId: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === contactId
          ? { ...contact, isSharing: !contact.isSharing }
          : contact
      )
    );
  };

  const addContact = () => {
    Alert.alert(
      'Add Contact',
      'Add a new emergency contact to share your location with.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', style: 'default' },
      ]
    );
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? '#27ae60' : '#e74c3c';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="location-outline" size={60} color="#16a085" />
            <Text style={styles.title}>Live Location Sharing</Text>
            <Text style={styles.subtitle}>
              Share your location with trusted contacts for safety
            </Text>
          </View>

          <View style={styles.sharingControlCard}>
            <View style={styles.sharingHeader}>
              <View style={styles.sharingInfo}>
                <Text style={styles.sharingTitle}>Location Sharing</Text>
                <Text style={[styles.sharingStatus, { color: getStatusColor(isSharing) }]}>
                  {getStatusText(isSharing)}
                </Text>
              </View>
              <Switch
                value={isSharing}
                onValueChange={toggleLocationSharing}
                trackColor={{ false: '#bdc3c7', true: '#16a085' }}
                thumbColor={isSharing ? '#fff' : '#f4f3f4'}
              />
            </View>
            
            {isSharing && (
              <View style={styles.sharingDetails}>
                <View style={styles.durationSelector}>
                  <Text style={styles.durationLabel}>Sharing Duration:</Text>
                  <View style={styles.durationOptions}>
                    {durationOptions.map((duration) => (
                      <TouchableOpacity
                        key={duration}
                        style={[
                          styles.durationOption,
                          sharingDuration === duration && styles.durationOptionSelected,
                        ]}
                        onPress={() => setSharingDuration(duration)}
                      >
                        <Text
                          style={[
                            styles.durationOptionText,
                            sharingDuration === duration && styles.durationOptionTextSelected,
                          ]}
                        >
                          {duration}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color="#27ae60" />
              <Text style={styles.statusText}>
                GPS Status: {isSharing ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time" size={20} color="#3498db" />
              <Text style={styles.statusText}>
                Last Update: {new Date().toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="people" size={20} color="#9b59b6" />
              <Text style={styles.statusText}>
                Sharing with: {contacts.filter(c => c.isSharing).length} contacts
              </Text>
            </View>
          </View>

          <View style={styles.contactsSection}>
            <View style={styles.contactsHeader}>
              <Text style={styles.sectionTitle}>Emergency Contacts</Text>
              <TouchableOpacity style={styles.addContactButton} onPress={addContact}>
                <Ionicons name="add" size={20} color="#16a085" />
                <Text style={styles.addContactText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
            
            {contacts.map((contact) => (
              <View key={contact.id} style={styles.contactCard}>
                <View style={styles.contactInfo}>
                  <View style={styles.contactIcon}>
                    <Ionicons name="person" size={24} color="#16a085" />
                  </View>
                  <View style={styles.contactDetails}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
                    <Text style={styles.contactLastSeen}>
                      Last seen: {new Date(contact.lastSeen).toLocaleString()}
                    </Text>
                  </View>
                </View>
                <View style={styles.contactActions}>
                  <View style={styles.sharingToggle}>
                    <Text style={styles.sharingToggleText}>
                      {contact.isSharing ? 'Sharing' : 'Not Sharing'}
                    </Text>
                    <Switch
                      value={contact.isSharing}
                      onValueChange={() => toggleContactSharing(contact.id)}
                      trackColor={{ false: '#bdc3c7', true: '#16a085' }}
                      thumbColor={contact.isSharing ? '#fff' : '#f4f3f4'}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.safetyFeaturesSection}>
            <Text style={styles.sectionTitle}>Safety Features</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark" size={20} color="#27ae60" />
                <Text style={styles.featureText}>Real-time location tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="notifications" size={20} color="#3498db" />
                <Text style={styles.featureText}>Automatic emergency alerts</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="time" size={20} color="#9b59b6" />
                <Text style={styles.featureText}>Configurable sharing duration</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="lock-closed" size={20} color="#e74c3c" />
                <Text style={styles.featureText}>Privacy-protected sharing</Text>
              </View>
            </View>
          </View>

          <View style={styles.privacySection}>
            <Text style={styles.sectionTitle}>Privacy & Safety</Text>
            <View style={styles.privacyContainer}>
              <Text style={styles.privacyText}>
                • Your location is only shared with contacts you select
              </Text>
              <Text style={styles.privacyText}>
                • Location data is encrypted and secure
              </Text>
              <Text style={styles.privacyText}>
                • You can stop sharing at any time
              </Text>
              <Text style={styles.privacyText}>
                • Location history is not stored permanently
              </Text>
              <Text style={styles.privacyText}>
                • Emergency contacts are notified automatically
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
  sharingControlCard: {
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
  sharingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sharingInfo: {
    flex: 1,
  },
  sharingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sharingStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  sharingDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f1f2f6',
    paddingTop: 15,
  },
  durationSelector: {
    marginBottom: 10,
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  durationOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    marginBottom: 8,
  },
  durationOptionSelected: {
    backgroundColor: '#16a085',
  },
  durationOptionText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  durationOptionTextSelected: {
    color: '#fff',
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
  contactsSection: {
    marginBottom: 20,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
  },
  addContactText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#16a085',
    fontWeight: '600',
  },
  contactCard: {
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
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  contactLastSeen: {
    fontSize: 12,
    color: '#95a5a6',
  },
  contactActions: {
    alignItems: 'flex-end',
  },
  sharingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sharingToggleText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 10,
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
  privacySection: {
    marginBottom: 20,
  },
  privacyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  privacyText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default LiveLocationSharingScreen;
