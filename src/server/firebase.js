// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword
 } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAa7M2sqetsnFGBVk9cKqD5QGHSs4ashlg",
  authDomain: "react-data-474d8.firebaseapp.com",
  databaseURL: "https://react-data-474d8-default-rtdb.firebaseio.com",
  projectId: "react-data-474d8",
  storageBucket: "react-data-474d8.appspot.com",
  messagingSenderId: "159616505616",
  appId: "1:159616505616:web:d1ceee8d9aa40d0c54b795"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// Google Login
export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login failed:", error);
  }
};


// Email/password authentication functions
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful! You can now log in.");
    return userCredential; // ✅ return this so the caller can access .user
  } catch (error) {
    alert(error.message);
    throw error; // re-throw so the catch block in `handleRegister` can handle it too
  }
};
  
  export const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };
  
  export const logout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };