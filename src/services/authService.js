import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import app from './firebaseConfig';
import { storeUserData } from './firestoreService';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };

    // Store user data in Firestore
    await storeUserData(user.uid, userData);
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};

const signOutUser = async () => {
  try {
    return signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};

export { signIn, signOutUser };
