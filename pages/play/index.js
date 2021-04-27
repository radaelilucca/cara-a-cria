import React, { useEffect, useState } from "react";

import Modal from "react-modal";

import uuid from "react-uuid";

import {
  Container,
  CharItem,
  CharImg,
  CharName,
  CharsContainer,
  ImgIcon,
  DetailChar,
} from "../../styles/pages/play";

import ReactCardFlip from "react-card-flip";

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

const GameView = () => {
  const [chars, setChars] = useState([]);
  const [flippedChars, setFlippedChars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [playerChar, setPlayerChar] = useState(null);

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(19, 15, 26, .85)",
    },
  };

  const firestore = firebase.firestore();

  const charactersRef = firestore.collection("characters");
  const query = charactersRef.limit(20);

  const [characters] = useCollectionData(query);

  useEffect(() => {
    if (characters) {
      const parsedChars = characters
        .map((char) => {
          return {
            ...char,
            id: uuid(),
          };
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);

      if (parsedChars) {
        const player =
          parsedChars[Math.floor(Math.random() * parsedChars.length)];
        setPlayerChar(player);
      }

      setChars(parsedChars);
    }
  }, [characters]);

  const ImageIcon = () => (
    <ImgIcon onClick={handleModal}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="portrait"
        className="svg-inline--fa fa-portrait fa-w-12"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM192 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 384 80 375.4 80 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"
        ></path>
      </svg>
    </ImgIcon>
  );

  const handleFlipChar = (charId) => {
    const isFlipped = flippedChars.find((item) => item == charId);

    if (isFlipped) {
      const filteredFlippedChars = flippedChars.filter(
        (item) => item !== charId
      );
      setFlippedChars(filteredFlippedChars);
    } else {
      setFlippedChars((prev) => [...prev, charId]);
    }
  };

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <Container>
      <Header>
        <h2>
          You are: <span>{playerChar?.name}</span>
        </h2>
        <ImageIcon onClick={handleModal} />
      </Header>

      <CharsContainer>
        {chars &&
          chars.map((char) => (
            <ReactCardFlip
              isFlipped={() => flippedChars.some((item) => item === char.id)}
              flipDirection="horizontal"
            >
              <CharItem
                checked={char.checked}
                onClick={() => handleFlipChar(char.id)}
                key={char.id}
                id="#charItem"
              >
                <CharImg src={char.imageSrc} alt={char.name} />
                <CharName checked={char.checked}>{char.name}</CharName>
              </CharItem>

              <CharItem onClick={() => handleFlipChar(char.id)} key={char.id} />
            </ReactCardFlip>
          ))}
      </CharsContainer>

      <Modal
        style={customModalStyles}
        isOpen={playerChar && modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
      >
        {playerChar && (
          <DetailChar>
            <img src={playerChar.imageSrc} alt={playerChar.name} />
            <h3>{playerChar.name}</h3>
          </DetailChar>
        )}
      </Modal>
    </Container>
  );
};

export default GameView;
