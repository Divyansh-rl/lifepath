import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Siren, 
  MapPin, 
  Clock, 
  Navigation, 
  Building2, 
  Star,
  ChevronRight,
  Activity,
  Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Hospital, EmergencyState } from '../App';

interface MobileDashboardLayoutProps {
  hospitals: Hospital[];
  emergencyState: EmergencyState;
  userLocation: { lat: number; lng: number };
  onHospitalSelect: (hospital: Hospital) => void;
  onStartEmergency: () => void;
}

export function MobileDashboardLayout({
  hospitals,
  emergencyState,
  userLocation,
  onHospitalSelect,
  onStartEmergency
}: MobileDashboardLayoutProps) {
  const { t } = useLanguage();

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4 md:hidden">
      {/* Emergency Status Card */}
      {emergencyState.isActive && (
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 p-4 mobile-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-600 rounded-full">
              <Siren className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900">Emergency Active</h3>
              <p className="text-sm text-red-700">
                {emergencyState.selectedHospital 
                  ? `En route to ${emergencyState.selectedHospital.name}`
                  : 'Selecting hospital...'
                }
              </p>
            </div>
            <Badge className="bg-red-600 text-white">
              <Clock className="h-3 w-3 mr-1" />
              {emergencyState.goldenHourCountdown 
                ? `${Math.floor(emergencyState.goldenHourCountdown / 60)}m`
                : 'Active'
              }
            </Badge>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center hover-lift">
          <div className="text-2xl font-bold text-blue-600">{hospitals.length}</div>
          <div className="text-sm text-gray-600">Nearby Hospitals</div>
        </Card>
        <Card className="p-4 text-center hover-lift">
          <div className="text-2xl font-bold text-green-600">4.2</div>
          <div className="text-sm text-gray-600">Avg Response (min)</div>
        </Card>
      </div>

      {/* Hospitals List */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Nearby Hospitals
          </h3>
          <Badge variant="outline" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Jaipur
          </Badge>
        </div>
        
        <div className="space-y-3">
          {hospitals.slice(0, 3).map((hospital) => (
            <div 
              key={hospital.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors touch-target"
              onClick={() => onHospitalSelect(hospital)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-sm truncate pr-2">{hospital.name}</h4>
                  <Badge 
                    size="sm" 
                    className={`text-xs ${getAvailabilityColor(hospital.availability)} flex-shrink-0`}
                  >
                    {hospital.availability}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {hospital.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {hospital.eta}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {hospital.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs px-2 py-0.5">
                      {specialty}
                    </Badge>
                  ))}
                  {hospital.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{hospital.specialties.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              
              <ChevronRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          ))}
        </div>
        
        {hospitals.length > 3 && (
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All {hospitals.length} Hospitals
          </Button>
        )}
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 bg-green-50 rounded-md">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1 text-sm">
              <div className="font-medium">Emergency completed</div>
              <div className="text-gray-600 text-xs">SMS Hospital • 2h ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1 text-sm">
              <div className="font-medium">Traffic clearance</div>
              <div className="text-gray-600 text-xs">MI Road • 4h ago</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Team Status */}
      <Card className="p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Team Status
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>12 Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>3 On Call</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>2 En Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>1 Off Duty</span>
          </div>
        </div>
      </Card>
    </div>
  );
}