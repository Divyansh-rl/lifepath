import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LanguageSelector } from './LanguageSelector';
import { UpdatesModal } from './UpdatesModal';
import { BugReportModal } from './BugReportModal';
import { 
  User, 
  LogOut, 
  Home,
  Shield,
  Bell,
  Sparkles,
  Bug
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useActivity } from '../contexts/ActivityContext';

interface ProfileHeaderProps {
  onSignOut: () => void;
  onBackToHome?: () => void;
  showBackToHome?: boolean;
}

export function ProfileHeader({ onSignOut, onBackToHome, showBackToHome = false }: ProfileHeaderProps) {
  const { t } = useLanguage();
  const { hasUnreadUpdates } = useActivity();
  
  const userData = {
    name: 'Priya Sharma',
    employeeId: 'EMS-2547',
    unit: 'Unit 17',
    initials: 'PS'
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
            <span className="text-xs text-gray-500">{userData.unit} • Mumbai EMS</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <LanguageSelector variant="compact" />

          {/* Updates/What's New */}
          <UpdatesModal>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
              <Sparkles className="h-4 w-4 text-gray-600" />
              {hasUnreadUpdates && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </Button>
          </UpdatesModal>

          {/* Bug Report */}
          <BugReportModal>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bug className="h-4 w-4 text-gray-600" />
            </Button>
          </BugReportModal>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4 text-gray-600" />
          </Button>

          {/* Back to Landing */}
          {showBackToHome && onBackToHome && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToHome}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-2 py-1 h-8"
            >
              <Home className="h-3 w-3 mr-1" />
              Landing
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
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}