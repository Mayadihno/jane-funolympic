// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5V0bYl9Qymw8-LYhc4_JFF1ODpimtyjI",
  authDomain: "jane-app-76b2e.firebaseapp.com",
  projectId: "jane-app-76b2e",
  storageBucket: "jane-app-76b2e.appspot.com",
  messagingSenderId: "1093252209360",
  appId: "1:1093252209360:web:179451777b8e0626301cd5",
  appVerificationDisabledForTesting: true,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
