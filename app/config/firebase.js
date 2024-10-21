// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArR_LExs6446EoFho-UcO4PkWuW1xWALE",
  authDomain: "next-14-cd7d8.firebaseapp.com",
  projectId: "next-14-cd7d8",
  storageBucket: "next-14-cd7d8.appspot.com",
  messagingSenderId: "154037733261",
  appId: "1:154037733261:web:0d3845d26f739427d2dfc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
