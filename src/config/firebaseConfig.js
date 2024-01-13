import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6uqob1gcu5PFBPWeav9P5It8x6KqH58E",
    authDomain: "simple-mobile-app-526dc.firebaseapp.com",
    databaseURL: "https://simple-mobile-app-526dc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "simple-mobile-app-526dc",
    storageBucket: "simple-mobile-app-526dc.appspot.com",
    messagingSenderId: "756948223697",
    appId: "1:756948223697:web:e8d7203df03364197427f0",
    measurementId: "G-5QGGH3XK53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);