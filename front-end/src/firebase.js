import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const databaseURL = "https://pocketcloset-542e3-default-rtdb.firebaseio.com/";

const firebaseConfig = {
    apiKey: "AIzaSyDiomZpBaGnw99a60AA2u6rgA3wCmU_wXg",
    authDomain: "pocketcloset-542e3.firebaseapp.com",
    databaseURL: "https://pocketcloset-542e3-default-rtdb.firebaseio.com",
    projectId: "pocketcloset-542e3",
    storageBucket: "pocketcloset-542e3.appspot.com",
    messagingSenderId: "730839004045",
    appId: "1:730839004045:web:0d1b296e019d2660b7c3c4",
    measurementId: "G-N05QV7RL04"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);