// Debug script to test PDF upload functionality
console.log('Testing PDF upload...');

// Check if Firebase is properly initialized
import { db, storage } from './lib/firebase.js';
console.log('Firebase DB:', db);
console.log('Firebase Storage:', storage);

// Check environment variables
console.log('Environment variables:');
console.log('NEXT_PUBLIC_FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Not set');
console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Not set');
console.log('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Not set');
