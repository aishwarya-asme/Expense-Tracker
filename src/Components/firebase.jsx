// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4xAeGjkhVqInw_vpGG1ey_Z3A0vZvFXc",
  authDomain: "expenses-975b0.firebaseapp.com",
  projectId: "expenses-975b0",
  storageBucket: "expenses-975b0.appspot.com",
  messagingSenderId: "182896456936",
  appId: "1:182896456936:web:46dd25babc23020731055d",
  measurementId: "G-FWJRBH8J9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);