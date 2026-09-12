import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import firebaseAppletConfig from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: firebaseAppletConfig.projectId,
  appId: firebaseAppletConfig.appId,
  apiKey: firebaseAppletConfig.apiKey,
  authDomain: firebaseAppletConfig.authDomain,
  storageBucket: firebaseAppletConfig.storageBucket,
  messagingSenderId: firebaseAppletConfig.messagingSenderId,
  measurementId: firebaseAppletConfig.measurementId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app, firebaseAppletConfig.firestoreDatabaseId);

export const auth = getAuth(app);

export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Non-blocking fallback if browser blocks analytics/cookies
  });
}

export function handleFirestoreError(error: unknown, context: string) {
  const message = error instanceof Error ? error.message : String(error);
  if (
    message.includes('unavailable') ||
    message.includes('offline') ||
    message.includes('Could not reach Cloud Firestore backend')
  ) {
    console.warn(`[Firestore Offline/Retry - ${context}]: ${message}`);
  } else {
    console.error(`[Firestore Error - ${context}]:`, error);
  }
}





