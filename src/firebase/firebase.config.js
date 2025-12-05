// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE_ZA8PC59wOi-5w_VxxcIuUls7-VQuG8",
  authDomain: "pawmart-8f1a2.firebaseapp.com",
  projectId: "pawmart-8f1a2",
  storageBucket: "pawmart-8f1a2.appspot.com",
  messagingSenderId: "24955436260",
  appId: "1:24955436260:web:129da778e6ac57f63700f1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
