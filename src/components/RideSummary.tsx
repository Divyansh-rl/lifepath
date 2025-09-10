import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Building2, 
  User, 
  Activity,
  TrendingUp,
  Download,
  Home
} from 'lucide-react';
import type { Screen, EmergencyState } from '../App';

interface RideSummaryProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
}

export function RideSummary({ navigateToScreen, emergencyState }: RideSummaryProps) {
  const calculateDuration = () => {
    if (emergencyState.startTime && emergencyState.endTime) {
      const duration = emergencyState.endTime.getTime() - emergencyState.startTime.getTime();
      return Math.floor(duration / 60000); // Convert to minutes
    }
    return 0;
  };

  const duration = calculateDuration();
  const timeSaved = Math.floor(Math.random() * 5) + 3; // Mock time saved calculation

  return (
    <div className="min-h-screen p-4 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-600 rounded-lg">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Emergency Complete</h1>
            <p className="text-muted-foreground">Mission accomplished successfully</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            onClick={() => navigateToScreen('dashboard')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return to Dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Success Banner */}
        <Card className="p-6 mb-6 bg-green-50 border-green-200">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">Emergency Successfully Completed</h2>
            <p className="text-green-700">
              Patient safely delivered to {emergencyState.selectedHospital?.name}
            </p>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mission Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Mission Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Total Duration</span>
                </div>
                <Badge variant="secondary">{duration} minutes</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Distance Traveled</span>
                </div>
                <Badge variant="secondary">2.3 km</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Destination</span>
                </div>
                <span className="text-sm">{emergencyState.selectedHospital?.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>Time Saved</span>
                </div>
                <Badge className="bg-green-100 text-green-700">{timeSaved} minutes</Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Timeline</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Emergency Started: {emergencyState.startTime?.toLocaleTimeString()}</div>
                  <div>Hospital Selected: {emergencyState.selectedHospital?.name}</div>
                  <div>Route Duration: {emergencyState.selectedHospital?.eta}</div>
                  <div>Emergency Ended: {emergencyState.endTime?.toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Patient Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </h3>
            
            {emergencyState.patient ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{emergencyState.patient.name || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Age</div>
                    <div className="font-medium">{emergencyState.patient.age || 'Not provided'}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Gender</div>
                    <div className="font-medium">{emergencyState.patient.gender || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Severity</div>
                    <Badge className={
                      emergencyState.patient.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      emergencyState.patient.severity === 'Urgent' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }>
                      {emergencyState.patient.severity}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    Final Vital Signs
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>BP: {emergencyState.patient.vitals.bloodPressure || 'N/A'}</div>
                    <div>HR: {emergencyState.patient.vitals.heartRate || 'N/A'} bpm</div>
                    <div>Temp: {emergencyState.patient.vitals.temperature || 'N/A'}°F</div>
                    <div>O2 Sat: {emergencyState.patient.vitals.oxygenSaturation || 'N/A'}%</div>
                  </div>
                </div>

                {emergencyState.patient.symptoms && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Symptoms Reported</div>
                    <div className="text-sm bg-muted p-2 rounded">
                      {emergencyState.patient.symptoms}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No patient information was recorded</p>
              </div>
            )}
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-green-700">Route Efficiency</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">A+</div>
                  <div className="text-xs text-blue-700">Response Grade</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-xs text-purple-700">Traffic Signals Cleared</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium">Key Achievements</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Golden Hour preserved - {Math.floor(((3600 - (emergencyState.goldenHourCountdown || 0)) / 3600) * 100)}% utilized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Optimal hospital selection based on specialties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Real-time patient data transmitted to hospital</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Traffic optimization system utilized</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* System Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Performance</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">GPS Accuracy</span>
                <Badge className="bg-green-100 text-green-700">Excellent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hospital Communication</span>
                <Badge className="bg-green-100 text-green-700">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Traffic System Integration</span>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Recommendations</span>
                <Badge className="bg-blue-100 text-blue-700">Utilized</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Transmission</span>
                <Badge className="bg-green-100 text-green-700">Complete</Badge>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Mission Rating</p>
              <div className="text-3xl font-bold text-green-600 mb-1">Excellent</div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigateToScreen('dashboard')}>
            Start New Emergency
          </Button>
          <Button variant="outline">
            View Analytics
          </Button>
          <Button variant="outline">
            Generate Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}