// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_wMdGjOFvMYz9YPV-PRD7X2fNXroJC5Q",
  authDomain: "slow-bit-sanctuary.firebaseapp.com",
  projectId: "slow-bit-sanctuary",
  storageBucket: "slow-bit-sanctuary.firebasestorage.app",
  messagingSenderId: "79135864287",
  appId: "1:79135864287:web:039b23765e44422f87406a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;