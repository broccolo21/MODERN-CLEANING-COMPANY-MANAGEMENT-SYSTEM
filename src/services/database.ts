import { 
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
  orderBy,
  limit,
  addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Users Collection
export interface UserData {
  id: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  name: string;
  phone?: string;
  createdAt: Date;
  lastLogin: Date;
  status: 'active' | 'inactive';
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      schedule: boolean;
    };
    theme: 'light' | 'dark';
  };
}

// Employees Collection
export interface EmployeeData {
  id: string;
  userId: string;
  role: 'team_leader' | 'operator';
  teamId?: string;
  schedule: {
    workDays: string[];
    shifts: {
      start: string;
      end: string;
    };
  };
  skills: string[];
  certifications: {
    name: string;
    issuedDate: Date;
    expiryDate: Date;
  }[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  deviceId?: string;
  status: 'active' | 'inactive' | 'on_leave';
}

// Clients Collection
export interface ClientData {
  id: string;
  userId: string;
  type: 'business' | 'residential';
  companyName?: string;
  vatNumber?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contacts: {
    primary: {
      name: string;
      phone: string;
      email: string;
    };
    secondary?: {
      name: string;
      phone: string;
      email: string;
    };
  };
  contract: {
    id: string;
    startDate: Date;
    endDate?: Date;
    serviceFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    services: string[];
    value: number;
    status: 'active' | 'pending' | 'terminated';
  };
  facilities: {
    id: string;
    name: string;
    type: string;
    size: number;
    floors: number;
    specialInstructions?: string;
  }[];
}

// Services Collection
export interface ServiceData {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  materials: {
    id: string;
    name: string;
    quantity: number;
  }[];
  protocols: string[];
  status: 'active' | 'inactive';
}

// Operations Collection
export interface OperationData {
  id: string;
  clientId: string;
  teamId: string;
  serviceId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  schedule: {
    start: Date;
    end: Date;
  };
  location: {
    facilityId: string;
    areas: string[];
  };
  team: {
    leaderId: string;
    memberIds: string[];
  };
  tracking: {
    checkIn?: Date;
    checkOut?: Date;
    gpsData: {
      latitude: number;
      longitude: number;
      timestamp: Date;
    }[];
  };
  materials: {
    materialId: string;
    quantity: number;
    used: number;
  }[];
  quality: {
    score?: number;
    feedback?: string;
    checklist: {
      item: string;
      completed: boolean;
      notes?: string;
    }[];
  };
  media: {
    photos: string[];
    videos: string[];
  };
  notes: string[];
}

// Teams Collection
export interface TeamData {
  id: string;
  name: string;
  leaderId: string;
  memberIds: string[];
  schedule: {
    workDays: string[];
    shifts: {
      start: string;
      end: string;
    };
  };
  vehicles: {
    id: string;
    type: string;
    plate: string;
  }[];
  equipment: {
    id: string;
    name: string;
    quantity: number;
  }[];
  status: 'active' | 'inactive';
}

// Inventory Collection
export interface InventoryData {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  minimumQuantity: number;
  supplier: {
    id: string;
    name: string;
    contact: string;
  };
  location: string;
  price: number;
  lastRestocked: Date;
  transactions: {
    date: Date;
    type: 'in' | 'out';
    quantity: number;
    operationId?: string;
  }[];
}

// Reports Collection
export interface ReportData {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: {
    operations: {
      total: number;
      completed: number;
      cancelled: number;
      efficiency: number;
    };
    teams: {
      teamId: string;
      performance: number;
      operations: number;
    }[];
    clients: {
      total: number;
      active: number;
      new: number;
    };
    revenue: {
      total: number;
      byService: {
        serviceId: string;
        amount: number;
      }[];
    };
  };
  generated: Date;
  status: 'draft' | 'final';
}

// Database Service Functions

// Users
export const createUser = async (userData: Omit<UserData, 'id'>) => {
  const docRef = await addDoc(collection(db, 'users'), {
    ...userData,
    createdAt: Timestamp.fromDate(userData.createdAt),
    lastLogin: Timestamp.fromDate(userData.lastLogin)
  });
  return docRef.id;
};

export const updateUser = async (userId: string, userData: Partial<UserData>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, userData);
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as UserData : null;
};

// Employees
export const createEmployee = async (employeeData: Omit<EmployeeData, 'id'>) => {
  const docRef = await addDoc(collection(db, 'employees'), employeeData);
  return docRef.id;
};

