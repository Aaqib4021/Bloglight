// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import the storage function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2ljUDp8-Rdw7b5kDcXNcKzJrxdm-StMw",
  authDomain: "bloglight-d1140.firebaseapp.com",
  projectId: "bloglight-d1140",
  storageBucket: "bloglight-d1140.appspot.com",
  messagingSenderId: "860324566715",
  appId: "1:860324566715:web:96677cd8e2e64e42dabb9e",
  measurementId: "G-C5VMN0EFY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app); // Initialize storage
export { storage }; // Export the storage instance for use in your components
