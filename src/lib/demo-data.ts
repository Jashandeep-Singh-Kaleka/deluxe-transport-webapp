export interface Truck {
  id: string;
  plateNumber: string;
  model: string;
  year: number;
  driver: string;
  status: 'active' | 'maintenance' | 'idle';
  location: { lat: number; lng: number; city: string };
  mileage: number;
  lastService: string;
}

export interface Trip {
  id: string;
  truckId: string;
  driver: string;
  origin: string;
  destination: string;
  distance: number;
  revenue: number;
  fuelCost: number;
  status: 'completed' | 'in-progress' | 'scheduled';
  date: string;
}

export interface MaintenanceRecord {
  id: string;
  truckId: string;
  type: string;
  description: string;
  cost: number;
  date: string;
  mechanic: string;
  status: 'completed' | 'pending' | 'in-progress';
}

export const trucks: Truck[] = [
  {
    id: '1',
    plateNumber: 'DT-001',
    model: 'Freightliner Cascadia',
    year: 2022,
    driver: 'Tom Wilson',
    status: 'active',
    location: { lat: 34.0522, lng: -118.2437, city: 'Los Angeles, CA' },
    mileage: 125000,
    lastService: '2024-01-15'
  },
  {
    id: '2',
    plateNumber: 'DT-002',
    model: 'Peterbilt 579',
    year: 2021,
    driver: 'Maria Garcia',
    status: 'active',
    location: { lat: 39.7392, lng: -104.9903, city: 'Denver, CO' },
    mileage: 98000,
    lastService: '2024-01-10'
  },
  {
    id: '3',
    plateNumber: 'DT-003',
    model: 'Kenworth T680',
    year: 2023,
    driver: 'James Brown',
    status: 'maintenance',
    location: { lat: 32.7767, lng: -96.7970, city: 'Dallas, TX' },
    mileage: 75000,
    lastService: '2024-01-20'
  }
];

export const trips: Trip[] = [
  {
    id: '1',
    truckId: '1',
    driver: 'Tom Wilson',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    distance: 372,
    revenue: 2800,
    fuelCost: 450,
    status: 'completed',
    date: '2024-01-22'
  },
  {
    id: '2',
    truckId: '2',
    driver: 'Maria Garcia',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    distance: 525,
    revenue: 3200,
    fuelCost: 580,
    status: 'in-progress',
    date: '2024-01-23'
  }
];

export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    truckId: '1',
    type: 'Oil Change',
    description: 'Regular oil change and filter replacement',
    cost: 250,
    date: '2024-01-15',
    mechanic: 'Bob Smith',
    status: 'completed'
  },
  {
    id: '2',
    truckId: '3',
    type: 'Brake Service',
    description: 'Brake pad replacement and system check',
    cost: 850,
    date: '2024-01-20',
    mechanic: 'Alice Johnson',
    status: 'in-progress'
  }
];

export const monthlyMetrics = {
  totalRevenue: 185000,
  totalMiles: 45000,
  fuelCosts: 28000,
  maintenanceCosts: 12000,
  activeTrips: 15,
  completedTrips: 89,
  averageRevenuePerMile: 4.11
};