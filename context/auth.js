import { createContext } from "react";

import { firebaseConfig } from "../config/firebase";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

import { useAuthState } from "react-firebase-hooks/auth";

const authFunctions = firebase.auth();

export const AuthContext = createContext({});

export const AuthProvider = ({ children, ...props }) => {
  const [user, loading] = useAuthState(authFunctions);

  const firestore = firebase.firestore();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    authFunctions.signInWithPopup(provider);
  };

  const signOutGoogle = () => {
    console.log("log");
    authFunctions.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firestore,
        signInWithGoogle,
        signOutGoogle,
        authFunctions,
        firebase,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
