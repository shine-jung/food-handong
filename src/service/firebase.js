import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
export const firebaseAuth = getAuth();
export const provider = new GoogleAuthProvider();
