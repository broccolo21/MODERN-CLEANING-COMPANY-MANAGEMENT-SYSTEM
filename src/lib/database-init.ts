import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, Timestamp, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7yZZS9vwRHOxQfzgQ2GwIn9yh12LYgZ8",
  authDomain: "clean-c02e7.firebaseapp.com",
  projectId: "clean-c02e7",
  storageBucket: "clean-c02e7.appspot.com",
  messagingSenderId: "109876543210",
  appId: "1:109876543210:web:abc123def456ghi789",
  measurementId: "G-BFS94M10DV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence.');
    }
  });
}

// Function to check if a collection is empty
async function isCollectionEmpty(collectionName: string): Promise<boolean> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.empty;
}

// Function to initialize a single collection
async function initializeCollection(collectionName: string, data: any[]) {
  console.log(`Initializing collection ${collectionName}...`);
  try {
    const isEmpty = await isCollectionEmpty(collectionName);
    if (isEmpty) {
      for (const item of data) {
        const docRef = doc(db, collectionName, item.id);
        await setDoc(docRef, {
          ...item,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
        console.log(`- Document ${item.id} added to ${collectionName}`);
      }
      console.log(`✓ Collection ${collectionName} initialized successfully`);
    } else {
      console.log(`⚠ Collection ${collectionName} already contains data, skipping initialization`);
    }
  } catch (error) {
    console.error(`✗ Error initializing ${collectionName}:`, error);
    throw error;
  }
}

// Initialize database with sample data
export async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // Initialize collections with sample data
    const collections = {
      users: [
        {
          id: 'admin1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          phone: '+39 333 1111111',
          status: 'active',
          settings: {
            notifications: { email: true, push: true, schedule: true },
            theme: 'dark'
          }
        }
      ],
      employees: [
        {
          id: 'emp1',
          userId: 'emp1',
          name: 'Marco Rossi',
          email: 'marco.rossi@example.com',
          role: 'team_leader',
          phone: '+39 333 2222222',
          status: 'active',
          teamId: 'team1'
        }
      ],
      clients: [
        {
          id: 'client1',
          name: 'TechCorp SpA',
          type: 'business',
          email: 'info@techcorp.it',
          phone: '+39 02 1234567',
          address: 'Via Roma 123, Milano',
          vatNumber: 'IT12345678901',
          status: 'active',
          serviceFrequency: 'weekly'
        }
      ],
      operations: [
        {
          id: 'op1',
          clientId: 'client1',
          teamId: 'team1',
          status: 'scheduled',
          startTime: Timestamp.now(),
          location: 'Via Roma 123, Milano',
          type: 'regular_cleaning'
        }
      ],
      teams: [
        {
          id: 'team1',
          name: 'Squadra A',
          leaderId: 'emp1',
          members: ['emp1'],
          status: 'active',
          schedule: {
            workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            shifts: { start: '09:00', end: '17:00' }
          }
        }
      ]
    };

    // Initialize each collection
    for (const [name, data] of Object.entries(collections)) {
      await initializeCollection(name, data);
    }

    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Error during database initialization:', error);
    throw error;
  }
}

// Run initialization
initializeDatabase().catch(console.error);