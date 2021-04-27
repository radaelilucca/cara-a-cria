import React, { useEffect } from "react";

import { Container, NavButton } from "../styles/pages/home";

import Header from "../src/components/Header";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBlzLd5oIftzTctFxmoz_C1tblgsPh1epw",
  authDomain: "cara-a-cria.firebaseapp.com",
  projectId: "cara-a-cria",
  storageBucket: "cara-a-cria.appspot.com",
  messagingSenderId: "45440690874",
  appId: "1:45440690874:web:5e3f1937bd1fc7a8767083",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Home() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
  }, [user]);

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };

    return (
      <>
        <NavButton className="sign-in" onClick={signInWithGoogle}>
          Sign in with Google
        </NavButton>
      </>
    );
  }

  function SignOut() {
    return (
      auth.currentUser && (
        <NavButton className="sign-out" onClick={() => auth.signOut()}>
          Sign Out
        </NavButton>
      )
    );
  }

  return (
    <Container>
      <Header>
        <h2>Home</h2>
      </Header>

      <section>{user ? <SignOut /> : <SignIn />}</section>

      {/* <NavButton>Rooms</NavButton>
      <NavButton>Sair</NavButton> */}
    </Container>
  );
}
