// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2qoLZuwgAHV-PC2OBXWJoeP_oFpsn-lU",
  authDomain: "householdtypescript-c2958.firebaseapp.com",
  projectId: "householdtypescript-c2958",
  storageBucket: "householdtypescript-c2958.appspot.com",
  messagingSenderId: "921676431756",
  appId: "1:921676431756:web:0616a341995e86990296a9",
  measurementId: "G-HB996P46WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}

