import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC72KGZCyIey7nw3-Ld1_zWUgCqfmflSME",
  authDomain: "pillmate-fd180.firebaseapp.com",
  projectId: "pillmate-fd180",
  storageBucket: "pillmate-fd180.appspot.com",
  messagingSenderId: "84925124192",
  appId: "1:84925124192:web:5891161c099004ebacfd05",
  databaseURL: "https://pillmate-fd180-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
