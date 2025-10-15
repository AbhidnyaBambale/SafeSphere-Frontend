import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createAlert } from '../redux/slices/alertSlice';
import { LocationService } from '../services/locationService';

const PanicAlertScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const dispatch = useDispatch<AppDispatch>();
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  const handlePanicAlert = async () => {
    if (isActive) {
      // Cancel alert
      setIsActive(false);
      stopPulseAnimation();
      Alert.alert('Alert Cancelled', 'Your panic alert has been cancelled.');
      return;
    }

    // Get current location
    const location = await LocationService.getCurrentLocation();
    if (!location) {
      Alert.alert('Error', 'Unable to get your location. Please check location permissions.');
      return;
    }

    // Create panic alert
    const alert = {
      id: Date.now().toString(),
      type: 'panic' as const,
      message: 'PANIC ALERT: User needs immediate assistance',
      location: location,
      timestamp: Date.now(),
      status: 'active' as const,
    };

    dispatch(createAlert(alert));
    setIsActive(true);
    startPulseAnimation();

    Alert.alert(
      'Panic Alert Activated',
      'Your panic alert has been sent to emergency contacts and local authorities.',
      [
        {
          text: 'Cancel Alert',
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            stopPulseAnimation();
          },
        },
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="alert-circle" size={60} color="#e74c3c" />
          <Text style={styles.title}>Panic Alert</Text>
          <Text style={styles.subtitle}>
            Press and hold the button below to send an emergency alert
          </Text>
        </View>

        <View style={styles.alertContainer}>
          <Animated.View
            style={[
              styles.alertButton,
              isActive && styles.alertButtonActive,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <TouchableOpacity
              style={styles.alertButtonInner}
              onPress={handlePanicAlert}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isActive ? 'stop' : 'alert-circle'}
                size={40}
                color="#fff"
              />
              <Text style={styles.alertButtonText}>
                {isActive ? 'CANCEL ALERT' : 'PANIC ALERT'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="location" size={20} color="#27ae60" />
            <Text style={styles.infoText}>
              {currentLocation ? 'Location: Active' : 'Location: Inactive'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color="#3498db" />
            <Text style={styles.infoText}>
              Alert Time: {new Date().toLocaleTimeString()}
            </Text>
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructionsText}>
            • Press the panic button to send an immediate emergency alert
          </Text>
          <Text style={styles.instructionsText}>
            • Your location will be shared with emergency contacts
          </Text>
          <Text style={styles.instructionsText}>
            • Local authorities will be notified automatically
          </Text>
          <Text style={styles.instructionsText}>
            • Press again to cancel the alert if it was accidental
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
  alertContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  alertButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  alertButtonActive: {
    backgroundColor: '#c0392b',
  },
  alertButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  infoContainer: {
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default PanicAlertScreen;
