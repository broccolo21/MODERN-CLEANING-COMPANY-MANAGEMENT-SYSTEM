import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDKgENGjKJ5jiWSi5uDIUNqjoyGG1RA-hM",
  authDomain: "clean-vision-app.firebaseapp.com",
  projectId: "clean-vision-app",
  storageBucket: "clean-vision-app.appspot.com",
  messagingSenderId: "109876543210",
  appId: "1:109876543210:web:abc123def456ghi789",
  measurementId: "G-BFS94M10DV"
};

class FirebaseService {
  private static instance: FirebaseService;
  private app;
  private _auth;
  private _db;
  private _storage;
  private _analytics;
  private _initialized = false;

  private constructor() {
    this.initializeFirebase();
  }

  private async initializeFirebase() {
    if (this._initialized) return;

    try {
      this.app = initializeApp(firebaseConfig);
      this._auth = getAuth(this.app);
      this._db = getFirestore(this.app);
      this._storage = getStorage(this.app);

      // Enable offline persistence for auth
      await setPersistence(this._auth, browserLocalPersistence);

      // Enable offline persistence for Firestore
      if (typeof window !== 'undefined' && this._db) {
        await this.initializeOfflinePersistence();
      }

      // Initialize analytics if supported
      if (typeof window !== 'undefined') {
        await this.initializeAnalytics();
      }

      this._initialized = true;
    } catch (error) {
      console.error('Firebase initialization error:', error);
      // Don't throw the error - allow the app to continue working offline
      this._initialized = false;
    }
  }

  private async initializeOfflinePersistence() {
    try {
      await enableIndexedDbPersistence(this._db, {
        forceOwnership: false
      });
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Multiple tabs open, persistence enabled in first tab only');
      } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.warn('Browser doesn\'t support persistence');
      }
    }
  }

  private async initializeAnalytics() {
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        this._analytics = getAnalytics(this.app);
      }
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
      this._analytics = null;
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public async waitForInitialization(): Promise<void> {
    if (!this._initialized) {
      await this.initializeFirebase();
    }
  }

  get auth() {
    return this._auth;
  }

  get db() {
    return this._db;
  }

  get storage() {
    return this._storage;
  }

  get analytics() {
    return this._analytics;
  }

  get isInitialized() {
    return this._initialized;
  }
}

const firebaseService = FirebaseService.getInstance();

export const auth = firebaseService.auth;
export const db = firebaseService.db;
export const storage = firebaseService.storage;
export const analytics = firebaseService.analytics;
export const waitForFirebase = () => firebaseService.waitForInitialization();