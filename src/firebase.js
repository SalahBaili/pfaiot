import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, off, onValue, ref, set } from 'firebase/database';

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC72KGZCyIey7nw3-Ld1_zWUgCqfmflSME",
  authDomain: "pillmate-fd180.firebaseapp.com",
  projectId: "pillmate-fd180",
  storageBucket: "pillmate-fd180.appspot.com", // 🔧 Correction ici : .app → .app**spot.com**
  messagingSenderId: "84925124192",
  appId: "1:84925124192:web:5891161c099004ebacfd05",
  databaseURL: "https://pillmate-fd180-default-rtdb.firebaseio.com/"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ✅ Exporte proprement
export { app, auth, database, off, onValue, ref, set };
