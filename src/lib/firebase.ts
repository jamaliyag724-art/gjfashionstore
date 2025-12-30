import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqwM1rr_5BCCZLDANscJwhN0gUykeC-A",
  authDomain: "gj-fashion-store.firebaseapp.com",
  projectId: "gj-fashion-store",
  storageBucket: "gj-fashion-store.firebasestorage.app",
  messagingSenderId: "497143355906",
  appId: "1:497143355906:web:bea21416e412be0241e51b",
  measurementId: "G-48F8R1NLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
