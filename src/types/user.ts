export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ambulance' | 'hospital' | 'traffic-police';
  employeeId?: string;
  phone?: string;
  unit?: string;
  station?: string;
  certification?: string;
  yearsOfService?: number;
  createdAt: Date;
}

export type UserRole = 'ambulance' | 'hospital' | 'traffic-police';