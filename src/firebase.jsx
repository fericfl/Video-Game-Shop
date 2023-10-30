// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_6WcdF1rjtz-sPYiqFQlk6cBb7SjX6P8",
  authDomain: "video-game-shop-5d970.firebaseapp.com",
  projectId: "video-game-shop-5d970",
  storageBucket: "video-game-shop-5d970.appspot.com",
  messagingSenderId: "648663905773",
  appId: "1:648663905773:web:35bdb3f39f7feb1ccb23e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;