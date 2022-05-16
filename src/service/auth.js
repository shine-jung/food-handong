import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, provider } from "./firebase";

class Auth {
  login() {
    signInWithPopup(firebaseAuth, provider);
  }
  logout() {
    signOut(firebaseAuth);
  }
  onAuthChange = (callback) => {
    onAuthStateChanged(firebaseAuth, (user) => {
      callback(user);
    });
  };
}

export default Auth;
