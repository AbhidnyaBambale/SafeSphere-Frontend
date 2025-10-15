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

interface WeatherAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  timestamp: string;
}

const WeatherAlertScreen: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    location: 'San Francisco, CA',
  });

  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: '1',
      type: 'Heat Warning',
      severity: 'high',
      location: 'San Francisco Bay Area',
      description: 'Extreme heat expected. Temperature may reach 95°F.',
      temperature: 95,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'Wind Advisory',
      severity: 'medium',
      location: 'Coastal Areas',
      description: 'Strong winds expected. Gusts up to 40 mph.',
      windSpeed: 40,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
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

  const getWeatherIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'heat':
      case 'heat warning':
        return 'sunny';
      case 'wind':
      case 'wind advisory':
        return 'leaf';
      case 'rain':
      case 'rain warning':
        return 'rainy';
      case 'storm':
        return 'thunderstorm';
      case 'snow':
        return 'snow';
      default:
        return 'cloud';
    }
  };

  const refreshWeather = () => {
    Alert.alert('Refreshing', 'Updating weather information...');
    // In a real app, this would fetch from weather API
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="cloud" size={60} color="#3498db" />
            <Text style={styles.title}>Weather Alerts</Text>
            <Text style={styles.subtitle}>
              Stay informed about weather conditions and alerts
            </Text>
          </View>

          <View style={styles.currentWeatherCard}>
            <View style={styles.weatherHeader}>
              <View style={styles.weatherInfo}>
                <Text style={styles.location}>{currentWeather.location}</Text>
                <Text style={styles.temperature}>{currentWeather.temperature}°F</Text>
                <Text style={styles.condition}>{currentWeather.condition}</Text>
              </View>
              <TouchableOpacity style={styles.refreshButton} onPress={refreshWeather}>
                <Ionicons name="refresh" size={20} color="#3498db" />
              </TouchableOpacity>
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetail}>
                <Ionicons name="water" size={16} color="#3498db" />
                <Text style={styles.weatherDetailText}>
                  {currentWeather.humidity}% Humidity
                </Text>
              </View>
              <View style={styles.weatherDetail}>
                <Ionicons name="leaf" size={16} color="#27ae60" />
                <Text style={styles.weatherDetailText}>
                  {currentWeather.windSpeed} mph Wind
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>Weather Alerts</Text>
            {alerts.length === 0 ? (
              <View style={styles.noAlertsContainer}>
                <Ionicons name="checkmark-circle" size={48} color="#27ae60" />
                <Text style={styles.noAlertsText}>No active weather alerts</Text>
                <Text style={styles.noAlertsSubtext}>
                  Weather conditions are normal in your area.
                </Text>
              </View>
            ) : (
              alerts.map((alert) => (
                <View key={alert.id} style={styles.alertCard}>
                  <View style={styles.alertHeader}>
                    <View style={styles.alertIconContainer}>
                      <Ionicons
                        name={getWeatherIcon(alert.type) as any}
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
                  {alert.temperature && (
                    <View style={styles.alertMetric}>
                      <Ionicons name="thermometer" size={16} color="#e74c3c" />
                      <Text style={styles.alertMetricText}>
                        Temperature: {alert.temperature}°F
                      </Text>
                    </View>
                  )}
                  {alert.windSpeed && (
                    <View style={styles.alertMetric}>
                      <Ionicons name="leaf" size={16} color="#27ae60" />
                      <Text style={styles.alertMetricText}>
                        Wind Speed: {alert.windSpeed} mph
                      </Text>
                    </View>
                  )}
                  <Text style={styles.alertTimestamp}>
                    Issued: {new Date(alert.timestamp).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.forecastSection}>
            <Text style={styles.sectionTitle}>7-Day Forecast</Text>
            <View style={styles.forecastContainer}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <View key={day} style={styles.forecastDay}>
                  <Text style={styles.forecastDayName}>
                    {new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' })}
                  </Text>
                  <Ionicons name="sunny" size={24} color="#f39c12" />
                  <Text style={styles.forecastTemp}>75°F</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.safetyTipsSection}>
            <Text style={styles.sectionTitle}>Weather Safety Tips</Text>
            <View style={styles.tipsContainer}>
              <View style={styles.tipItem}>
                <Ionicons name="sunny" size={20} color="#f39c12" />
                <Text style={styles.tipText}>Stay hydrated during hot weather</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="umbrella" size={20} color="#3498db" />
                <Text style={styles.tipText}>Carry an umbrella for rain</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="snow" size={20} color="#ecf0f1" />
                <Text style={styles.tipText}>Dress warmly in cold weather</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="flash" size={20} color="#f1c40f" />
                <Text style={styles.tipText}>Avoid outdoor activities during storms</Text>
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
  currentWeatherCard: {
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
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherInfo: {
    flex: 1,
  },
  location: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  condition: {
    fontSize: 18,
    color: '#3498db',
  },
  refreshButton: {
    padding: 10,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7f8c8d',
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
  alertMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  alertMetricText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7f8c8d',
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 10,
  },
  forecastSection: {
    marginBottom: 20,
  },
  forecastContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  forecastDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  forecastDayName: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  forecastTemp: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
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

export default WeatherAlertScreen;
