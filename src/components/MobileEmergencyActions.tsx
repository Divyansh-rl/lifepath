import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Phone, 
  Siren, 
  Navigation, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Zap,
  Car,
  Hospital,
  Users,
  Shield
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';
import type { EmergencyState } from '../App';

interface MobileEmergencyActionsProps {
  emergencyState: EmergencyState;
  onEmergencyStart: () => void;
  userLocation: { lat: number; lng: number };
}

export function MobileEmergencyActions({ 
  emergencyState, 
  onEmergencyStart, 
  userLocation 
}: MobileEmergencyActionsProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressProgress, setPressProgress] = useState(0);

  const handleEmergencyPress = () => {
    const timer = setInterval(() => {
      setPressProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          triggerEmergency();
          return 0;
        }
        return prev + 5;
      });
    }, 50);
    
    setPressTimer(timer);
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleEmergencyRelease = () => {
    if (pressTimer) {
      clearInterval(pressTimer);
      setPressTimer(null);
      setPressProgress(0);
    }
  };

  const triggerEmergency = () => {
    onEmergencyStart();
    toast.success('🚨 Emergency Activated', {
      description: 'All services notified • Golden Hour started'
    });
    
    // Stronger haptic feedback for emergency activation
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  };

  const callEmergency = (service: string, number: string) => {
    toast.success(`📞 Calling ${service}`, {
      description: `Dialing ${number} • Location shared`
    });
    
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Location',
        text: `Emergency at coordinates: ${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}`,
        url: `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(
        `Emergency location: ${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}`
      );
      toast.success('Location copied to clipboard');
    }
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-4 md:hidden">
      {/* Quick Action Bar */}
      <div className="flex justify-center mb-3">
        <div className="flex gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0"
            onClick={shareLocation}
          >
            <MapPin className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0"
            onClick={() => callEmergency('Police', '112')}
          >
            <Shield className="h-4 w-4 text-blue-600" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0"
            onClick={() => callEmergency('Ambulance', '108')}
          >
            <Siren className="h-4 w-4 text-red-600" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0"
            onClick={() => callEmergency('Fire', '101')}
          >
            <Zap className="h-4 w-4 text-orange-600" />
          </Button>
        </div>
      </div>

      {/* Main Emergency Button */}
      <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0 shadow-2xl">
        <div className="p-4">
          {emergencyState.isActive ? (
            <div className="text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="font-bold">EMERGENCY ACTIVE</span>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Hospital: {emergencyState.selectedHospital?.name || 'Selecting...'}</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Clock className="h-3 w-3 mr-1" />
                  Golden Hour
                </Badge>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Button
                onTouchStart={handleEmergencyPress}
                onTouchEnd={handleEmergencyRelease}
                onMouseDown={handleEmergencyPress}
                onMouseUp={handleEmergencyRelease}
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 h-16 text-lg font-bold relative overflow-hidden"
                disabled={emergencyState.isActive}
              >
                <div className="flex items-center justify-center gap-3">
                  <AlertTriangle className="h-6 w-6" />
                  <span>HOLD FOR EMERGENCY</span>
                  <AlertTriangle className="h-6 w-6" />
                </div>
                
                {/* Progress indicator */}
                {pressProgress > 0 && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-white/60 transition-all duration-75"
                    style={{ width: `${pressProgress}%` }}
                  />
                )}
              </Button>
              
              <p className="text-center text-white/80 text-xs mt-2">
                Hold for 2 seconds to activate emergency
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Swipe Up Indicator */}
      {!isExpanded && (
        <div 
          className="flex justify-center mt-2"
          onClick={() => setIsExpanded(true)}
        >
          <div className="bg-white/90 rounded-full px-4 py-1">
            <div className="w-8 h-1 bg-gray-400 rounded-full" />
          </div>
        </div>
      )}

      {/* Expanded Quick Actions */}
      {isExpanded && (
        <Card className="mt-3 bg-white/95 backdrop-blur-md border-0 shadow-xl animate-slide-in">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">Quick Actions</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0 text-gray-500"
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button size="sm" className="flex flex-col gap-1 h-16">
                <Hospital className="h-4 w-4" />
                <span className="text-xs">Hospitals</span>
              </Button>
              
              <Button size="sm" variant="outline" className="flex flex-col gap-1 h-16">
                <Car className="h-4 w-4" />
                <span className="text-xs">Traffic</span>
              </Button>
              
              <Button size="sm" variant="outline" className="flex flex-col gap-1 h-16">
                <Users className="h-4 w-4" />
                <span className="text-xs">Contacts</span>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}