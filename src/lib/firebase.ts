// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApMkfga0dh9aoIr6A-fue8Szaw3E1q3YA",
  authDomain: "gj-fashion-store.firebaseapp.com",
  projectId: "gj-fashion-store",
  storageBucket: "gj-fashion-store.firebasestorage.app",
  messagingSenderId: "497143355906",
  appId: "1:497143355906:web:bea21416e412be0241e51b",
  measurementId: "G-48F8R18NLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
