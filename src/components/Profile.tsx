import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Settings, 
  Award,
  Clock,
  TrendingUp,
  Edit,
  Save,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Screen } from '../App';
import type { User as UserType } from '../types/user';

interface ProfileProps {
  navigateToScreen: (screen: Screen) => void;
  handleSignOut: () => void;
  currentUser?: UserType;
}

export function Profile({ navigateToScreen, handleSignOut, currentUser }: ProfileProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Demo User',
    employeeId: currentUser?.employeeId || 'DEMO-0000',
    phone: currentUser?.phone || '+91 98765 43210',
    email: currentUser?.email || 'user@lifepath.com',
    unit: currentUser?.unit || 'Demo Unit',
    station: currentUser?.station || 'Demo Station',
    certification: currentUser?.certification || 'Demo Cert',
    yearsOfService: currentUser?.yearsOfService || 1,
    notifications: {
      emergency: true,
      traffic: true,
      weather: false,
      system: true
    },
    preferences: {
      autoRoute: true,
      voiceGuidance: true,
      darkMode: false
    }
  });

  // Update profile when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfile(prev => ({
        ...prev,
        name: currentUser.name,
        employeeId: currentUser.employeeId || 'DEMO-0000',
        phone: currentUser.phone || '+91 98765 43210',
        email: currentUser.email,
        unit: currentUser.unit || 'Demo Unit',
        station: currentUser.station || 'Demo Station',
        certification: currentUser.certification || 'Demo Cert',
        yearsOfService: currentUser.yearsOfService || 1
      }));
    }
  }, [currentUser]);

  const handleSave = () => {
    setIsEditing(false);
    // Update the user data in localStorage
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: profile.name,
        phone: profile.phone,
        email: profile.email
      };
      localStorage.setItem('lifepath_user', JSON.stringify(updatedUser));
    }
  };

  const stats = [
    { label: 'Total Calls', value: '234', icon: Phone, color: 'text-blue-600' },
    { label: 'Response Time', value: '8.2 min', icon: Clock, color: 'text-green-600' },
    { label: 'Success Rate', value: '98.5%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Lives Saved', value: '47', icon: Award, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen p-4 pb-20 md:pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('profile.title')}</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Button
          variant={isEditing ? 'default' : 'outline'}
          size="sm"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
              {profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-bold max-w-xs"
                />
              ) : (
                <h2 className="text-xl font-bold">{profile.name}</h2>
              )}
              <Badge variant="secondary">{profile.certification}</Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>{profile.employeeId} • {profile.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{profile.station}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>{profile.yearsOfService} years of service</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStats(!showStats)}
            >
              {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Performance Stats */}
      {showStats && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Performance Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Contact Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <div className="mt-1 text-sm bg-muted p-2 rounded">{profile.phone}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              ) : (
                <div className="mt-1 text-sm bg-muted p-2 rounded">{profile.email}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="unit">Emergency Unit</Label>
              <div className="mt-1 text-sm bg-muted p-2 rounded">{profile.unit}</div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Emergency Alerts</Label>
                <p className="text-sm text-muted-foreground">Critical emergency notifications</p>
              </div>
              <Switch
                checked={profile.notifications.emergency}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, emergency: checked }
                }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Traffic Updates</Label>
                <p className="text-sm text-muted-foreground">Real-time traffic information</p>
              </div>
              <Switch
                checked={profile.notifications.traffic}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, traffic: checked }
                }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Weather Alerts</Label>
                <p className="text-sm text-muted-foreground">Severe weather warnings</p>
              </div>
              <Switch
                checked={profile.notifications.weather}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, weather: checked }
                }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">System Updates</Label>
                <p className="text-sm text-muted-foreground">App and system notifications</p>
              </div>
              <Switch
                checked={profile.notifications.system}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, system: checked }
                }))}
              />
            </div>
          </div>
        </Card>

        {/* App Preferences */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Auto Route Selection</Label>
                <p className="text-sm text-muted-foreground">Automatically select optimal routes</p>
              </div>
              <Switch
                checked={profile.preferences.autoRoute}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, autoRoute: checked }
                }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Voice Guidance</Label>
                <p className="text-sm text-muted-foreground">Audio navigation instructions</p>
              </div>
              <Switch
                checked={profile.preferences.voiceGuidance}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, voiceGuidance: checked }
                }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
              <Switch
                checked={profile.preferences.darkMode}
                onCheckedChange={(checked) => setProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, darkMode: checked }
                }))}
              />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Account Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Download Data
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Help & Support
            </Button>
            <Separator />
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700" 
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>

      {/* Certifications & Training */}
      <Card className="mt-6 p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certifications & Training
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">EMT-Paramedic</span>
              <Badge className="bg-green-100 text-green-700">Valid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">CPR Certification</span>
              <Badge className="bg-green-100 text-green-700">Valid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">ACLS Certification</span>
              <Badge className="bg-yellow-100 text-yellow-700">Expires in 3 months</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Hazmat Training</span>
              <Badge className="bg-green-100 text-green-700">Valid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Defensive Driving</span>
              <Badge className="bg-green-100 text-green-700">Valid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Crisis Management</span>
              <Badge className="bg-green-100 text-green-700">Valid</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}