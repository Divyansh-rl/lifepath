import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ActivityReport {
  id: string;
  timestamp: Date;
  type: 'error' | 'feedback' | 'bug' | 'performance';
  title: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface UpdateLog {
  id: string;
  version: string;
  date: Date;
  title: string;
  description: string;
  type: 'feature' | 'bugfix' | 'improvement';
  icon?: string;
}

interface ActivityContextType {
  reports: ActivityReport[];
  updateLogs: UpdateLog[];
  addReport: (report: Omit<ActivityReport, 'id' | 'timestamp'>) => void;
  hasUnreadUpdates: boolean;
  markUpdateAsRead: (id: string) => void;
  markAllUpdatesAsRead: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

interface ActivityProviderProps {
  children: ReactNode;
}

// Mock update logs data
const mockUpdateLogs: UpdateLog[] = [
  {
    id: '1',
    version: '2.1.0',
    date: new Date(2024, 0, 15),
    title: 'Enhanced Traffic Police Panel',
    description: 'Redesigned traffic control interface with real-time monitoring and improved emergency coordination.',
    type: 'feature',
    icon: '🚔'
  },
  {
    id: '2', 
    version: '2.0.5',
    date: new Date(2024, 0, 10),
    title: 'Voice Command Integration',
    description: 'Added comprehensive voice control system for hands-free emergency management and navigation.',
    type: 'feature',
    icon: '🎤'
  },
  {
    id: '3',
    version: '2.0.4',
    date: new Date(2024, 0, 8),
    title: 'SOS Button Enhancement',
    description: 'Improved emergency SOS functionality with 112/108 integration and multi-service coordination.',
    type: 'improvement',
    icon: '🚨'
  },
  {
    id: '4',
    version: '2.0.3',
    date: new Date(2024, 0, 5),
    title: 'Performance Optimizations',
    description: 'Reduced app loading time by 40% and improved real-time data synchronization.',
    type: 'improvement',
    icon: '⚡'
  },
  {
    id: '5',
    version: '2.0.0',
    date: new Date(2024, 0, 1),
    title: 'Multi-language Support',
    description: 'Added support for Hindi, Gujarati, Marathi, and Tamil languages.',
    type: 'feature',
    icon: '🌐'
  }
];

export function ActivityProvider({ children }: ActivityProviderProps) {
  const [reports, setReports] = useState<ActivityReport[]>([]);
  const [updateLogs] = useState<UpdateLog[]>(mockUpdateLogs);
  const [readUpdates, setReadUpdates] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lifepath-read-updates');
        return new Set(JSON.parse(stored || '[]'));
      } catch {
        return new Set();
      }
    }
    return new Set();
  });

  // Error boundary effect - catches unhandled errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const report: ActivityReport = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: 'error',
        title: 'JavaScript Error',
        description: event.message,
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        }
      };
      setReports(prev => [report, ...prev].slice(0, 50)); // Keep last 50 reports
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const report: ActivityReport = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: 'error',
        title: 'Unhandled Promise Rejection',
        description: String(event.reason),
        metadata: {
          reason: event.reason
        }
      };
      setReports(prev => [report, ...prev].slice(0, 50));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Save read updates to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lifepath-read-updates', JSON.stringify([...readUpdates]));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [readUpdates]);

  const addReport = (report: Omit<ActivityReport, 'id' | 'timestamp'>) => {
    const fullReport: ActivityReport = {
      ...report,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setReports(prev => [fullReport, ...prev].slice(0, 50));
  };

  const hasUnreadUpdates = updateLogs.some(update => !readUpdates.has(update.id));

  const markUpdateAsRead = (id: string) => {
    setReadUpdates(prev => new Set([...prev, id]));
  };

  const markAllUpdatesAsRead = () => {
    setReadUpdates(new Set(updateLogs.map(update => update.id)));
  };

  const contextValue: ActivityContextType = {
    reports,
    updateLogs,
    addReport,
    hasUnreadUpdates,
    markUpdateAsRead,
    markAllUpdatesAsRead
  };

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  );
}