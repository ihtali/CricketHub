import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyBA6znn4yWM-RO0VWtD6LLNQqvVrM4GyUc",
    authDomain: "crickethubapp.firebaseapp.com",
    projectId: "crickethubapp",
    storageBucket: "crickethubapp.firebasestorage.app",
    messagingSenderId: "1055912646617",
    appId: "1:1055912646617:web:70ba6038ec246300fb2bc8",
    measurementId: "G-XZ0VYNEJSJ"
  };
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Enable persistent auth session
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
