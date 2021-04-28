import React, { useState } from "react";
import Link from "next/link";

import {
  Container,
  // NavButton,
  ImgIcon,
  LinkButton,
  JoinGameContainer,
  JoinButton,
} from "../styles/pages/home";

import { Label, Input } from "../styles/pages/new-char";

import Router from "next/router";

import Header from "../src/components/Header";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/analytics";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Home() {
  const [matchCode, setMatchCode] = useState("");
  // function SignIn() {
  //   const signInWithGoogle = () => {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     auth.signInWithPopup(provider);
  //   };

  //   return (
  //     <>
  //       <NavButton className="sign-in" onClick={signInWithGoogle}>
  //         Sign in with Google
  //       </NavButton>
  //     </>
  //   );
  // }

  // function SignOut() {
  //   return (
  //     auth.currentUser && (
  //       <NavButton onClick={() => auth.signOut()}>Sign Out</NavButton>
  //     )
  //   );
  // }

  const handleJoinGame = (e) => {
    e.preventDefault();
    Router.push(`/play/${matchCode}`);
  };

  const ImageIcon = () => (
    <ImgIcon>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="sign-out-alt"
        class="svg-inline--fa fa-sign-out-alt fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
        ></path>
      </svg>
    </ImgIcon>
  );

  return (
    <Container>
      <Header>
        <h2>Home</h2>
        <ImageIcon />
      </Header>

      <Link href="/create">
        <LinkButton>Create a Game</LinkButton>
      </Link>
      <form onSubmit={handleJoinGame}>
        <JoinGameContainer>
          <Label>Enter a match code</Label>
          <Input
            name="roomCode"
            placeholder="match code"
            value={matchCode}
            onChange={(e) => setMatchCode(e.target.value)}
          />
        </JoinGameContainer>
        <JoinButton type="submit">Join</JoinButton>
      </form>
    </Container>
  );
}
