import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Clock, User, Siren, Building2, Route, Activity, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Screen, EmergencyState } from '../App';

interface MobileNavigationProps {
  currentScreen: Screen;
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
}

export function MobileNavigation({ currentScreen, navigateToScreen, emergencyState }: MobileNavigationProps) {
  const { t } = useLanguage();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Handle swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;
    
    if (isUpSwipe) {
      // Swipe up to open quick actions or emergency
      setShowSwipeHint(false);
      if (!emergencyState.isActive) {
        // Could trigger emergency quick actions
      }
    }
    
    if (isDownSwipe && emergencyState.isActive) {
      // Swipe down to minimize emergency bar (future feature)
    }
  };

  // Hide swipe hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Different nav items based on emergency state
  const navItems = emergencyState.isActive ? [
    {
      id: 'dashboard' as Screen,
      icon: Home,
      label: t('nav.dashboard'),
      isActive: currentScreen === 'dashboard'
    },
    {
      id: 'active-emergency' as Screen,
      icon: Activity,
      label: t('nav.emergency'),
      isActive: currentScreen === 'active-emergency',
      badge: emergencyState.selectedHospital ? '!' : undefined
    },
    {
      id: 'hospital-dashboard' as Screen,
      icon: Building2,
      label: t('hospital.dashboard'),
      isActive: currentScreen === 'hospital-dashboard'
    },
    {
      id: 'traffic-control' as Screen,
      icon: Route,
      label: t('nav.traffic'),
      isActive: currentScreen === 'traffic-control'
    }
  ] : [
    {
      id: 'dashboard' as Screen,
      icon: Home,
      label: t('nav.dashboard'),
      isActive: currentScreen === 'dashboard'
    },
    {
      id: 'hospital-dashboard' as Screen,
      icon: Building2,
      label: t('hospital.dashboard'),
      isActive: currentScreen === 'hospital-dashboard'
    },
    {
      id: 'traffic-control' as Screen,
      icon: Route,
      label: t('traffic.control_center'),
      isActive: currentScreen === 'traffic-control'
    },
    {
      id: 'history' as Screen,
      icon: Clock,
      label: t('nav.history'),
      isActive: currentScreen === 'history'
    },
    {
      id: 'profile' as Screen,
      icon: User,
      label: t('nav.profile'),
      isActive: currentScreen === 'profile'
    }
  ];

  return (
    <>
      {/* Emergency Status Bar - shows when emergency is active */}
      {emergencyState.isActive && (
        <>
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white pt-safe px-3 pb-3 z-50 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Siren className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">{t('emergency.active')}</span>
              </div>
              <div className="flex items-center gap-2">
                {emergencyState.selectedHospital && (
                  <span className="text-xs truncate max-w-32">→ {emergencyState.selectedHospital.name}</span>
                )}
                <Badge variant="secondary" className="bg-white/20 text-white text-xs font-mono">
                  {emergencyState.goldenHourCountdown ? 
                    `${Math.floor((emergencyState.goldenHourCountdown || 0) / 60)}:${((emergencyState.goldenHourCountdown || 0) % 60).toString().padStart(2, '0')}` 
                    : t('emergency.active')
                  }
                </Badge>
              </div>
            </div>
          </div>
          {/* Spacer for emergency bar */}
          <div className="h-14 pt-safe md:hidden"></div>
        </>
      )}

      {/* Swipe Hint */}
      {showSwipeHint && !emergencyState.isActive && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 md:hidden">
          <div className="bg-black/80 text-white px-3 py-2 rounded-full text-xs flex items-center gap-2 animate-bounce">
            <ChevronUp className="h-3 w-3" />
            Swipe up for emergency
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border shadow-lg z-40 md:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex items-center justify-around py-2 pb-safe">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-2 relative min-w-0 flex-1 transition-all duration-200 ${
                  item.isActive 
                    ? 'text-primary bg-primary/10 scale-110' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
                }`}
                onClick={() => {
                  navigateToScreen(item.id);
                  // Haptic feedback for navigation
                  if ('vibrate' in navigator) {
                    navigator.vibrate(25);
                  }
                }}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className="text-xs leading-none truncate">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Spacer for bottom navigation with safe area */}
      <div className="h-16 pb-safe md:hidden"></div>
    </>
  );
}