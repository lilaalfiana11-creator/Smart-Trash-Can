export type PlanType = 'starter' | 'professional' | 'enterprise';

export interface UserProfile {
  email: string;
  name: string;
  organization: string;
  plan: PlanType;
  billingStatus: 'Active' | 'Past Due' | 'Trialing';
  joinedDate: string;
  isVerified: boolean;
  canManageLocations: boolean;
}

export interface SmartBin {
  id: string;
  name: string;
  location: string;
  fillLevel: number; // 0 to 100
  status: 'normal' | 'warning' | 'critical';
  battery: number; // percentage
  lastCollected: string;
  type: 'general' | 'recycle' | 'organic' | 'hazardous';
  sensorState: 'online' | 'offline' | 'maintenance';
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  plan: PlanType;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Billing' | 'Sensor Issue' | 'Dashboard Access' | 'API Key';
  status: 'open' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'alert';
}
