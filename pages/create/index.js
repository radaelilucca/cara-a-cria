import React from "react";

import {
  Container,
  Form,
  Label,
  Input,
  CreateButton,
} from "../../styles/pages/create";

import Header from "../../src/components/Header";

const CreateView = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Header>
        <h2>Create New Match</h2>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Label>Maximum players</Label>
        <Input type="number" />

        <Label>Maximum Characters</Label>
        <Input type="number" />

        <Label>Custom Decks Selection</Label>
        <Input disabled />

        <CreateButton type="submit">Create</CreateButton>
      </Form>
    </Container>
  );
};

export default CreateView;
