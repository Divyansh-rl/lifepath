import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, Clock, Star, Brain } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import type { Screen, EmergencyState, Hospital } from '../App';

interface HospitalSelectionProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
  userLocation: { lat: number; lng: number };
  selectHospital: (hospital: Hospital) => void;
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Mahatma Gandhi Hospital',
    distance: '2.3 km',
    eta: '8 minutes',
    specialties: ['Emergency', 'Trauma', 'Cardiology'],
    availability: 'High',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: '2',
    name: 'Bombay Hospital',
    distance: '3.1 km',
    eta: '12 minutes',
    specialties: ['Emergency', 'Pediatrics', 'Neurology'],
    availability: 'Medium',
    coordinates: { lat: 18.9668, lng: 72.8147 }
  },
  {
    id: '3',
    name: 'Government Hospital',
    distance: '4.5 km',
    eta: '15 minutes',
    specialties: ['Emergency', 'Trauma', 'Surgery', 'ICU'],
    availability: 'High',
    coordinates: { lat: 19.0144, lng: 72.8479 }
  },
  {
    id: '4',
    name: 'Apollo Hospital',
    distance: '5.2 km',
    eta: '18 minutes',
    specialties: ['Emergency', 'Cardiology', 'Orthopedics'],
    availability: 'Low',
    coordinates: { lat: 19.0330, lng: 72.8570 }
  }
];

export function HospitalSelection({ navigateToScreen, emergencyState, selectHospital }: HospitalSelectionProps) {
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [summaryFor, setSummaryFor] = useState<string | null>(null);

  const generateSummary = async (hospital: Hospital) => {
    setSummaryFor(hospital.id);
    
    // Mock AI summary generation
    setTimeout(() => {
      const summaries = {
        '1': 'Mahatma Gandhi Hospital is a premier multi-specialty hospital with state-of-the-art emergency and trauma care facilities. Features advanced cardiac care, ICU, and 24/7 specialist coverage with helicopter landing facility. Average wait time: 15 minutes. Currently has high capacity with 3 trauma bays available.',
        '2': 'Bombay Hospital is one of Mumbai\'s leading healthcare institutions specializing in comprehensive medical care. Well-equipped emergency department with dedicated pediatric and neurology wings, CT/MRI available round the clock. Currently operating at 70% capacity. Best choice for pediatric or neurological emergencies.',
        '3': 'Government Hospital is a major public healthcare facility providing quality emergency and trauma care services. Features comprehensive surgical facilities, dedicated trauma team, and serves as a teaching hospital with experienced medical staff. Multiple ICU beds available. Optimal for critical trauma cases.',
        '4': 'Apollo Hospital offers world-class emergency services with strong cardiology and orthopedic departments. Advanced medical technology and experienced specialists available 24/7. Currently experiencing moderate patient volume with excellent specialist care available.'
      };
      
      setSelectedSummary(summaries[hospital.id] || 'Summary not available');
      setSummaryFor(null);
    }, 1500);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigateToScreen('dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hospital Selection</h1>
          <p className="text-muted-foreground">Choose the best hospital for this emergency</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Emergency Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Active Emergency:</strong> Golden Hour countdown active. Select hospital immediately.
          </AlertDescription>
        </Alert>

        {/* AI Summary Display */}
        {selectedSummary && (
          <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">AI Hospital Summary</h3>
                <p className="text-blue-800 leading-relaxed">{selectedSummary}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Hospital List */}
        <div className="space-y-4">
          {mockHospitals.map((hospital) => (
            <Card key={hospital.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{hospital.name}</h3>
                    <Badge className={getAvailabilityColor(hospital.availability)}>
                      {hospital.availability} Availability
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {hospital.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ETA: {hospital.eta}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Level 1 Trauma
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    onClick={() => selectHospital(hospital)}
                    className="min-w-[100px]"
                  >
                    Select
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateSummary(hospital)}
                    disabled={summaryFor === hospital.id}
                    className="min-w-[100px]"
                  >
                    {summaryFor === hospital.id ? (
                      <>
                        <Brain className="h-4 w-4 mr-1 animate-spin" />
                        AI Working...
                      </>
                    ) : (
                      'Get Summary'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="mt-6 p-4 bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Available Hospitals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">8 min</div>
              <div className="text-sm text-muted-foreground">Fastest ETA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-muted-foreground">Trauma Centers</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}