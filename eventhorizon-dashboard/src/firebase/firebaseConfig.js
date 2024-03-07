// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8JRzNggT-p7Hthx_Vz5aBTIaMLOUhJQY",
  authDomain: "eventhorizon-196ed.firebaseapp.com",
  projectId: "eventhorizon-196ed",
  storageBucket: "eventhorizon-196ed.appspot.com",
  messagingSenderId: "865028916201",
  appId: "1:865028916201:web:24a43985cf2aa407b00178", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); 
export {fireDB , auth,storage};
