import React, { useState } from "react";

import Router from "next/router";

import {
  Container,
  Form,
  Label,
  Input,
  CreateButton,
  Group,
} from "../../styles/pages/create";
import CreatableSelect from "react-select/creatable";

import firebase from "firebase/app";

import "firebase/firestore";

import { firebaseConfig } from "../../config/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();

import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

import Header from "../../src/components/Header";

const CreateView = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    maxPlayers: "",
    maxCharacters: "",
    categories: [],
  });

  const charactersRef = firestore.collection("characters");

  const [characters] = useCollectionDataOnce(charactersRef);

  const handleMatchCreate = async (characters) => {
    setLoading(true);

    const matchesRef = firestore.collection("matches");
    const { maxPlayers, maxCharacters } = formData;

    const chars = characters
      .sort(() => Math.random() - 0.5)
      .slice(0, maxCharacters);

    const code = Math.floor(Math.random() * 10000);

    const newMatch = {
      chars,
      maxPlayers,
      maxCharacters,
      status: "waiting",
      players: [],
      code,
    };

    try {
      matchesRef.doc(`match-${code}`).set(newMatch);
      setLoading(false);

      Router.push(`/play/${newMatch.code}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMatchCreate(characters);
  };

  return (
    <Container>
      <Header>
        <h2>Create New Match</h2>
      </Header>

      {loading ? (
        <h2 style={{ color: "white" }}>Loading...</h2>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Group>
            <Group>
              <Label>Players</Label>
              <Input
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleFormChange}
              />
            </Group>
            <Group>
              <Label>Max. Characters</Label>
              <Input
                name="maxCharacters"
                value={formData.maxCharacters}
                onChange={handleFormChange}
                min={20}
              />
            </Group>
          </Group>

          <Label>Custom Decks</Label>
          <CreatableSelect />
          <CreateButton type="submit">Create</CreateButton>
        </Form>
      )}
    </Container>
  );
};

export default CreateView;
