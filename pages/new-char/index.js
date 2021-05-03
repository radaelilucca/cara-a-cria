import React, { useContext, useRef, useState } from "react";

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
import uuid from "react-uuid";

import jsonChars from "../../anime-chars.json";
import { AuthContext } from "../../context/auth";

const CreateView = () => {
  const { firestore } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    imageSrc: "",
  });

  const animesRef = firestore.collection("animes");
  const [animes] = useCollectionData(animesRef);

  const categoriesRef = firestore.collection("categories");
  const query = categoriesRef;

  const [categories] = useCollectionDataOnce(query);

  const charactersRef = firestore.collection("charactersV2");

  const [characters] = useCollectionDataOnce(charactersRef);

  const handleSelectChange = async (newValue) => {
    const anime = {
      value: newValue?.value?.replace(/([\s])/g, "_"),
      label: newValue?.label?.replace(/([\s])/g, "_"),
      id: uuid(),
    };

    setFormData((prev) => ({
      ...prev,
      anime,
    }));

    if (!animes.find((item) => item.value === anime.value)) {
      const { label, value, id } = anime;

      animesRef.doc(anime.label).set({ label, value, id });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const exists = characters.find(
        (item) => item.name?.toLowerCase() === formData.name?.toLowerCase()
      );

      if (exists) {
        throw new Error("This char already exists");
      }

      const newChar = {
        id: uuid(),
        name: formData.name,
        imageSrc: formData.imageSrc,
        anime: formData.anime,
        power: formData.power,
      };

      await charactersRef
        .doc(`char-${formData.name.toUpperCase()}`)
        .set(newChar);

      setFormData({
        name: "",
        imageSrc: "",
        anime: "",
      });

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } catch (error) {
      alert(error);
      setFormData({
        name: "",
        imageSrc: "",
        anime: "",
      });
    }
  };

  const nameInputRef = useRef(null);

  // const handleImportFromJson = async () => {
  //   const { chars } = jsonChars;

  //   chars.forEach(async (char) => {
  //     const exists = characters?.find(
  //       (item) => item.name?.toLowerCase() === char.name?.toLowerCase()
  //     );

  //     if (!exists) {
  //       try {
  //         await charactersRef.add({
  //           id: uuid(),
  //           name: char.name,
  //           imageSrc: char.imgSrc,
  //           categories: [],
  //         });
  //       } catch (error) {
  //         console.log(`Error creating -> ${char.name}`);
  //       }
  //     }
  //   });

  //   alert("Chars imported successfully");
  // };

  return (
    <Container>
      <Header>
        <h2>Create New Character</h2>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Label>Character Name</Label>
        <Input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          required
          autoComplete={false}
          autoFocus
          ref={nameInputRef}
        />

        <Label>Image Link (SRC)</Label>
        <Input
          type="text"
          name="imageSrc"
          value={formData.imageSrc}
          onChange={handleInputChange}
          required
          autoComplete={false}
        />

        <Label>Anime</Label>
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
        <CreateButton type="submit">Create</CreateButton>

        {/* <CreateButton type="button" onClick={handleImportFromJson} disabled>
          Import From Json
        </CreateButton> */}
      </Form>
    </Container>
  );
};

export default CreateView;
