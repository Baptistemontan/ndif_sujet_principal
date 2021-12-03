import { FirebaseOptions, initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import {
  boatConverter,
  sauvetageConverter,
  saviorConverter,
  survivorConverter,
} from "./converters";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export const saviorCollection = collection(db, "sauveteur").withConverter(
  saviorConverter,
);
export const boatCollection = collection(db, "bateau").withConverter(
  boatConverter,
);
export const sauvetageCollection = collection(db, "sauvetage").withConverter(
  sauvetageConverter,
);
export const survivorCollection = collection(db, "survivor").withConverter(
  survivorConverter,
);
