import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  ArrowLeft, 
  Building2, 
  Ambulance, 
  Clock, 
  AlertTriangle, 
  Users,
  Bed,
  UserCheck,
  Home
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Screen, EmergencyState } from '../App';

interface HospitalDashboardProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
}

const mockIncomingAmbulances = [
  {
    id: 'AMB-001',
    eta: '8 minutes',
    severity: 'Critical' as const,
    patientInfo: 'female, 45, Chest Pain',
    driverName: 'Manish Gupta',
    unit: 'Unit 17',
    distance: '2.3 km'
  },
  {
    id: 'AMB-002',
    eta: '15 minutes',
    severity: 'Urgent' as const,
    patientInfo: 'male, 28, Fracture',
    driverName: 'Vikram Singh',
    unit: 'Unit 23',
    distance: '4.1 km'
  },
  {
    id: 'AMB-003',
    eta: '22 minutes',
    severity: 'Stable' as const,
    patientInfo: 'female, 65, Diabetic',
    driverName: 'Sunita Agarwal',
    unit: 'Unit 09',
    distance: '7.8 km'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
    case 'Urgent': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Stable': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function HospitalDashboard({ navigateToScreen, emergencyState }: HospitalDashboardProps) {
  return (
    <div className="min-h-screen p-4 bg-background animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('active-emergency')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Hospital Dashboard</h1>
              <p className="text-muted-foreground">
                {emergencyState.selectedHospital?.name || 'SMS Hospital Jaipur'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('dashboard')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <Button variant="outline" size="sm">
            Emergency Protocols
          </Button>
          <Button variant="outline" size="sm">
            Staff Directory
          </Button>
        </div>
      </div>

      {/* Hospital Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Ambulance className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-sm text-muted-foreground">Incoming</div>
        </Card>
        <Card className="p-4 text-center">
          <Bed className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-muted-foreground">Available Beds</div>
        </Card>
        <Card className="p-4 text-center">
          <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-sm text-muted-foreground">On-duty Staff</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">12</div>
          <div className="text-sm text-muted-foreground">Avg. Wait (min)</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Incoming Ambulances */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Ambulance className="h-5 w-5 text-red-600" />
              Incoming Ambulances
            </h2>
            
            <div className="space-y-4">
              {mockIncomingAmbulances.map((ambulance, index) => (
                <Card key={ambulance.id} className="p-4 hover:shadow-md transition-all duration-300 hover-lift cursor-pointer animate-slide-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {ambulance.unit.split(' ')[1]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{ambulance.unit}</span>
                          <Badge className={getSeverityColor(ambulance.severity)}>
                            {ambulance.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Driver: {ambulance.driverName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Patient: {ambulance.patientInfo}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{ambulance.eta}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {ambulance.distance}
                      </div>
                      <Button 
                        size="sm" 
                        className="mt-2"
                        onClick={() => navigateToScreen('ambulance-details')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Hospital Resources */}
        <div className="space-y-6">
          {/* Emergency Department Status */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              ED Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Trauma Bay 1</span>
                <Badge className="bg-green-100 text-green-700">Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Trauma Bay 2</span>
                <Badge className="bg-green-100 text-green-700">Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Trauma Bay 3</span>
                <Badge className="bg-red-100 text-red-700">Occupied</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CT Scanner</span>
                <Badge className="bg-yellow-100 text-yellow-700">Scheduled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">OR Availability</span>
                <Badge className="bg-green-100 text-green-700">2 Ready</Badge>
              </div>
            </div>
          </Card>

          {/* Staff on Duty */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              On-Duty Staff
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Dr. Rohit Sharma</span>
                <Badge variant="secondary">Trauma Lead</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Dr. Priya Agarwal</span>
                <Badge variant="secondary">Emergency</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Nurse Amit Gupta</span>
                <Badge variant="secondary">Triage</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Nurse Pooja Sharma</span>
                <Badge variant="secondary">Critical Care</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Staff
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Alert Trauma Team
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Request Additional Staff
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Contact Blood Bank
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Update Bed Status
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">Patient discharged from Bay 1</span>
                <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Trauma team activated</span>
                <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-muted-foreground">CT scan completed</span>
                <span className="text-xs text-muted-foreground ml-auto">8 min ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}