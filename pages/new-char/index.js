import React, { useRef, useState } from "react";

import {
  Container,
  Form,
  Label,
  Input,
  CreateButton,
} from "../../styles/pages/new-char";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";

import CreatableSelect from "react-select/creatable";

import Header from "../../src/components/Header";
import uuid from "react-uuid";

import jsonChars from "../../anime-chars.json";

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
  firebase.app();
}

const CreateView = () => {
  const firestore = firebase.firestore();

  const [formData, setFormData] = useState({
    name: "",
    imageSrc: "",
    categories: [],
  });

  const categoriesRef = firestore.collection("categories");
  const query = categoriesRef;

  const [categories] = useCollectionData(query);

  const charactersRef = firestore.collection("characters");

  const [characters] = useCollectionData(charactersRef);

  const handleSelectChange = async (newValue) => {
    const newCategory = newValue[newValue.length - 1];

    const categoryId = uuid();

    setFormData((prev) => ({ ...formData, categories: newValue }));

    if (
      !newCategory ||
      categories.find((item) => item.value === newCategory.value)
    ) {
      return;
    }

    const { label, value } = newCategory;

    await categoriesRef.add({
      label,
      value,
      id: categoryId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
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

      // console.log({
      //   id: uuid(),
      //   name: formData.name,
      //   imageSrc: formData.imageSrc,
      //   categories: formData.categories.map((item) => item.id),
      //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      // });

      await charactersRef.add({
        id: uuid(),
        name: formData.name,
        imageSrc: formData.imageSrc,
        categories: formData.categories,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setFormData({
        name: "",
        imageSrc: "",
        categories: [],
      });

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } catch (error) {
      alert(error);
      setFormData({
        name: "",
        imageSrc: "",
        categories: [],
      });
    }
  };

  const nameInputRef = useRef(null);

  const handleImportFromJson = async () => {
    const { chars } = jsonChars;

    chars.forEach(async (char) => {
      const exists = characters?.find(
        (item) => item.name?.toLowerCase() === char.name?.toLowerCase()
      );

      if (!exists) {
        try {
          await charactersRef.add({
            id: uuid(),
            name: char.name,
            imageSrc: char.imgSrc,
            categories: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } catch (error) {
          console.log(`Error creating -> ${char.name}`);
        }
      }
    });

    alert("Chars imported successfully");
  };

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

        <Label>Categories</Label>
        <CreatableSelect
          options={categories}
          isMulti
          onChange={handleSelectChange}
          value={formData.categories}
        />
        <CreateButton type="submit">Create</CreateButton>

        <CreateButton type="button" onClick={handleImportFromJson}>
          Import From Json
        </CreateButton>
      </Form>
    </Container>
  );
};

export default CreateView;
