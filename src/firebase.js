import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASHfd3GHmuUuXwKrAHW6G8Jhf-hCrRKQA",
  authDomain: "expense-tracker-166da.firebaseapp.com",
  projectId: "expense-tracker-166da",
  storageBucket: "expense-tracker-166da.firebasestorage.app",
  messagingSenderId: "456670923644",
  appId: "1:456670923644:web:c3d4276f5b5c485f1032f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };