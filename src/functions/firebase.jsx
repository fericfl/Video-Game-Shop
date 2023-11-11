// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChHu3Az3c8YhqY1VIE_nAHFjI7Xapa1ZM",
  authDomain: "vgame-store-8969b.firebaseapp.com",
  projectId: "vgame-store-8969b",
  storageBucket: "vgame-store-8969b.appspot.com",
  messagingSenderId: "887071808087",
  appId: "1:887071808087:web:97f70afbf78612da496112",
  measurementId: "G-TLX7BWL5BB"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


export {app, db, storage, auth};