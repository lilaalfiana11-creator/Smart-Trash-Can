import { SmartBin, SupportTicket, AppNotification } from './types';

export const INITIAL_BINS: SmartBin[] = [
  {
    id: 'BIN-101',
    name: 'General Desk Bin A',
    location: 'Office Block Penthouse - Room 402',
    fillLevel: 45,
    status: 'normal',
    battery: 88,
    lastCollected: 'Yesterday, 14:30',
    type: 'general',
    sensorState: 'online'
  },
  {
    id: 'BIN-102',
    name: 'Plastics & Paper Recycle',
    location: 'Office Block Floor 3 - Cafeteria',
    fillLevel: 92,
    status: 'critical',
    battery: 95,
    lastCollected: 'Today, 08:15',
    type: 'recycle',
    sensorState: 'online'
  },
  {
    id: 'BIN-103',
    name: 'Organic Meal Bin',
    location: 'Hospital Wing G - Corridor Area',
    fillLevel: 15,
    status: 'normal',
    battery: 42,
    lastCollected: 'Today, 11:45',
    type: 'organic',
    sensorState: 'online'
  },
  {
    id: 'BIN-104',
    name: 'Bio-Haz Safety Can',
    location: 'Hospital Wing B - Specialized Lab',
    fillLevel: 78,
    status: 'warning',
    battery: 100,
    lastCollected: 'Yesterday, 17:00',
    type: 'hazardous',
    sensorState: 'online'
  },
  {
    id: 'BIN-105',
    name: 'Eco-Recycle Bin',
    location: 'University Library - Lobby Entry',
    fillLevel: 55,
    status: 'normal',
    battery: 14,
    lastCollected: '2 days ago',
    type: 'recycle',
    sensorState: 'maintenance'
  },
  {
    id: 'BIN-106',
    name: 'Mall General Waste Center',
    location: 'Shopping Center - Food Court East',
    fillLevel: 99,
    status: 'critical',
    battery: 81,
    lastCollected: 'Today, 06:00',
    type: 'general',
    sensorState: 'online'
  },
  {
    id: 'BIN-107',
    name: 'Eco-Living Smart Bin',
    location: 'Residential Area - Green Alley C',
    fillLevel: 28,
    status: 'normal',
    battery: 94,
    lastCollected: 'Yesterday, 10:15',
    type: 'general',
    sensorState: 'online'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-201',
    subject: 'Sensor recalibration issue on hospital hazardous bin',
    category: 'Sensor Issue',
    status: 'open',
    priority: 'high',
    createdAt: 'May 28, 2026'
  },
  {
    id: 'TCK-202',
    subject: 'Inquiry regarding Enterprise plan bulk rates',
    category: 'Billing',
    status: 'open',
    priority: 'medium',
    createdAt: 'May 29, 2026'
  },
  {
    id: 'TCK-203',
    subject: 'Smart City API webhook setup failure',
    category: 'API Key',
    status: 'resolved',
    priority: 'high',
    createdAt: 'May 25, 2026'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NTF-001',
    title: 'Critical Alert: BIN-106 is Full',
    message: 'Food Court East trash bin is at 99% capacity and needs immediate extraction.',
    timestamp: '10 mins ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'NTF-002',
    title: 'Warning Alert: BIN-102 High Level',
    message: 'Cafeteria Recycling Bin is reaching limits (92%). Add to next collection path.',
    timestamp: '1 hour ago',
    read: false,
    type: 'warning'
  },
  {
    id: 'NTF-003',
    title: 'System Patch v2.4 Active',
    message: 'Touchless proximity sensor responsiveness upgrade complete. Battery consumption reduced 4%.',
    timestamp: 'Yesterday',
    read: true,
    type: 'info'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Ir. Budi Santoso',
    role: 'Director of Smart City Initiatives',
    org: 'Jakarta Municipal Government',
    quote: 'Smart Trash Can changed how we manage waste logistics. By tracking fill rates in real-time, our city sanitation vehicles cut fuel consumption by 32% and resolved odor complaints entirely.',
    avatarColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 't-2',
    name: 'Dr. Clara Wijaya',
    role: 'Sanitation & Safety Executive',
    org: 'Medika General Hospital',
    quote: 'For bio-hazard bins, timing is everything. Smart Trash Can alerts our rapid response staff immediately before items overflow, ensuring a 100% sterile environment.',
    avatarColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 't-3',
    name: 'Prof. Thomas Hardi',
    role: 'Head of Campus Green Operations',
    org: 'Nusantara State University',
    quote: 'We connected 150 bins across our high-traffic campus libraries and departments. Students appreciate the hygiene of touchless lids, and managers love the detailed cloud logs.',
    avatarColor: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 't-4',
    name: 'Amelia Kartika',
    role: 'Property & Facilities Manager',
    org: 'Grand Horizon Premium Malls',
    quote: 'With hundreds of thousands of daily dynamic shoppers, trash cans fill up in minutes. The smart dashboards and real-time alerts let us clear bins before customers ever notice garbage.',
    avatarColor: 'bg-purple-100 text-purple-800'
  }
];
