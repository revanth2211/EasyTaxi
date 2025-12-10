// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";   // ✅ add this

const firebaseConfig = {
  apiKey: "AIzaSyA3mztyT08KuemCUQyYqCJRr0GNmo9q8QA",
  authDomain: "easytaxi-1b2d5.firebaseapp.com",
  databaseURL: "https://easytaxi-1b2d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "easytaxi-1b2d5",
  storageBucket: "easytaxi-1b2d5.appspot.com",
  messagingSenderId: "243993026224",
  appId: "1:243993026224:web:d628408b64a2b9bb156575"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);   // ✅ export db





