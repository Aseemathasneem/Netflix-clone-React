
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBaB3lGYA-GqHRRS6SHZFQ_Z5lmKm8j7NQ",
  authDomain: "netflix-app-f7588.firebaseapp.com",
  projectId: "netflix-app-f7588",
  storageBucket: "netflix-app-f7588.appspot.com",
  messagingSenderId: "185276493638",
  appId: "1:185276493638:web:2551d02273038a750d3f47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const database = getFirestore(app)