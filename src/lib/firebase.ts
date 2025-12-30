import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqwM1rr_5BCCZLdANSCJwhN0gUykEeC-A",
  authDomain: "gj-fashion-store.firebaseapp.com",
  projectId: "gj-fashion-store",
  storageBucket: "gj-fashion-store.appspot.com",
  messagingSenderId: "497143355906",
  appId: "1:497143355906:web:bea21416e412be0241e51b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
