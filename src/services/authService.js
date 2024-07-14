import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const signIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    return signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { signIn, signOutUser };
