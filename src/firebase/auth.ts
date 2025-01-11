import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase.config.ts";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("user logged out");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const trackAuthState = (callback: (user: User | null) => void): void => {
  onAuthStateChanged(auth, callback);
};
