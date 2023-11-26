import { getFirestore, collection, addDoc  } from "firebase/firestore";
import app from './firebaseConfig'

const db = getFirestore(app);

const storeUserData = async(uid, userData) => {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
};

export { storeUserData };
