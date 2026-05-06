// Test Firebase connection and permissions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './lib/firebase.js';

async function testFirebaseUpload() {
  try {
    // Create a small test file
    const testContent = 'Test file content';
    const blob = new Blob([testContent], { type: 'text/plain' });
    
    // Test upload to storage
    const storageRef = ref(storage, 'test/test-file.txt');
    console.log('Testing upload to:', storageRef);
    
    await uploadBytes(storageRef, blob);
    console.log('Upload successful');
    
    // Test download URL
    const url = await getDownloadURL(storageRef);
    console.log('Download URL:', url);
    
    return true;
  } catch (error) {
    console.error('Firebase test failed:', error);
    return false;
  }
}

testFirebaseUpload();
