import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  TrafficCone, 
  MapPin, 
  Clock, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import type { Screen, EmergencyState } from '../App';

interface TrafficControlProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
}

interface TrafficLight {
  id: string;
  intersection: string;
  distance: string;
  status: 'green' | 'red' | 'clearing' | 'cleared';
  eta: number;
  coordinates: { lat: number; lng: number };
}

export function TrafficControl({ navigateToScreen, emergencyState }: TrafficControlProps) {
  const [autoMode, setAutoMode] = useState(true);
  const [systemActive, setSystemActive] = useState(true);
  const [trafficLights, setTrafficLights] = useState<TrafficLight[]>([
    {
      id: 'TL001',
      intersection: 'Ajmeri Gate Circle & MI Road (Panch Batti)Road',
      distance: '0.2 km',
      status: 'clearing',
      eta: 30,
      coordinates: { lat: 19.0544, lng: 72.8406 }
    },
    {
      id: 'TL002',
      intersection: 'statue circle ',
      distance: '0.8 km',
      status: 'green',
      eta: 90,
      coordinates: { lat: 19.0625, lng: 72.8347 }
    },
    {
      id: 'TL003',
      intersection: 'Airport Road',
      distance: '1.3 km',
      status: 'red',
      eta: 150,
      coordinates: { lat: 19.0688, lng: 72.8287 }
    },
    {
      id: 'TL004',
      intersection: ' tonk road', 
      distance: '1.9 km',
      status: 'red',
      eta: 210,
      coordinates: { lat: 19.0751, lng: 72.8227 }
    }
  ]);

  // Auto-update traffic lights
  useEffect(() => {
    if (!systemActive) return;

    const interval = setInterval(() => {
      setTrafficLights(prev => prev.map(light => {
        let newStatus = light.status;
        let newEta = light.eta - 5;

        if (autoMode && newEta <= 10 && light.status === 'red') {
          newStatus = 'clearing';
        } else if (light.status === 'clearing' && newEta <= 0) {
          newStatus = 'cleared';
          newEta = 0;
        }

        return {
          ...light,
          status: newStatus,
          eta: Math.max(0, newEta)
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [autoMode, systemActive]);

  const manualOverride = (lightId: string, action: 'clear' | 'hold') => {
    setTrafficLights(prev => prev.map(light => 
      light.id === lightId 
        ? { 
            ...light, 
            status: action === 'clear' ? 'clearing' : 'red' 
          }
        : light
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-100 text-green-700';
      case 'cleared': return 'bg-green-100 text-green-700';
      case 'clearing': return 'bg-yellow-100 text-yellow-700';
      case 'red': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cleared': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'clearing': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'red': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const clearedCount = trafficLights.filter(light => light.status === 'cleared').length;
  const totalLights = trafficLights.length;
  const clearingProgress = (clearedCount / totalLights) * 100;

  return (
    <div className="min-h-screen p-4 bg-background">
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
            <div className="p-2 bg-orange-600 rounded-lg">
              <TrafficCone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Traffic Control System</h1>
              <p className="text-muted-foreground">Emergency Vehicle Priority Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={systemActive} 
              onCheckedChange={setSystemActive}
            />
            <span className="text-sm">System Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch 
              checked={autoMode} 
              onCheckedChange={setAutoMode}
            />
            <span className="text-sm">Auto Mode</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Status Overview */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{clearedCount}</div>
              <div className="text-sm text-muted-foreground">Lights Cleared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalLights - clearedCount}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-muted-foreground">Avg Speed (mph)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.3</div>
              <div className="text-sm text-muted-foreground">km to Hospital</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Route Clearance Progress</span>
              <span className="text-sm font-medium">{Math.round(clearingProgress)}%</span>
            </div>
            <Progress value={clearingProgress} className="h-2" />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Route Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 lg:h-[500px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                {/* Mock Traffic Control Map */}
                <div className="absolute inset-4 bg-white rounded border-2 border-orange-200">
                  {/* Route Header */}
                  <div className="p-4 border-b bg-orange-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrafficCone className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold text-orange-800">Traffic Control Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {systemActive ? (
                          <Badge className="bg-green-100 text-green-700">
                            <Play className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">
                            <Pause className="h-3 w-3 mr-1" />
                            Paused
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Visualization */}
                  <div className="flex-1 p-4 relative">
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {/* Current Position */}
                      <div className="flex flex-col items-center justify-start">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                          🚑
                        </div>
                        <span className="text-sm font-medium">Ambulance</span>
                        <span className="text-xs text-muted-foreground">Current Position</span>
                      </div>
                      
                      {/* Traffic Lights Status */}
                      <div className="space-y-3">
                        {trafficLights.slice(0, 4).map((light, index) => (
                          <div key={light.id} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              light.status === 'green' || light.status === 'cleared' ? 'bg-green-500' :
                              light.status === 'clearing' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}>
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span className="text-xs">{light.intersection.split(' & ')[0]}</span>
                            <Badge 
                              variant="secondary" 
                              className="text-xs"
                            >
                              {light.distance}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Route Line */}
                    <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-60"></div>
                  </div>
                </div>
                
                {/* System Status */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">
                      {systemActive ? 'System Online' : 'System Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Traffic Light Controls */}
          <div>
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrafficCone className="h-5 w-5" />
                Traffic Light Control
              </h3>
              
              <div className="space-y-4">
                {trafficLights.map((light) => (
                  <div key={light.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(light.status)}
                        <span className="font-medium text-sm">{light.intersection}</span>
                      </div>
                      <Badge className={getStatusColor(light.status)} variant="secondary">
                        {light.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{light.distance}</span>
                      <span>ETA: {light.eta}s</span>
                    </div>
                    
                    {!autoMode && light.status !== 'cleared' && (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs"
                          onClick={() => manualOverride(light.id, 'clear')}
                        >
                          Clear
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs"
                          onClick={() => manualOverride(light.id, 'hold')}
                        >
                          Hold
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* System Controls */}
        <Card className="mt-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Emergency Vehicle Priority System</h3>
              <p className="text-sm text-muted-foreground">
                Automatically manages traffic signals to create clear paths for emergency vehicles
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                System Settings
              </Button>
              <Button variant="outline" size="sm">
                Manual Override
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  setTrafficLights(prev => prev.map(light => ({
                    ...light,
                    status: 'cleared' as const,
                    eta: 0
                  })));
                }}
              >
                Clear All Signals
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Real-time signal control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Route optimization active</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Emergency priority enabled</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}