export const updateEmployee = async (employeeId: string, employeeData: Partial<EmployeeData>) => {
  const employeeRef = doc(db, 'employees', employeeId);
  await updateDoc(employeeRef, employeeData);
};

export const getEmployeesByTeam = async (teamId: string) => {
  const q = query(collection(db, 'employees'), where('teamId', '==', teamId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as EmployeeData);
};

// Clients
export const createClient = async (clientData: Omit<ClientData, 'id'>) => {
  const docRef = await addDoc(collection(db, 'clients'), {
    ...clientData,
    contract: {
      ...clientData.contract,
      startDate: Timestamp.fromDate(clientData.contract.startDate),
      endDate: clientData.contract.endDate ? Timestamp.fromDate(clientData.contract.endDate) : null
    }
  });
  return docRef.id;
};

export const updateClient = async (clientId: string, clientData: Partial<ClientData>) => {
  const clientRef = doc(db, 'clients', clientId);
  await updateDoc(clientRef, clientData);
};

export const getActiveClients = async () => {
  const q = query(
    collection(db, 'clients'),
    where('contract.status', '==', 'active'),
    orderBy('contract.startDate', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ClientData);
};

// Operations
export const createOperation = async (operationData: Omit<OperationData, 'id'>) => {
  const docRef = await addDoc(collection(db, 'operations'), {
    ...operationData,
    schedule: {
      start: Timestamp.fromDate(operationData.schedule.start),
      end: Timestamp.fromDate(operationData.schedule.end)
    },
    tracking: {
      ...operationData.tracking,
      checkIn: operationData.tracking.checkIn ? Timestamp.fromDate(operationData.tracking.checkIn) : null,
      checkOut: operationData.tracking.checkOut ? Timestamp.fromDate(operationData.tracking.checkOut) : null,
      gpsData: operationData.tracking.gpsData.map(data => ({
        ...data,
        timestamp: Timestamp.fromDate(data.timestamp)
      }))
    }
  });
  return docRef.id;
};

export const updateOperation = async (operationId: string, operationData: Partial<OperationData>) => {
  const operationRef = doc(db, 'operations', operationId);
  await updateDoc(operationRef, operationData);
};

export const getTeamOperations = async (teamId: string, status: OperationData['status']) => {
  const q = query(
    collection(db, 'operations'),
    where('teamId', '==', teamId),
    where('status', '==', status),
    orderBy('schedule.start', 'asc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as OperationData);
};

// Teams
export const createTeam = async (teamData: Omit<TeamData, 'id'>) => {
  const docRef = await addDoc(collection(db, 'teams'), teamData);
  return docRef.id;
};

export const updateTeam = async (teamId: string, teamData: Partial<TeamData>) => {
  const teamRef = doc(db, 'teams', teamId);
  await updateDoc(teamRef, teamData);
};

export const getActiveTeams = async () => {
  const q = query(
    collection(db, 'teams'),
    where('status', '==', 'active')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as TeamData);
};

// Inventory
export const updateInventory = async (inventoryId: string, transaction: {
  type: 'in' | 'out';
  quantity: number;
  operationId?: string;
}) => {
  const inventoryRef = doc(db, 'inventory', inventoryId);
  const inventoryDoc = await getDoc(inventoryRef);
  
  if (!inventoryDoc.exists()) {
    throw new Error('Inventory item not found');
  }

  const currentData = inventoryDoc.data() as InventoryData;
  const newQuantity = transaction.type === 'in' 
    ? currentData.quantity + transaction.quantity
    : currentData.quantity - transaction.quantity;

  await updateDoc(inventoryRef, {
    quantity: newQuantity,
    transactions: [...currentData.transactions, {
      date: Timestamp.now(),
      ...transaction
    }]
  });
};

export const getLowStockItems = async () => {
  const q = query(
    collection(db, 'inventory'),
    where('quantity', '<=', 'minimumQuantity')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as InventoryData);
};

// Reports
export const generateReport = async (reportData: Omit<ReportData, 'id'>) => {
  const docRef = await addDoc(collection(db, 'reports'), {
    ...reportData,
    dateRange: {
      start: Timestamp.fromDate(reportData.dateRange.start),
      end: Timestamp.fromDate(reportData.dateRange.end)
    },
    generated: Timestamp.now()
  });
  return docRef.id;
};

export const getReportsByDateRange = async (start: Date, end: Date) => {
  const q = query(
    collection(db, 'reports'),
    where('dateRange.start', '>=', Timestamp.fromDate(start)),
    where('dateRange.end', '<=', Timestamp.fromDate(end)),
    orderBy('dateRange.start', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ReportData);
};