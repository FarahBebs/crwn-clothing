import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlfCxedYpRsdJvNqyvm4eNKAKZuiRK3no",
  authDomain: "crwn-project-db-225e1.firebaseapp.com",
  projectId: "crwn-project-db-225e1",
  storageBucket: "crwn-project-db-225e1.appspot.com",
  messagingSenderId: "232891627547",
  appId: "1:232891627547:web:f313ae50d4c731c75ae0be",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
