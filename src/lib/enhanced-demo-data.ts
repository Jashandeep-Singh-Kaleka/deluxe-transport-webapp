export interface EnhancedTruck {
  id: string;
  plateNumber: string;
  unit: string;
  model: string;
  year: number;
  vin: string;
  driver: {
    id: string;
    name: string;
    cdlClass: string;
    experienceYears: number;
    phone: string;
    status: 'active' | 'break' | 'off-duty';
  };
  status: 'active' | 'maintenance' | 'idle' | 'loading' | 'unloading';
  location: { 
    lat: number; 
    lng: number; 
    city: string; 
    state: string;
    address: string;
  };
  mileage: number;
  lastService: string;
  nextServiceDue: number;
  fuelLevel: number;
  speed: number;
  engineHours: number;
  trailer: {
    id: string;
    type: 'dry van' | 'refrigerated' | 'flatbed';
    capacity: number;
    currentLoad: number;
  };
  currentTrip?: string;
  efficiency: {
    mpg: number;
    fuelCostPerMile: number;
    utilizationRate: number;
  };
}

export interface EnhancedTrip {
  id: string;
  tripNumber: string;
  truckId: string;
  driver: string;
  origin: {
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  customer: {
    name: string;
    type: 'retail' | 'manufacturing' | 'distribution' | 'ecommerce';
    priority: 'standard' | 'expedited' | 'urgent';
  };
  cargo: {
    type: string;
    weight: number;
    value: number;
    hazmat: boolean;
    temperature?: number;
  };
  distance: number;
  revenue: number;
  costs: {
    fuel: number;
    tolls: number;
    driver: number;
    maintenance: number;
  };
  status: 'completed' | 'in-progress' | 'scheduled' | 'delayed' | 'cancelled';
  scheduledStart: string;
  actualStart?: string;
  scheduledEnd: string;
  actualEnd?: string;
  route: { lat: number; lng: number; timestamp: string }[];
}

export interface DetailedMaintenanceRecord {
  id: string;
  truckId: string;
  workOrder: string;
  type: 'preventive' | 'repair' | 'inspection' | 'emergency';
  category: 'engine' | 'transmission' | 'brakes' | 'tires' | 'electrical' | 'body' | 'other';
  description: string;
  parts: {
    name: string;
    partNumber: string;
    quantity: number;
    cost: number;
  }[];
  labor: {
    hours: number;
    rate: number;
    cost: number;
  };
  totalCost: number;
  scheduledDate: string;
  completedDate?: string;
  mechanic: {
    name: string;
    certification: string;
    shopLocation: string;
  };
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  mileageAtService: number;
  warranty: {
    parts: number;
    labor: number;
  };
}

// Generate 100 trucks with realistic data distribution
export const enhancedTrucks: EnhancedTruck[] = Array.from({ length: 100 }, (_, index) => {
  const truckNumber = String(index + 1).padStart(3, '0');
  const models = ['Freightliner Cascadia', 'Peterbilt 579', 'Kenworth T680', 'Volvo VNL', 'Mack Anthem'];
  const cities = [
    { name: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
    { name: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
    { name: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970 },
    { name: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
    { name: 'Atlanta', state: 'GA', lat: 33.7490, lng: -84.3880 },
    { name: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.0740 },
    { name: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
    { name: 'Memphis', state: 'TN', lat: 35.1495, lng: -90.0490 },
    { name: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
    { name: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 }
  ];
  
  // 85% active, 8% maintenance, 4% loading, 3% idle
  let status: EnhancedTruck['status'];
  if (index < 85) status = 'active';
  else if (index < 93) status = 'maintenance';
  else if (index < 97) status = 'loading';
  else status = 'idle';
  
  const model = models[index % models.length];
  const location = cities[index % cities.length];
  const year = 2020 + (index % 5);
  
  return {
    id: String(index + 1),
    plateNumber: `DLX-${truckNumber}`,
    unit: `T${truckNumber}`,
    model,
    year,
    vin: `1FUJGHDV5NLBC${String(1234 + index).padStart(4, '0')}`,
    driver: {
      id: `D${truckNumber}`,
      name: index === 0 ? 'Happy Saini' : `Driver ${truckNumber}`,
      cdlClass: 'A',
      experienceYears: 3 + (index % 20),
      phone: `555-${String(100 + index).padStart(4, '0')}`,
      status: status === 'active' ? 'active' : status === 'maintenance' ? 'off-duty' : 'active'
    },
    status,
    location: {
      lat: location.lat + (Math.random() - 0.5) * 0.1,
      lng: location.lng + (Math.random() - 0.5) * 0.1,
      city: location.name,
      state: location.state,
      address: `${1000 + index} Main St, ${location.name}, ${location.state}`
    },
    mileage: 50000 + (index * 2000) + Math.floor(Math.random() * 10000),
    lastService: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    nextServiceDue: 50000 + (index * 2000) + 10000 + Math.floor(Math.random() * 5000),
    fuelLevel: Math.floor(Math.random() * 60) + 40,
    speed: status === 'active' ? Math.floor(Math.random() * 70) + 55 : 0,
    engineHours: 2000 + (index * 50) + Math.floor(Math.random() * 1000),
    trailer: {
      id: `TR${truckNumber}`,
      type: index % 3 === 0 ? 'refrigerated' : index % 3 === 1 ? 'flatbed' : 'dry van',
      capacity: 45000 + Math.floor(Math.random() * 5000),
      currentLoad: status === 'active' ? Math.floor(Math.random() * 40000) + 10000 : 0
    },
    currentTrip: status === 'active' ? `T2024${String(index + 1).padStart(3, '0')}` : undefined,
    efficiency: {
      mpg: 6.5 + Math.random() * 1.5,
      fuelCostPerMile: 0.45 + Math.random() * 0.15,
      utilizationRate: 0.75 + Math.random() * 0.2
    }
  };
});

export const enhancedTrips: EnhancedTrip[] = [
  {
    id: 'T2024001',
    tripNumber: 'TRP-240001',
    truckId: '1',
    driver: 'Happy Saini',
    origin: {
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90015',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    destination: {
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      coordinates: { lat: 33.4484, lng: -112.0740 }
    },
    customer: {
      name: 'Amazon Fulfillment',
      type: 'ecommerce',
      priority: 'expedited'
    },
    cargo: {
      type: 'Consumer Electronics',
      weight: 32000,
      value: 450000,
      hazmat: false
    },
    distance: 372,
    revenue: 2800,
    costs: {
      fuel: 450,
      tolls: 0,
      driver: 285,
      maintenance: 45
    },
    status: 'in-progress',
    scheduledStart: '2024-01-22T06:00:00Z',
    actualStart: '2024-01-22T06:15:00Z',
    scheduledEnd: '2024-01-22T18:00:00Z',
    route: [
      { lat: 34.0522, lng: -118.2437, timestamp: '2024-01-22T06:15:00Z' },
      { lat: 34.1478, lng: -117.8265, timestamp: '2024-01-22T07:30:00Z' },
      { lat: 33.9425, lng: -117.2297, timestamp: '2024-01-22T09:15:00Z' }
    ]
  },
  {
    id: 'T2024002',
    tripNumber: 'TRP-240002',
    truckId: '2',
    driver: 'Maria Garcia',
    origin: {
      city: 'Denver',
      state: 'CO',
      zipCode: '80249',
      coordinates: { lat: 39.7392, lng: -104.9903 }
    },
    destination: {
      city: 'Salt Lake City',
      state: 'UT',
      zipCode: '84101',
      coordinates: { lat: 40.7608, lng: -111.8910 }
    },
    customer: {
      name: 'Walmart Distribution',
      type: 'retail',
      priority: 'standard'
    },
    cargo: {
      type: 'Frozen Foods',
      weight: 42000,
      value: 85000,
      hazmat: false,
      temperature: -10
    },
    distance: 525,
    revenue: 3200,
    costs: {
      fuel: 580,
      tolls: 15,
      driver: 402,
      maintenance: 58
    },
    status: 'scheduled',
    scheduledStart: '2024-01-23T04:00:00Z',
    scheduledEnd: '2024-01-23T20:00:00Z',
    route: []
  }
];

export const detailedMaintenanceRecords: DetailedMaintenanceRecord[] = [
  {
    id: 'MR001',
    truckId: '1',
    workOrder: 'WO-240015',
    type: 'preventive',
    category: 'engine',
    description: 'Scheduled oil change and engine inspection',
    parts: [
      { name: 'Engine Oil Filter', partNumber: 'OF-12345', quantity: 1, cost: 45 },
      { name: 'Engine Oil (15W-40)', partNumber: 'OIL-15W40', quantity: 12, cost: 180 }
    ],
    labor: {
      hours: 2.5,
      rate: 85,
      cost: 212.50
    },
    totalCost: 437.50,
    scheduledDate: '2024-01-15',
    completedDate: '2024-01-15',
    mechanic: {
      name: 'Bob Smith',
      certification: 'ASE Master Truck Technician',
      shopLocation: 'Los Angeles Service Center'
    },
    status: 'completed',
    priority: 'medium',
    mileageAtService: 124850,
    warranty: {
      parts: 12,
      labor: 6
    }
  },
  {
    id: 'MR002',
    truckId: '3',
    workOrder: 'WO-240025',
    type: 'repair',
    category: 'brakes',
    description: 'Brake pad replacement and rotor resurfacing',
    parts: [
      { name: 'Front Brake Pads', partNumber: 'BP-F680', quantity: 2, cost: 280 },
      { name: 'Rear Brake Pads', partNumber: 'BP-R680', quantity: 2, cost: 320 },
      { name: 'Brake Fluid', partNumber: 'BF-DOT3', quantity: 2, cost: 25 }
    ],
    labor: {
      hours: 6.0,
      rate: 85,
      cost: 510
    },
    totalCost: 1135,
    scheduledDate: '2024-01-20',
    mechanic: {
      name: 'Alice Johnson',
      certification: 'ASE Brake Specialist',
      shopLocation: 'Dallas Service Center'
    },
    status: 'in-progress',
    priority: 'high',
    mileageAtService: 74950,
    warranty: {
      parts: 24,
      labor: 12
    }
  }
];

export const enhancedMetrics = {
  daily: {
    totalRevenue: 85000,
    totalMiles: 21000,
    fuelCosts: 12000,
    maintenanceCosts: 4500,
    activeTrips: 85,
    completedTrips: 45,
    averageRevenuePerMile: 4.05,
    onTimeDelivery: 0.95,
    fuelEfficiency: 7.1,
    driverUtilization: 0.87
  },
  monthly: {
    totalRevenue: 2550000,
    totalMiles: 630000,
    fuelCosts: 360000,
    maintenanceCosts: 135000,
    activeTrips: 85,
    completedTrips: 1350,
    averageRevenuePerMile: 4.05,
    onTimeDelivery: 0.92,
    fuelEfficiency: 7.0,
    driverUtilization: 0.85
  },
  yearly: {
    totalRevenue: 30600000,
    totalMiles: 7560000,
    fuelCosts: 4320000,
    maintenanceCosts: 1620000,
    activeTrips: 85,
    completedTrips: 16200,
    averageRevenuePerMile: 4.05,
    onTimeDelivery: 0.91,
    fuelEfficiency: 6.9,
    driverUtilization: 0.83
  },
  week: {
    totalRevenue: 595000,
    totalMiles: 147000,
    fuelCosts: 84000,
    maintenanceCosts: 31500,
    activeTrips: 85,
    completedTrips: 315,
    averageRevenuePerMile: 4.05,
    onTimeDelivery: 0.93,
    fuelEfficiency: 7.0,
    driverUtilization: 0.86
  },
  quarter: {
    totalRevenue: 7650000,
    totalMiles: 1890000,
    fuelCosts: 1080000,
    maintenanceCosts: 405000,
    activeTrips: 85,
    completedTrips: 4050,
    averageRevenuePerMile: 4.05,
    onTimeDelivery: 0.92,
    fuelEfficiency: 6.95,
    driverUtilization: 0.84
  }
};

export const companyInfo = {
  name: 'Deluxe Transport LLC',
  tagline: 'Transportation and Logistics Specialist',
  established: 1995,
  headquarters: 'Dallas, Texas',
  dotNumber: '123456',
  mcNumber: 'MC-654321',
  fleetSize: 100,
  employees: 150,
  serviceArea: 'Continental United States',
  specializations: [
    'Dry Van Transportation',
    'Refrigerated Freight',
    'Expedited Services',
    'Supply Chain Management',
    'Warehousing Solutions'
  ],
  certifications: [
    'DOT Compliant',
    'FMCSA Registered',
    'SmartWay Partner',
    'C-TPAT Certified'
  ],
  mission: 'To provide reliable, safe, and efficient transportation solutions that exceed customer expectations while maintaining the highest standards of professionalism and integrity.',
  values: [
    'Safety First',
    'Customer Focus',
    'Operational Excellence',
    'Environmental Responsibility',
    'Team Collaboration'
  ]
};