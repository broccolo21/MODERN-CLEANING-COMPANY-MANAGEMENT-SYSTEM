import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
  orderBy,
  limit,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Client } from '../types/client';

// Client Services
export const getClients = async () => {
  const querySnapshot = await getDocs(collection(db, 'clients'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    contractStart: doc.data().contractStart?.toDate(),
    contractEnd: doc.data().contractEnd?.toDate(),
    nextService: doc.data().nextService?.toDate(),
    lastService: doc.data().lastService?.toDate()
  })) as Client[];
};

export const addClient = async (clientData: Omit<Client, 'id'>) => {
  const data = {
    ...clientData,
    contractStart: Timestamp.fromDate(clientData.contractStart),
    contractEnd: clientData.contractEnd ? Timestamp.fromDate(clientData.contractEnd) : null,
    nextService: clientData.nextService ? Timestamp.fromDate(clientData.nextService) : null,
    lastService: clientData.lastService ? Timestamp.fromDate(clientData.lastService) : null,
    createdAt: Timestamp.now()
  };
  
  const docRef = await addDoc(collection(db, 'clients'), data);
  return docRef.id;
};

export const updateClient = async (clientId: string, clientData: Partial<Client>) => {
  const data: DocumentData = { ...clientData };
  
  if (clientData.contractStart) {
    data.contractStart = Timestamp.fromDate(clientData.contractStart);
  }
  if (clientData.contractEnd) {
    data.contractEnd = Timestamp.fromDate(clientData.contractEnd);
  }
  if (clientData.nextService) {
    data.nextService = Timestamp.fromDate(clientData.nextService);
  }
  if (clientData.lastService) {
    data.lastService = Timestamp.fromDate(clientData.lastService);
  }
  
  data.updatedAt = Timestamp.now();
  await updateDoc(doc(db, 'clients', clientId), data);
};

export const deleteClient = async (clientId: string) => {
  await deleteDoc(doc(db, 'clients', clientId));
};

// Operations Services
export interface Operation {
  id?: string;
  clientId: string;
  teamId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  location: string;
  notes?: string;
  videoUrl?: string;
  gpsData?: {
    latitude: number;
    longitude: number;
    timestamp: Date;
  }[];
}

export const getOperations = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, 'operations'), orderBy('startTime', 'desc'), limit(100))
  );
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    startTime: doc.data().startTime.toDate(),
    endTime: doc.data().endTime?.toDate(),
    gpsData: doc.data().gpsData?.map((data: any) => ({
      ...data,
      timestamp: data.timestamp.toDate()
    }))
  })) as Operation[];
};

export const addOperation = async (operationData: Omit<Operation, 'id'>) => {
  const data = {
    ...operationData,
    startTime: Timestamp.fromDate(operationData.startTime),
    endTime: operationData.endTime ? Timestamp.fromDate(operationData.endTime) : null,
    gpsData: operationData.gpsData?.map(data => ({
      ...data,
      timestamp: Timestamp.fromDate(data.timestamp)
    })),
    createdAt: Timestamp.now()
  };
  
  const docRef = await addDoc(collection(db, 'operations'), data);
  return docRef.id;
};

export const updateOperation = async (operationId: string, operationData: Partial<Operation>) => {
  const data: DocumentData = { ...operationData };
  
  if (operationData.startTime) {
    data.startTime = Timestamp.fromDate(operationData.startTime);
  }
  if (operationData.endTime) {
    data.endTime = Timestamp.fromDate(operationData.endTime);
  }
  if (operationData.gpsData) {
    data.gpsData = operationData.gpsData.map(data => ({
      ...data,
      timestamp: Timestamp.fromDate(data.timestamp)
    }));
  }
  
  data.updatedAt = Timestamp.now();
  await updateDoc(doc(db, 'operations', operationId), data);
};

// Teams Services
export interface Team {
  id?: string;
  name: string;
  leader: string;
  members: string[];
  status: 'active' | 'inactive';
  currentOperation?: string;
}

export const getTeams = async () => {
  const querySnapshot = await getDocs(collection(db, 'teams'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Team[];
};

export const addTeam = async (teamData: Omit<Team, 'id'>) => {
  const docRef = await addDoc(collection(db, 'teams'), {
    ...teamData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const updateTeam = async (teamId: string, teamData: Partial<Team>) => {
  await updateDoc(doc(db, 'teams', teamId), {
    ...teamData,
    updatedAt: Timestamp.now()
  });
};

// Employees Services
export interface Employee {
  id?: string;
  name: string;
  email: string;
  role: 'team_leader' | 'operator';
  teamId?: string;
  status: 'active' | 'inactive' | 'on_leave';
  deviceId?: string;
}

export const getEmployees = async () => {
  const querySnapshot = await getDocs(collection(db, 'employees'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Employee[];
};

export const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
  const docRef = await addDoc(collection(db, 'employees'), {
    ...employeeData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const updateEmployee = async (employeeId: string, employeeData: Partial<Employee>) => {
  await updateDoc(doc(db, 'employees', employeeId), {
    ...employeeData,
    updatedAt: Timestamp.now()
  });
};