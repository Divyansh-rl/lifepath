import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  User, 
  Heart, 
  Thermometer, 
  Activity, 
  Brain,
  Clock,
  AlertTriangle,
  FileText
} from 'lucide-react';
import type { Screen, EmergencyState, Patient } from '../App';

interface AmbulanceDetailsProps {
  navigateToScreen: (screen: Screen) => void;
  emergencyState: EmergencyState;
  updatePatient: (patient: Patient) => void;
}

export function AmbulanceDetails({ navigateToScreen, emergencyState, updatePatient }: AmbulanceDetailsProps) {
  const [patientForm, setPatientForm] = useState<Patient>({
    name: emergencyState.patient?.name || '',
    age: emergencyState.patient?.age || '',
    gender: emergencyState.patient?.gender || '',
    severity: emergencyState.patient?.severity || 'Urgent',
    vitals: {
      bloodPressure: emergencyState.patient?.vitals.bloodPressure || '',
      heartRate: emergencyState.patient?.vitals.heartRate || '',
      temperature: emergencyState.patient?.vitals.temperature || '',
      oxygenSaturation: emergencyState.patient?.vitals.oxygenSaturation || '',
    },
    symptoms: emergencyState.patient?.symptoms || '',
    summary: emergencyState.patient?.summary || '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setPatientForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVitalChange = (vital: string, value: string) => {
    setPatientForm(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [vital]: value,
      },
    }));
  };

  const generatePatientSummary = async () => {
    setIsGenerating(true);
    
    // Mock AI summary generation
    setTimeout(() => {
      const summary = `Patient Summary: ${patientForm.age}-year-old ${patientForm.gender.toLowerCase()} presenting with ${patientForm.symptoms.toLowerCase()}. 

Vital Signs: BP ${patientForm.vitals.bloodPressure || 'N/A'}, HR ${patientForm.vitals.heartRate || 'N/A'} bpm, Temp ${patientForm.vitals.temperature || 'N/A'}°F, O2 Sat ${patientForm.vitals.oxygenSaturation || 'N/A'}%.

Clinical Assessment: Based on the presented symptoms and vital signs, this appears to be a ${patientForm.severity.toLowerCase()} case requiring immediate attention. Recommend preparation of trauma bay and alert of appropriate specialists.

Recommended Actions: 
- Primary assessment upon arrival
- Continuous cardiac monitoring
- IV access and blood work
- Pain management as indicated
- ${patientForm.severity === 'Critical' ? 'Trauma team activation' : 'Standard emergency protocols'}

ETA: Approximately 8 minutes. Patient stable for transport.`;

      const updatedPatient = {
        ...patientForm,
        summary,
      };
      
      setPatientForm(updatedPatient);
      updatePatient(updatedPatient);
      setIsGenerating(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'Urgent': return 'bg-yellow-100 text-yellow-700';
      case 'Stable': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen p-4 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateToScreen('hospital-dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ambulance Details</h1>
            <p className="text-muted-foreground">Unit 17 - ETA: 8 minutes</p>
          </div>
        </div>
        
        <Badge className={getSeverityColor(patientForm.severity)}>
          {patientForm.severity} Priority
        </Badge>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Patient Information Form */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Patient Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter patient name"
                    value={patientForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    placeholder="Age"
                    value={patientForm.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={patientForm.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select value={patientForm.severity} onValueChange={(value) => handleInputChange('severity', value as 'Critical' | 'Urgent' | 'Stable')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Stable">Stable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Vital Signs
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bp" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    Blood Pressure
                  </Label>
                  <Input
                    id="bp"
                    placeholder="120/80"
                    value={patientForm.vitals.bloodPressure}
                    onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hr">Heart Rate (bpm)</Label>
                  <Input
                    id="hr"
                    placeholder="72"
                    value={patientForm.vitals.heartRate}
                    onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="temp" className="flex items-center gap-1">
                    <Thermometer className="h-4 w-4" />
                    Temperature (°F)
                  </Label>
                  <Input
                    id="temp"
                    placeholder="98.6"
                    value={patientForm.vitals.temperature}
                    onChange={(e) => handleVitalChange('temperature', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="o2">Oxygen Saturation (%)</Label>
                  <Input
                    id="o2"
                    placeholder="98"
                    value={patientForm.vitals.oxygenSaturation}
                    onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="symptoms">Symptoms & Observations</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe symptoms, injuries, and observations..."
                  value={patientForm.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* AI Summary and Actions */}
          <div className="space-y-6">
            {/* Generate Summary */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  AI Patient Summary
                </h3>
                <Button 
                  onClick={generatePatientSummary}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Brain className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Patient Summary'
                  )}
                </Button>
              </div>
              
              {patientForm.summary ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="font-medium text-blue-900">Generated Summary</span>
                  </div>
                  <div className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
                    {patientForm.summary}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Generate an AI summary to provide doctors and nurses with a comprehensive patient overview</p>
                </div>
              )}
            </Card>

            {/* Emergency Timeline */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Emergency Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium">Emergency Started</div>
                    <div className="text-sm text-muted-foreground">
                      {emergencyState.startTime?.toLocaleTimeString() || 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium">Hospital Selected</div>
                    <div className="text-sm text-muted-foreground">
                      {emergencyState.selectedHospital?.name}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="font-medium">En Route</div>
                    <div className="text-sm text-muted-foreground">ETA: 8 minutes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium">Hospital Arrival</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Alert Panel */}
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Preparation Checklist</h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Trauma bay prepared and staffed</li>
                    <li>• Blood bank notified for type & cross</li>
                    <li>• Imaging department on standby</li>
                    <li>• Pharmacy alerted for emergency meds</li>
                    <li>• Specialists contacted if needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}