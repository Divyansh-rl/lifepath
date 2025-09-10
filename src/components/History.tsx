import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Clock, 
  MapPin, 
  Building2, 
  User, 
  Search,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Screen } from '../App';

interface HistoryProps {
  navigateToScreen: (screen: Screen) => void;
}

const mockHistoryData = [
  {
    id: 'EMR-001',
    date: '2024-01-15',
    time: '14:23',
    duration: '18 min',
    hospital: 'SMS Hospital Jaipur',
    patientAge: '45',
    severity: 'Critical' as const,
    status: 'Completed' as const,
    distance: '2.3 km',
    timeSaved: '4 min'
  },
  {
    id: 'EMR-002',
    date: '2024-01-12',
    time: '09:15',
    duration: '25 min',
    hospital: 'Fortis Escorts Hospital',
    patientAge: '28',
    severity: 'Urgent' as const,
    status: 'Completed' as const,
    distance: '3.8 km',
    timeSaved: '6 min'
  },
  {
    id: 'EMR-003',
    date: '2024-01-10',
    time: '22:45',
    duration: '31 min',
    hospital: 'Jaipur Golden Hospital',
    patientAge: '67',
    severity: 'Stable' as const,
    status: 'Completed' as const,
    distance: '5.1 km',
    timeSaved: '2 min'
  },
  {
    id: 'EMR-004',
    date: '2024-01-08',
    time: '16:30',
    duration: '22 min',
    hospital: 'Fortis Escorts Hospital',
    patientAge: '34',
    severity: 'Urgent' as const,
    status: 'Completed' as const,
    distance: '4.2 km',
    timeSaved: '5 min'
  },
  {
    id: 'EMR-005',
    date: '2024-01-05',
    time: '11:20',
    duration: '15 min',
    hospital: 'SMS Hospital Jaipur',
    patientAge: '52',
    severity: 'Critical' as const,
    status: 'Completed' as const,
    distance: '1.9 km',
    timeSaved: '7 min'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'bg-red-100 text-red-700';
    case 'Urgent': return 'bg-yellow-100 text-yellow-700';
    case 'Stable': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function History({ navigateToScreen }: HistoryProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'urgent' | 'stable'>('all');

  const filteredHistory = mockHistoryData.filter(record => {
    const matchesSearch = record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.severity.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalCalls = mockHistoryData.length;
  const avgResponseTime = Math.round(mockHistoryData.reduce((sum, record) => sum + parseInt(record.duration), 0) / totalCalls);
  const totalTimeSaved = mockHistoryData.reduce((sum, record) => sum + parseInt(record.timeSaved), 0);

  return (
    <div className="min-h-screen p-4 pb-20 md:pb-4 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t('history.title')}</h1>
        <p className="text-muted-foreground">{t('history.recent_calls')}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{totalCalls}</div>
          <div className="text-sm text-muted-foreground">Total Calls</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{avgResponseTime}</div>
          <div className="text-sm text-muted-foreground">Avg Response (min)</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{totalTimeSaved}</div>
          <div className="text-sm text-muted-foreground">Time Saved (min)</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by hospital name or emergency ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'critical', 'urgent', 'stable'] as const).map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((record) => (
          <Card key={record.id} className="p-4 hover:shadow-md transition-all duration-300 hover-lift animate-slide-in">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">{record.id}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {record.date} at {record.time}
                  </div>
                </div>
              </div>
              <Badge className={getSeverityColor(record.severity)}>
                {record.severity}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{record.hospital}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Patient: {record.patientAge} years old</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{record.distance} distance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{record.duration} total time</span>
                </div>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {record.status}
                </Badge>
                <span className="text-muted-foreground">
                  Time saved: <span className="font-medium text-green-600">{record.timeSaved}</span>
                </span>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="p-8 text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-semibold mb-2">No records found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery || selectedFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Your emergency history will appear here'
            }
          </p>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="mt-6 p-4">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-col md:flex-row gap-2">
          <Button variant="outline" size="sm" className="justify-start">
            Export History Report
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            Performance Analytics
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            Share Statistics
          </Button>
        </div>
      </Card>
    </div>
  );
}