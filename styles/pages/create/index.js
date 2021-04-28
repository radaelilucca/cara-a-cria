import styled from "styled-components";

export const Container = styled.div`
  height: 80vh;
  width: 80vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 100px;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 440px;

  padding: 1.2rem;

  background-color: #22253d;

  border-radius: 16px;

  display: flex;
  flex-direction: column;

  grid-gap: 1rem;
`;

export const Label = styled.label`
  color: white;
  font-size: 1.1rem;
  letter-spacing: 1.1px;
`;
export const Input = styled.input`
  height: 2rem;
  border-radius: 4px;
  border: none;
  background-color: #efefef;

  width: 25%;
  margin-left: auto;
  margin-right: 1rem;

  font-size: 1.1rem;

  &:disabled {
    background-color: #333;
  }
`;

export const CreateButton = styled.button`
  margin-top: 0.2rem;
  height: 2rem;

  font-size: 1.1rem;

  text-transform: uppercase;

  font-weight: bold;

  border: none;
  border-radius: 4px;

  color: #22253d;

  background-color: #efefef;
`;
