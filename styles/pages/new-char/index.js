import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 640px;

  padding: 2rem;

  background-color: #22253d;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Label = styled.label`
  color: white;

  margin-bottom: 0.4rem;

  font-size: 1.2rem;
  line-height: 1.5rem;
  letter-spacing: 1.1px;
`;
export const Input = styled.input`
  margin-bottom: 1rem;

  height: 2.5rem;
  border-radius: 4px;
  border: none;
  background-color: #efefef;

  font-size: 1.2rem;

  &:disabled {
    background-color: #333;
  }
`;

export const CreateButton = styled.button`
  margin-top: 1rem;
  height: 2.5rem;

  font-size: 1.2rem;

  text-transform: uppercase;

  font-weight: bold;

  border: none;
  border-radius: 4px;

  color: #22253d;

  background-color: #efefef;
`;
