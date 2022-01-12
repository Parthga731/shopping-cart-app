// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhBLp-0VZVvrlKwdwmgz3h-O0jWGxkQ60",
  authDomain: "products-shopping-app.firebaseapp.com",
  projectId: "products-shopping-app",
  storageBucket: "products-shopping-app.appspot.com",
  messagingSenderId: "286227853354",
  appId: "1:286227853354:web:935ce41399f29175289353",
  measurementId: "G-5NCREPKK25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
export const database = getFirestore(app);
export const storage = getStorage(app);
