import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Read the private key from environment variable
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// If firebase-admin app is not initialized then initialize it
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any)
  });
}

// Export the Database instance
export const db = getFirestore();
