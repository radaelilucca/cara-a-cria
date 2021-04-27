import React, { useEffect, useState } from "react";

import uuid from "react-uuid";

import {
  Container,
  CharItem,
  CharImg,
  CharName,
  CharsContainer,
} from "../../styles/pages/play";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";

import Header from "../../src/components/Header";

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

const CharsView = () => {
  const [chars, setChars] = useState([]);

  const firestore = firebase.firestore();

  const charactersRef = firestore.collection("characters");
  const query = charactersRef.orderBy("createdAt");

  const [characters] = useCollectionData(query);

  useEffect(() => {
    if (characters) {
      console.log(characters);
      setChars(characters);
    }
  }, [characters]);

  return (
    <Container>
      <Header>
        <h2>ALl characters</h2>
      </Header>

      <CharsContainer>
        {chars &&
          chars.map((char) => (
            <CharItem key={char.id}>
              <CharImg src={char.imageSrc} alt={char.name} />
              <CharName>{char.name}</CharName>
            </CharItem>
          ))}
      </CharsContainer>
    </Container>
  );
};

export default CharsView;
