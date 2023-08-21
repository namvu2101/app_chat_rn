import { initializeApp } from "firebase/app";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0b5e8LsCNHbxOzbQuRyr-pAxFbpbXa8M",
  authDomain: "signalapp-f3a8b.firebaseapp.com",
  projectId: "signalapp-f3a8b",
  storageBucket: "signalapp-f3a8b.appspot.com",
  messagingSenderId: "780258476895",
  appId: "1:780258476895:web:74e5781c2e279cfe452cea",
  measurementId: "G-RRQVW9KFXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userCurrent = auth().currentUser

export {app,auth,firestore,userCurrent}