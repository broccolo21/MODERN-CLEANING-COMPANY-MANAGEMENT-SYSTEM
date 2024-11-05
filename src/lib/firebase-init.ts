import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7yZZS9vwRHOxQfzgQ2GwIn9yh12LYgZ8",
  authDomain: "clean-c02e7.firebaseapp.com",
  projectId: "clean-c02e7",
  storageBucket: "clean-c02e7.appspot.com",
  messagingSenderId: "109876543210",
  appId: "1:109876543210:web:abc123def456ghi789",
  measurementId: "G-BFS94M10DV"
};

const app = initializeApp(firebaseConfig, 'secondary');
const db = getFirestore(app);

export async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

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
      ]
    };

    for (const [collectionName, data] of Object.entries(collections)) {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      
      if (snapshot.empty) {
        console.log(`Initializing ${collectionName} collection...`);
        for (const item of data) {
          await setDoc(doc(db, collectionName, item.id), {
            ...item,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          });
        }
        console.log(`✓ ${collectionName} collection initialized`);
      } else {
        console.log(`${collectionName} collection already contains data, skipping initialization`);
      }
    }

    console.log('✓ Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}