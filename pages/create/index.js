import React, { useContext, useState } from "react";

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

import Header from "../../src/components/Header";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { AuthContext } from "../../context/auth";

const CreateView = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    maxPlayers: "2",
    maxCharacters: "50",
    categories: [],
  });

  const { firestore } = useContext(AuthContext);

  const charactersRef = firestore.collection("characters");
  const matchesRef = firestore.collection("matches");

  const [characters] = useCollectionDataOnce(charactersRef);

  const handleMatchCreate = async (characters) => {
    if (!characters) return;
    setLoading(true);

    const maxCharacters = Number(formData.maxCharacters);
    const maxPlayers = Number(formData.maxPlayers);

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    };

    const totalCharsCount = characters.length - 1;
    const halfOfTotalChars = totalCharsCount / 2;

    const chars1 = characters.slice(0, halfOfTotalChars);
    const chars2 = characters.slice(halfOfTotalChars, totalCharsCount + 1);

    const sortedChars1 = shuffleArray(chars1).slice(0, maxCharacters / 2);
    const sortedChars2 = shuffleArray(chars2).slice(
      maxCharacters / 2,
      maxCharacters
    );

    const chars = [...sortedChars2, ...sortedChars1];

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
