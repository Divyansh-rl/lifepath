import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LanguageSelector } from './LanguageSelector';
import { 
  Phone, 
  Shield,
  LogOut, 
  Home, 
  MessageSquare,
  Menu,
  X,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';
import type { Screen, EmergencyState } from '../App';

interface MobileTopBarProps {
  onSignOut: () => void;
  onBackToHome?: () => void;
  showBackToHome?: boolean;
  onEmergencyTriggered?: () => void;
  navigateToScreen?: (screen: Screen) => void;
  emergencyState: EmergencyState;
  userLocation: { lat: number; lng: number };
}

export function MobileTopBar({ 
  onSignOut, 
  onBackToHome, 
  showBackToHome = false, 
  onEmergencyTriggered, 
  navigateToScreen,
  emergencyState,
  userLocation
}: MobileTopBarProps) {
  const { t } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  
  const userData = {
    name: 'Amit Gupta',
    employeeId: 'EMS-2547',
    unit: 'Unit 17',
    initials: 'AG'
  };

  const handleEmergency112 = () => {
    toast.success('🚨 Emergency 112 Called', {
      description: 'All emergency services notified • Location shared'
    });
    onEmergencyTriggered?.();
    
    // Strong haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const handleAmbulance108 = () => {
    toast.success('🚑 Ambulance 108 Called', {
      description: 'Ambulance services notified • ETA: 5-8 minutes'
    });
    onEmergencyTriggered?.();
    
    if ('vibrate' in navigator) {
      navigator.vibrate([150, 75, 150]);
    }
  };

  const sendFeedback = () => {
    toast.success(t('activity.feedback'), {
      description: 'Thank you for your feedback!'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Main Top Bar */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 pt-safe md:hidden">
        <div className="flex items-center justify-between">
          {/* Left Section - User Info */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                {userData.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-gray-900 truncate">{userData.name}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="truncate">{userData.unit}</span>
                <span>•</span>
                <span>{getCurrentTime()}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Emergency & Menu */}
          <div className="flex items-center gap-1">
            {/* Emergency SOS Buttons */}
            <Button 
              onClick={handleEmergency112}
              size="sm" 
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 h-8 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Phone className="h-3 w-3 mr-1" />
              <span className="font-bold text-xs">112</span>
            </Button>
            
            <Button 
              onClick={handleAmbulance108}
              size="sm" 
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 px-2 py-1 h-8 transition-all duration-200 hover:scale-105"
            >
              <Phone className="h-3 w-3 mr-1" />
              <span className="font-bold text-xs">108</span>
            </Button>

            {/* Menu Button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMenu(true)}
              className="h-8 w-8 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Emergency Status Indicator */}
        {emergencyState.isActive && (
          <div className="mt-2 flex items-center gap-2 px-2 py-1 bg-red-50 rounded-md border border-red-200">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-red-700">Emergency Active</span>
            </div>
            {emergencyState.selectedHospital && (
              <div className="flex-1 text-xs text-red-600 truncate">
                → {emergencyState.selectedHospital.name}
              </div>
            )}
            {emergencyState.goldenHourCountdown && (
              <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                <Clock className="h-2 w-2 mr-1" />
                {Math.floor(emergencyState.goldenHourCountdown / 60)}m
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Slide-out Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl animate-slide-in">
            <div className="p-4 pt-safe">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Menu</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowMenu(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info Card */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{userData.name}</div>
                    <div className="text-xs text-gray-600">{userData.employeeId} • {userData.unit}</div>
                  </div>
                </div>
                <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-md inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Jaipur, Rajasthan
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Quick Actions</div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start h-10"
                  onClick={sendFeedback}
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Send Feedback
                </Button>

                {showBackToHome && onBackToHome && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onBackToHome}
                    className="w-full justify-start h-10 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                  >
                    <Home className="h-4 w-4 mr-3" />
                    Back to Home
                  </Button>
                )}

                <div className="border-t pt-3 mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Settings</div>
                  
                  <div className="mb-3">
                    <label className="text-xs text-gray-600 mb-1 block">Language</label>
                    <LanguageSelector variant="mobile" />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowMenu(false);
                    onSignOut();
                  }}
                  className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 mt-4"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>

              {/* Emergency Services Footer */}
              <div className="mt-6 pt-4 border-t">
                <div className="text-xs text-gray-600 mb-2">Emergency Services</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex flex-col items-center p-2 bg-red-50 rounded-md">
                    <Shield className="h-4 w-4 text-red-600 mb-1" />
                    <span>112</span>
                    <span className="text-gray-500">All</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-red-50 rounded-md">
                    <Phone className="h-4 w-4 text-red-600 mb-1" />
                    <span>108</span>
                    <span className="text-gray-500">Ambulance</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-orange-50 rounded-md">
                    <Zap className="h-4 w-4 text-orange-600 mb-1" />
                    <span>101</span>
                    <span className="text-gray-500">Fire</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}