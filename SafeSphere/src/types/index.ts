// Type definitions for SafeSphere app

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  emergencyContacts?: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Alert {
  id: string;
  type: 'panic' | 'threat' | 'disaster' | 'weather' | 'health' | 'sos';
  message: string;
  location: Location;
  timestamp: number;
  status: 'active' | 'resolved' | 'cancelled';
}

export interface SafeRoute {
  id: string;
  startLocation: Location;
  endLocation: Location;
  waypoints: Location[];
  estimatedTime: number;
  safetyScore: number;
}

export interface DangerZone {
  id: string;
  location: Location;
  radius: number;
  type: 'crime' | 'accident' | 'construction' | 'weather';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: number;
}

export interface WeatherAlert {
  id: string;
  type: 'storm' | 'flood' | 'earthquake' | 'fire' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: Location;
  timestamp: number;
  expiresAt: number;
}

export interface HealthEmergency {
  id: string;
  type: 'medical' | 'injury' | 'mental_health' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: Location;
  timestamp: number;
  medicalInfo?: string;
}
