import React, { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { HospitalSelection } from './components/HospitalSelection';
import { ActiveEmergency } from './components/ActiveEmergency';
import { HospitalDashboard } from './components/HospitalDashboard';
import { AmbulanceDetails } from './components/AmbulanceDetails';
import { RideSummary } from './components/RideSummary';
import { TrafficControl } from './components/TrafficControl';
import { History } from './components/History';
import { Profile } from './components/Profile';

import { TrafficPolicePanel } from './components/TrafficPolicePanel';

import { MobileNavigation } from './components/MobileNavigation';
import { AuthPage } from './components/AuthPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { Toaster } from './components/ui/sonner';
import { User, UserRole } from './types/user';

export type Screen = 
  | 'dashboard' 
  | 'hospital-selection' 
  | 'active-emergency' 
  | 'hospital-dashboard'
  | 'ambulance-details'
  | 'ride-summary'
  | 'traffic-control'
  | 'traffic-police'
  | 'history'
  | 'profile';

export interface Hospital {
  id: string;
  name: string;
  distance: string;
  eta: string;
  specialties: string[];
  availability: 'High' | 'Medium' | 'Low';
  coordinates: { lat: number; lng: number };
}

export interface Patient {
  name: string;
  age: string;
  gender: string;
  severity: 'Critical' | 'Urgent' | 'Stable';
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
  };
  symptoms: string;
  summary?: string;
}

export interface EmergencyState {
  isActive: boolean;
  selectedHospital?: Hospital;
  patient?: Patient;
  startTime?: Date;
  endTime?: Date;
  goldenHourCountdown?: number;
}

function AppContent() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('ambulance');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [emergencyState, setEmergencyState] = useState<EmergencyState>({
    isActive: false,
  });

  const [userLocation, setUserLocation] = useState({ lat: 26.9124, lng: 75.7873 }); // Default to Jaipur

  // Check for existing user session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('lifepath_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setCurrentUser(user);
        setUserRole(user.role);
        setIsAuthenticated(true);
        setShowLanding(false);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('lifepath_user');
      }
    }
  }, []);

  // Mock geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Keep default location if geolocation fails
        }
      );
    }
  }, []);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const startEmergency = () => {
    setEmergencyState({
      isActive: true,
      startTime: new Date(),
      goldenHourCountdown: 3600, // 60 minutes in seconds
    });
    // Stay on dashboard to show hospital recommendations immediately
  };

  const selectHospital = (hospital: Hospital) => {
    setEmergencyState(prev => ({
      ...prev,
      selectedHospital: hospital,
    }));
    setCurrentScreen('active-emergency');
  };

  const endEmergency = () => {
    setEmergencyState(prev => ({
      ...prev,
      isActive: false,
      endTime: new Date(),
    }));
    setCurrentScreen('ride-summary');
  };

  const updatePatient = (patient: Patient) => {
    setEmergencyState(prev => ({
      ...prev,
      patient,
    }));
  };

  const cancelEmergency = () => {
    setEmergencyState({
      isActive: false,
    });
  };

  const handleSignIn = (role: UserRole, user: User) => {
    setCurrentUser(user);
    setUserRole(role);
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleSignUp = (role: UserRole, user: User) => {
    setCurrentUser(user);
    setUserRole(role);
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLandingSignIn = () => {
    setShowLanding(false);
  };

  const handleLandingSignUp = () => {
    setShowLanding(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('lifepath_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole('ambulance');
    setCurrentScreen('dashboard');
    setEmergencyState({ isActive: false });
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
  };

  const screenProps = {
    navigateToScreen,
    emergencyState,
    userLocation,
    startEmergency,
    selectHospital,
    endEmergency,
    updatePatient,
    cancelEmergency,
    handleSignOut,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard {...screenProps} />;
      case 'hospital-selection':
        return <HospitalSelection {...screenProps} />;
      case 'active-emergency':
        return <ActiveEmergency {...screenProps} />;
      case 'hospital-dashboard':
        return <HospitalDashboard {...screenProps} />;
      case 'ambulance-details':
        return <AmbulanceDetails {...screenProps} />;
      case 'ride-summary':
        return <RideSummary {...screenProps} />;
      case 'traffic-control':
        return <TrafficControl {...screenProps} />;
      case 'traffic-police':
        return <TrafficPolicePanel {...screenProps} />;
      case 'history':
        return <History {...screenProps} />;
      case 'profile':
        return <Profile {...screenProps} currentUser={currentUser || undefined} />;

      default:
        return <Dashboard {...screenProps} />;
    }
  };

  // Show landing page first, then auth
  if (showLanding) {
    return (
      <div className="min-h-screen bg-background">
        <Landing onSignIn={handleLandingSignIn} onSignUp={handleLandingSignUp} />
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onSignIn={handleSignIn} onSignUp={handleSignUp} onBackToHome={handleBackToLanding} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar 
        onSignOut={handleSignOut}
        onBackToHome={handleBackToLanding}
        showBackToHome={currentScreen === 'dashboard'}
        onEmergencyTriggered={startEmergency}
        navigateToScreen={navigateToScreen}
        currentUser={currentUser || undefined}
      />
      {renderScreen()}
      <MobileNavigation 
        currentScreen={currentScreen}
        navigateToScreen={navigateToScreen}
        emergencyState={emergencyState}
      />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ActivityProvider>
        <AppContent />
      </ActivityProvider>
    </LanguageProvider>
  );
}