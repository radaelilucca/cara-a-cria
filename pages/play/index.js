import React, { useEffect, useState } from "react";

import Modal from "react-modal";

import uuid from "react-uuid";

import {
  Container,
  Header,
  CharItem,
  CharImg,
  CharName,
  CharsContainer,
  ImgIcon,
  PlayerChar,
} from "../../styles/pages/play";

import fakeChars from "../../anime-chars.json";

const GameView = () => {
  const [chars, setChars] = useState([]);
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

  useEffect(() => {
    const parsedChars = fakeChars.chars.map((char) => {
      return {
        ...char,
        id: uuid(),
      };
    });

    if (parsedChars) {
      const player =
        parsedChars[Math.floor(Math.random() * parsedChars.length)];
      setPlayerChar(player);
    }

    setChars(parsedChars);
  }, []);

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

  const handleSelectChar = (char) => {
    const newChars = chars.map((item) => {
      if (item.id === char.id) {
        return {
          ...item,
          checked: !char?.checked,
        };
      }

      return item;
    });

    console.log("new chars ->", newChars);

    setChars(newChars);
  };

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <Container>
      <Header>
        <h2>
          Você é o: <span>{playerChar?.name}</span>
        </h2>
        <ImageIcon onClick={handleModal} />
      </Header>

      <CharsContainer>
        {chars.length &&
          chars.map((char) => (
            <CharItem
              checked={char.checked}
              onClick={() => handleSelectChar(char)}
              key={char.id}
            >
              <CharImg src={char.imgSrc} alt={char.name} />
              <CharName checked={char.checked}>{char.name}</CharName>
            </CharItem>
          ))}
      </CharsContainer>

      <Modal
        style={customModalStyles}
        isOpen={playerChar && modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
      >
        {playerChar && (
          <PlayerChar>
            <img src={playerChar.imgSrc} alt={playerChar.name} />
            <h3 checked={playerChar.checked}>{playerChar.name}</h3>
          </PlayerChar>
        )}
      </Modal>
    </Container>
  );
};

export default GameView;
