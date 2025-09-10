import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { BackToHome } from './BackToHome';
import { MapPin, Siren, Clock, Navigation, Building2, Star, Brain, X, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Screen, EmergencyState, Hospital } from '../App';

interface DashboardProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
  userLocation: { lat: number; lng: number };
  startEmergency: () => void;
  selectHospital: (hospital: Hospital) => void;
  cancelEmergency: () => void;
  handleSignOut: () => void;
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'SMS Hospital (Sawai Mansingh Hospital)',
    distance: '2.1 km',
    eta: '7 minutes',
    specialties: ['Emergency', 'Trauma', 'Cardiology'],
    availability: 'High',
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: '2',
    name: 'Fortis Escorts Hospital',
    distance: '3.5 km',
    eta: '11 minutes',
    specialties: ['Emergency', 'Pediatrics', 'Neurology'],
    availability: 'Medium',
    coordinates: { lat: 26.8851, lng: 75.8021 }
  },
  {
    id: '3',
    name: 'Jaipur Golden Hospital',    
    distance: '4.2 km',
    eta: '14 minutes',
    specialties: ['Emergency', 'Trauma', 'Surgery', 'ICU'],
    availability: 'High',
    coordinates: { lat: 26.9056, lng: 75.8080 }
  }
];

export function Dashboard({ navigateToScreen, emergencyState, userLocation, startEmergency, selectHospital, cancelEmergency, handleSignOut }: DashboardProps) {
  const { t } = useLanguage();
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<string | null>(null);
  const [hospitalSummaries, setHospitalSummaries] = useState<Record<string, string>>({});

  const generateHospitalSummary = async (hospital: Hospital) => {
    setIsGeneratingSummary(hospital.id);
    
    // Mock AI summary generation
    setTimeout(() => {
      const summaries = {
        '1': 'SMS Hospital is Rajasthan\'s premier government medical institution with comprehensive emergency and trauma care facilities. Features advanced cardiac care, multi-specialty ICU, and 24/7 specialist coverage with helicopter landing facility.',
        '2': 'Fortis Escorts Hospital is a leading private healthcare facility in Jaipur specializing in comprehensive medical care. Well-equipped emergency department with dedicated pediatric and neurology wings, CT/MRI available round the clock.',
        '3': 'Jaipur Golden Hospital is a major private healthcare facility providing quality emergency and trauma care services. Features comprehensive surgical facilities, dedicated trauma team, and advanced medical equipment with experienced specialist staff.'
      };
      
      setHospitalSummaries(prev => ({
        ...prev,
        [hospital.id]: summaries[hospital.id] || 'Summary not available'
      }));
      setIsGeneratingSummary(null);
    }, 1500);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20 md:pb-4 pt-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg">
            <Siren className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">LifePath</h1>
            <p className="text-muted-foreground">Ambulance Command Center - Jaipur</p>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          <BackToHome onBackToHome={handleSignOut} />

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('hospital-dashboard')}
            className="whitespace-nowrap"
          >
            {t('hospital.dashboard')}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('traffic-control')}
            className="whitespace-nowrap"
          >
            {t('traffic.control_center')}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('traffic-police')}
            className="whitespace-nowrap bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
          >
            🚔 {t('traffic.police_panel')}
          </Button>
        </div>
      </div>

      {/* Emergency Alert */}
      {emergencyState.isActive && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Active Emergency:</strong> Select a hospital below to continue.
          </AlertDescription>
        </Alert>
      )}

      {/* Hospital Recommendations - Show when emergency is active */}
      {emergencyState.isActive ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('hospital.incoming')}</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateToScreen('hospital-selection')}
              >
                {t('history.view_details')}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={cancelEmergency}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <X className="h-4 w-4" />
                {t('common.cancel')}
              </Button>
            </div>
          </div>
          
          {mockHospitals.map((hospital) => (
            <Card key={hospital.id} className="p-4 hover:shadow-lg transition-all duration-300 hover-lift animate-slide-in">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{hospital.name}</h3>
                    <Badge className={getAvailabilityColor(hospital.availability)}>
                      {hospital.availability} {t('hospital.capacity')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {hospital.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ETA: {hospital.eta}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Level 1 Trauma
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {hospitalSummaries[hospital.id] && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 text-blue-600 mt-1" />
                        <div>
                          <div className="font-medium text-blue-900 text-sm mb-1">AI Summary</div>
                          <p className="text-sm text-blue-800">{hospitalSummaries[hospital.id]}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    onClick={() => selectHospital(hospital)}
                    className="min-w-[100px]"
                  >
                    Select
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateHospitalSummary(hospital)}
                    disabled={isGeneratingSummary === hospital.id}
                    className="min-w-[100px]"
                  >
                    {isGeneratingSummary === hospital.id ? (
                      <>
                        <Brain className="h-4 w-4 mr-1 animate-spin" />
                        AI Working...
                      </>
                    ) : (
                      'Get Summary'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 lg:h-[400px] relative overflow-hidden hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                {/* Mock Map Interface */}
                <div className="absolute inset-4 bg-white rounded border-2 border-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Location - Jaipur</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Near: M.I. Road, C-Scheme Area
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      Lat: {userLocation.lat.toFixed(6)}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Lng: {userLocation.lng.toFixed(6)}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-700">GPS Active</span>
                    </div>
                  </div>
                </div>
                
                {/* Map overlay controls */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-lg shadow-lg p-2 space-y-2">
                    <Button size="sm" variant="ghost" className="w-full justify-start">
                      <Navigation className="h-4 w-4 mr-2" />
                      Zoom
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Emergency Status */}
            <Card className="p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <h3>Emergency Status</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    emergencyState.isActive 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {emergencyState.isActive ? t('emergency.active') : 'Ready'}
                  </span>
                </div>
                
                {emergencyState.startTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Started:</span>
                    <span className="text-sm">
                      {emergencyState.startTime.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                
                <Button 
                  onClick={startEmergency}
                  className="w-full transition-all duration-200 hover:scale-105"
                  size="lg"
                  disabled={emergencyState.isActive}
                >
                  <Siren className="h-4 w-4 mr-2" />
                  🚨 Start Emergency
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 hover-lift">
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">System initialized</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">GPS location acquired - Jaipur</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-muted-foreground">
                    {emergencyState.isActive ? 'Emergency in progress' : 'Awaiting emergency call'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 hover-lift">
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigateToScreen('history')}
                >
                  View Route History
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                >
                  Test Communications
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigateToScreen('profile')}
                >
                  Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}