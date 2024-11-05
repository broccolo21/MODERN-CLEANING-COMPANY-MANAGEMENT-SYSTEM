import { 
  doc,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      schedule: boolean;
    }
  };
  updatedAt: Date;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        updatedAt: data.updatedAt?.toDate(),
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateUserSettings = async (userId: string, settings: Partial<UserProfile['settings']>) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      settings,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};