// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXjK4sN8F5YUp4oezbi7KglZGxVrlM5kk",
  authDomain: "restourants--1.firebaseapp.com",
  projectId: "restourants--1",
  storageBucket: "restourants--1.appspot.com",
  messagingSenderId: "596491215029",
  appId: "1:596491215029:web:80d9825d38aabb4b7d5efc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore();
