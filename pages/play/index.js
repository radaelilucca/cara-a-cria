import React, { useEffect, useState } from "react";

import uuid from "react-uuid";

import {
  Container,
  Header,
  CharItem,
  CharImg,
  CharName,
  CharsContainer,
  ImgIcon,
} from "../../styles/pages/play";

import fakeChars from "../../anime-chars.json";

const GameView = () => {
  const [chars, setChars] = useState([]);

  useEffect(() => {
    console.log(fakeChars);

    const parsedChars = fakeChars.chars.map((char) => {
      return {
        ...char,
        id: uuid(),
      };
    });

    setChars(parsedChars);
  }, []);

  const ImageIcon = () => (
    <ImgIcon onClick={() => alert("should show my character")}>
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
  return (
    <Container>
      <Header>
        <h2>Você é o: Naruto Hatake</h2>
        <ImageIcon />
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
    </Container>
  );
};

export default GameView;
