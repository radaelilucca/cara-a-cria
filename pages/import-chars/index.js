import React, { useContext, useEffect, useState } from "react";

import uuid from "react-uuid";
import Modal from "react-modal";

import {
  Container,
  CharsContainer,
  Chars,
  ImportModal,
} from "../../styles/pages/import-chars";

import Header from "../../src/components/Header";

import api from "../../services/animes-api";

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

const CharsView = ({ charsList }) => {
  const [charToImport, setCharToImport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImportStart = (char) => {
    const parsedChar = char;
    setCharToImport(parsedChar);
    setModalOpen(true);
  };

  const handleImportChar = (e) => {
    e.preventDefault();


    const parsedChar = 
  }

  return (
    <CharsContainer>
      <h5>Click the Char to import</h5>

      <Chars>
        {charsList.map((char) => (
          <li>
            <button type="button" onClick={() => handleImportStart(char)}>
              <div>
                <img src={char.image_url} />
              </div>
              <div>
                <strong>{char.name}</strong>
              </div>
            </button>
          </li>
        ))}
      </Chars>

      <Modal
        style={customModalStyles}
        isOpen={modalOpen && charToImport}
        onRequestClose={() => setModalOpen(false)}
      >
        <ImportModal>
          <img src={charToImport?.image_url} />
          <form>
            <label>Char Name:</label>
            <input
              type="text"
              placeholder="char name"
              value={charToImport?.name}
            />
            <label>New image link:</label>
            <input type="text" />

            <button type="submit">Import</button>
          </form>
        </ImportModal>
        {/* {playerChar && (
          <DetailChar>
            <img src={playerChar.imageSrc} alt={playerChar.name} />
            <h3>{playerChar.name}</h3>
          </DetailChar>
        )} */}
      </Modal>
    </CharsContainer>
  );
};

const EditView = () => {
  const [animeId, setAnimeId] = useState("38524");
  const [chars, setChars] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!animeId) return;

    const result = await api.get(`/anime/${animeId}/characters_staff`);

    console.log(result.data.characters);

    setChars(result.data.characters);
  };

  return (
    <Container>
      <Header>
        <h2>Import chars from My Anime List</h2>
      </Header>

      <label>Search chars by anime id</label>
      <input
        type="text"
        placeholder="Anime ID"
        onChange={(e) => setAnimeId(e.target.value)}
        value={animeId}
      />
      <button type="button" onClick={handleSubmit} disabled={!animeId}>
        GO
      </button>

      {chars && <CharsView charsList={chars} />}
    </Container>
  );
};

export default EditView;
