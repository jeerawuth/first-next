import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import nextConfig from '@/next.config';

const firebaseConfig = {
    apiKey: nextConfig.env.API_KEY,
    authDomain: nextConfig.env.AUTH_DOMAIN,
    projectId: nextConfig.env.PROJECT_ID,
    storageBucket: nextConfig.env.STORAGE_BUCKET,
    messagingSenderId: nextConfig.env.MESSAGING_SENDER_ID,
    appId: nextConfig.env.APP_ID,
    measurementId: nextConfig.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export default db;
