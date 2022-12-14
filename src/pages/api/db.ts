import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Read the private key from environment variable

const serviceAccount = {
  type: 'service_account',
  project_id: 'awasm-native',
  private_key_id: process.env.FIREBSE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CERT_URL
};

// If firebase-admin app is not initialized then initialize it
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any)
  });
}

// Export the Database instance
export const db = getFirestore();
