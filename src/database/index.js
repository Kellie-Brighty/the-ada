import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr2_r91yLFwZXqbKKayWyi6jp3lHIxHCs",
  authDomain: "ada-stake-c9fb5.firebaseapp.com",
  projectId: "ada-stake-c9fb5",
  storageBucket: "ada-stake-c9fb5.appspot.com",
  messagingSenderId: "31770213051",
  appId: "1:31770213051:web:ce3057a2dae0636d83c79e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
