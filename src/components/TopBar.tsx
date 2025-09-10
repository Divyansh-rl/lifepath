import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LanguageSelector } from './LanguageSelector';

import { 
  LogOut, 
  Home,
  Shield
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';
import type { Screen } from '../App';
import type { User } from '../types/user';

interface TopBarProps {
  onSignOut: () => void;
  onBackToHome?: () => void;
  showBackToHome?: boolean;
  onEmergencyTriggered?: () => void;
  navigateToScreen?: (screen: Screen) => void;
  currentUser?: User;
}

export function TopBar({ onSignOut, onBackToHome, showBackToHome = false, onEmergencyTriggered, navigateToScreen, currentUser }: TopBarProps) {
  const { t } = useLanguage();
  
  const userData = {
    name: currentUser?.name || 'Demo User',
    employeeId: currentUser?.employeeId || 'DEMO-0000',
    unit: currentUser?.unit || 'Demo Unit',
    initials: currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'DU'
  };





  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 pt-safe">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              {userData.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900">{userData.name}</span>
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                <Shield className="h-3 w-3 mr-1" />
                {userData.employeeId}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">{userData.unit} • Jaipur EMS</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">


          {/* Language Selector */}
          <LanguageSelector variant="compact" />



          {/* Back to Landing */}
          {showBackToHome && onBackToHome && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBackToHome}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-2 py-1 h-8"
            >
              <Home className="h-3 w-3 mr-1" />
              {t('nav.home')}
            </Button>
          )}

          {/* Sign Out */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onSignOut}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs px-2 py-1 h-8"
          >
            <LogOut className="h-3 w-3 mr-1" />
            {t('auth.signout')}
          </Button>
        </div>
      </div>
    </div>
  );
}