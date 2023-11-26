import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTpRgBVERwL25HFkZLyRHiMVOR23unm2I",
  authDomain: "trello-app-13979.firebaseapp.com",
  projectId: "trello-app-13979",
  storageBucket: "trello-app-13979.appspot.com",
  messagingSenderId: "498292275644",
  appId: "1:498292275644:web:e4b2e6259db794784893b9",
  measurementId: "G-45BNBTCCX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
