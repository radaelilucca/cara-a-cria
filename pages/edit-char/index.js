import React, { useContext, useEffect, useState } from "react";

import uuid from "react-uuid";

import {
  Container,
  Form,
  Label,
  Input,
  CreateButton,
} from "../../styles/pages/new-char";

import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";

import CreatableSelect from "react-select/creatable";

import Header from "../../src/components/Header";
import { AuthContext } from "../../context/auth";
import { CharImg, CharItem, CharName } from "../../styles/pages/play";

const EditView = () => {
  const { firestore } = useContext(AuthContext);

  const [chars, setChars] = useState([]);
  const [currentChar, setCurrentChar] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({});

  const animesRef = firestore.collection("animes");
  const [animes] = useCollectionData(animesRef);

  const charactersRef = firestore.collection("charactersV2");

  const [characters, loading] = useCollectionDataOnce(charactersRef);

  useEffect(() => {
    if (!loading && characters) {
      const filteredChars = characters.filter((item) => !item.anime);
      setChars(filteredChars);

      setCurrentChar(filteredChars[currentIndex]);
    }
  }, [characters]);

  useEffect(() => {
    setCurrentChar(chars[currentIndex]);
  }, [currentIndex]);

  const handleSelectChange = async (newValue) => {
    const anime = {
      ...newValue,
      id: uuid(),
    };

    setFormData((prev) => ({
      ...prev,
      anime,
    }));

    if (animes.find((item) => item.value === anime.value)) {
      return;
    }

    const { label, value, id } = anime;

    animesRef.doc(anime.label).set({ label, value, id });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentCharRef = firestore
        .collection("charactersV2")
        .doc(`char-${currentChar.name}`);
      currentCharRef.update({
        ...formData,
      });

      setCurrentIndex((prevIndex) => prevIndex + 1);
      setFormData({});
    } catch (error) {
      alert(`Error on save - 😔`);
      console.log(error);
      setFormData({});
    }
  };

  // const handleImportFromJson = async () => {
  //   jsonChars.every(async (char) => {
  //     const exists = characters?.find(
  //       (item) => item.name?.toLowerCase() === char.name?.toLowerCase()
  //     );

  //     if (!exists) {
  //       try {
  //         await charactersRef.doc(`char-${char.name.trim()}`).set({
  //           id: uuid(),
  //           name: char.name,
  //           imageSrc: char.imageSrc,
  //           categories: [],
  //         });
  //       } catch (error) {
  //         console.log(`Error saving -> ${char.name}`, error);
  //         return false;
  //       }
  //     }
  //   });
  // };

  return (
    <Container>
      <Header>
        <h2>Edit Character</h2>
      </Header>

      {currentChar && (
        <CharItem
          key={currentChar.id}
          style={{ maxWidth: "44%", maxHeight: "50%" }}
        >
          <CharImg src={currentChar.imageSrc} alt={currentChar.name} />
          <CharName>{currentChar.name}</CharName>
        </CharItem>
      )}

      <Form onSubmit={handleSubmit}>
        <Label>Anime:</Label>
        <CreatableSelect
          options={animes}
          onChange={handleSelectChange}
          value={formData.anime || null}
        />

        <Label>Power</Label>
        <Input
          type="number"
          name="power"
          onChange={handleInputChange}
          value={formData.power || ""}
          autoComplete={false}
        />
        <CreateButton type="submit">Save</CreateButton>
        {/* 
        <CreateButton type="button" onClick={handleImportFromJson}>
          Import From Json
        </CreateButton> */}
      </Form>
    </Container>
  );
};

export default EditView;
