import React, { useEffect, useRef, useState, useContext } from "react";

import Modal from "react-modal";
import Router, { useRouter } from "next/router";

import {
  Container,
  CharItem,
  CharImg,
  CharName,
  CharsContainer,
  ImgIcon,
  DetailChar,
  PlayerCharHeader,
  ActionButtons,
  GuessModalContainer,
} from "../../styles/pages/play";
import Header from "../../src/components/Header";

import { AuthContext } from "../../context/auth";

import ReactCardFlip from "react-card-flip";

import { useDocumentData } from "react-firebase-hooks/firestore";

const GameView = () => {
  const [chars, setChars] = useState([]);
  const [flippedChars, setFlippedChars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [guessModalOpen, setGuessModalOpen] = useState(false);
  const [playerChar, setPlayerChar] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [opponent, setOpponent] = useState(null);

  const { user, loading, firestore } = useContext(AuthContext);

  const bgAudioRef = useRef(null);

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
      zIndex: 100,
    },
    overlay: {
      backgroundColor: "rgba(19, 15, 26, .85)",
      zIndex: 100,
    },
  };

  const router = useRouter();

  const { code } = router.query;

  const singleMatchRef = firestore.collection("matches").doc(`match-${code}`);

  const [singleMatch, loadingMatch] = useDocumentData(singleMatchRef);

  useEffect(() => {
    if (!loadingMatch) {
      if (singleMatch) {
        if (singleMatch.status === "finished") {
          alert("This match is already finished.");
          Router.push("/");
          return;
        }
        let playerCharId;
        if (!playerChar) {
          const { players = [] } = singleMatch;

          const hasChar = players.find((item) => item.id === user.uid);

          if (!hasChar) {
            const selectedChars = players.map((item) => item.charId);

            const availableChars = singleMatch.chars.filter(
              (item) => !selectedChars.includes(item.id)
            );

            const selectedChar =
              availableChars[
                Math.floor(Math.random() * singleMatch.chars.length)
              ];
            setPlayerChar(selectedChar);

            const [name] = user.displayName.split(" ");

            singleMatchRef.update({
              ...singleMatch,
              players: [
                ...players,
                {
                  id: user.uid,
                  charId: selectedChar.id,
                  charName: selectedChar.name,
                  name,
                },
              ],
            });

            playerCharId = selectedChar.id;
          } else {
            const loadedPlayerChar = singleMatch.chars.find(
              (item) => item.id === hasChar.charId
            );
            setPlayerChar(loadedPlayerChar);

            playerCharId = loadedPlayerChar.id;
          }
        } else {
          playerCharId = playerChar.id;
        }

        const filteredChars = singleMatch.chars.filter(
          (item) => item.id !== playerCharId
        );

        setChars(filteredChars);
      } else {
        alert("Match not found");
        Router.push("/");
      }
    }
  }, [singleMatch, loadingMatch]);

  useEffect(() => {
    if (!loadingMatch) {
      const [name] = user.displayName.split(" ");

      const { uid: id } = user;

      const findOpponent = singleMatch.players.find(
        (item) => item.id !== user.uid
      );
      if (findOpponent) {
        setOpponent(findOpponent);
      }

      const userForTurn = {
        name,
        id,
      };
      if (
        singleMatch.players.length === singleMatch.maxPlayers &&
        singleMatch.status === "waiting"
      ) {
        singleMatchRef.update({
          ...singleMatch,
          status: "in-game",
          turn: userForTurn,
        });
      }
    }
  }, [singleMatch, loadingMatch]);

  useEffect(() => {
    if (!loadingMatch) {
      if (singleMatch.status === "in-game") {
        setIsPlayerTurn(singleMatch.turn.id === user.uid);
      }
    }
  }, [singleMatch, loadingMatch]);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.play();
    }
  }, [bgAudioRef]);

  const LogoutIcon = () => (
    <ImgIcon onClick={() => Router.push("/")}>
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

  const handleNextTurn = () => {
    const { name, id } = opponent;
    singleMatchRef.update({
      turn: {
        name,
        id,
      },
    });
  };

  const getTurnLabel = () => {
    if (isPlayerTurn) return "Finish turn";

    if (singleMatch?.turn) return `${singleMatch?.turn.name}'s turn...`;

    return "Waiting...";
  };

  const handleGuess = (char) => {
    if (char.id === opponent.charId) {
      alert("YOU WIN!");
      const [name] = user.displayName.split(" ");
      const { uid: id } = user;
      singleMatchRef.update({
        ...singleMatch,
        status: "finished",
        winner: { name, id },
      });
      Router.push("/");
    } else {
      alert("YOU LOSE!");

      const { id, name } = opponent;
      singleMatchRef.update({
        ...singleMatch,
        status: "finished",
        winner: { name, id },
      });

      Router.push("/");
    }
  };

  useEffect(() => {
    if (!user && !loading) Router.push("/");
  }, [user, loading]);

  return (
    <Container>
      <Header>
        {playerChar ? (
          <PlayerCharHeader>
            <h2>You are: {playerChar?.name}</h2>
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
          </PlayerCharHeader>
        ) : (
          <h2>Loading...</h2>
        )}

        <LogoutIcon />
      </Header>

      <ActionButtons>
        <button type="button" onClick={handleNextTurn} disabled={!isPlayerTurn}>
          {getTurnLabel()}
        </button>
        <button
          type="button"
          disabled={!isPlayerTurn}
          onClick={() => setGuessModalOpen(true)}
        >
          Make a Guess
        </button>
      </ActionButtons>

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

      <Modal
        style={customModalStyles}
        isOpen={playerChar && guessModalOpen}
        onRequestClose={() => setGuessModalOpen(false)}
        contentLabel="Make a guess"
      >
        <GuessModalContainer>
          <h2>Choose who's the opponent's character.</h2>

          <ul>
            {chars.map((char) => {
              if (!flippedChars.includes(char.id))
                return (
                  <li>
                    <button type="button" onClick={() => handleGuess(char)}>
                      {char.name}
                    </button>
                  </li>
                );
            })}
          </ul>
        </GuessModalContainer>
      </Modal>

      <audio ref={bgAudioRef} src="/assets/bgmusic.mp3" loop />
    </Container>
  );
};

export default GameView;
