import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Navigation, 
  Phone, 
  AlertTriangle,
  Building2,
  Car,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Screen, EmergencyState } from '../App';

interface ActiveEmergencyProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
  userLocation: { lat: number; lng: number };
  endEmergency: () => void;
}

export function ActiveEmergency({ 
  navigateToScreen, 
  emergencyState, 
  userLocation,
  endEmergency 
}: ActiveEmergencyProps) {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(emergencyState.goldenHourCountdown || 3600);
  const [currentETA, setCurrentETA] = useState(8); // minutes
  
  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Mock ETA updates
  useEffect(() => {
    const etaUpdater = setInterval(() => {
      setCurrentETA(prev => Math.max(1, prev - 0.1));
    }, 10000);
    return () => clearInterval(etaUpdater);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const goldenHourProgress = ((3600 - countdown) / 3600) * 100;
  const isGoldenHourCritical = countdown < 900; // Less than 15 minutes

  return (
    <div className="min-h-screen p-4 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('hospital-selection')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Active Emergency</h1>
            <p className="text-muted-foreground">
              En route to {emergencyState.selectedHospital?.name}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call Hospital
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={endEmergency}
          >
            End Emergency
          </Button>
        </div>
      </div>

      {/* Golden Hour Banner */}
      <Card className={`p-6 mb-6 ${isGoldenHourCritical ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`h-6 w-6 ${isGoldenHourCritical ? 'text-red-600' : 'text-yellow-600'}`} />
            <div>
              <h2 className={`text-xl font-bold ${isGoldenHourCritical ? 'text-red-900' : 'text-yellow-900'}`}>
                Golden Hour Countdown
              </h2>
              <p className={`text-sm ${isGoldenHourCritical ? 'text-red-700' : 'text-yellow-700'}`}>
                Critical timeframe for optimal patient outcomes
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${isGoldenHourCritical ? 'text-red-600' : 'text-yellow-600'}`}>
              {formatTime(countdown)}
            </div>
            <div className="text-sm text-muted-foreground">remaining</div>
          </div>
        </div>
        <Progress 
          value={goldenHourProgress} 
          className={`h-3 ${isGoldenHourCritical ? '[&>div]:bg-red-500' : '[&>div]:bg-yellow-500'}`}
        />
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Route Map */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-96 lg:h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
              {/* Mock Route Display */}
              <div className="absolute inset-4 bg-white rounded border-2 border-green-200 flex flex-col">
                {/* Route Header */}
                <div className="p-4 border-b bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Active Route</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      ETA: {Math.ceil(currentETA)} min
                    </Badge>
                  </div>
                </div>
                
                {/* Route Visualization */}
                <div className="flex-1 flex items-center justify-center relative">
                  <div className="text-center">
                    {/* Current Location */}
                    <div className="mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-full text-white font-bold">
                        A
                      </div>
                      <div className="mt-2 text-sm font-medium">Current Location</div>
                      <div className="text-xs text-muted-foreground">Ambulance Position</div>
                    </div>
                    
                    {/* Route Line */}
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-green-500 rounded-full"></div>
                      <div className="flex items-center gap-2 py-2">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span className="text-xs text-blue-600">2.3 km remaining</span>
                      </div>
                      <div className="w-1 h-16 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                    </div>
                    
                    {/* Hospital */}
                    <div className="mt-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full text-white">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="mt-2 text-sm font-medium">{emergencyState.selectedHospital?.name}</div>
                      <div className="text-xs text-muted-foreground">Destination Hospital</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Speed indicator */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">45 mph</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Hospital Info */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Hospital Details
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">{emergencyState.selectedHospital?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {emergencyState.selectedHospital?.distance} • ETA: {emergencyState.selectedHospital?.eta}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {emergencyState.selectedHospital?.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigateToScreen('hospital-dashboard')}
              >
                View Hospital Panel
              </Button>
            </div>
          </Card>

          {/* Navigation Controls */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Navigation
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-semibold">{Math.ceil(currentETA)}</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-semibold">2.3</div>
                  <div className="text-xs text-muted-foreground">km left</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigateToScreen('traffic-control')}
              >
                View Traffic Control
              </Button>
            </div>
          </Card>

          {/* Emergency Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Emergency Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Dispatch
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigateToScreen('ambulance-details')}
              >
                Update Patient Info
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Request Backup
              </Button>
            </div>
          </Card>

          {/* Status Indicators */}
          <Card className="p-6">
            <h3 className="mb-4">System Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>GPS Signal</span>
                <Badge className="bg-green-100 text-green-700">Strong</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Radio</span>
                <Badge className="bg-green-100 text-green-700">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Hospital Link</span>
                <Badge className="bg-blue-100 text-blue-700">Active</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}