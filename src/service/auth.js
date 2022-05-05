import { signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, provider } from "./firebase";

class Auth {
  login() {
    signInWithRedirect(firebaseAuth, provider);
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
