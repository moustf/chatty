import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDv2zwTGfJY58hP8vpnnRWxQw-7RjxLx44",
  authDomain: "chatty-707.firebaseapp.com",
  projectId: "chatty-707",
  storageBucket: "chatty-707.appspot.com",
  messagingSenderId: "202916465732",
  appId: "1:202916465732:web:cb039d91d18e5de9b38011",
  measurementId: "G-WEHVGS511D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
