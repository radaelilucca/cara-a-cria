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

export const Form = styled.form`
  width: 100%;
  max-width: 440px;

  padding: 1.2rem;

  background-color: #22253d;

  border-radius: 16px;

  display: flex;
  flex-direction: column;

  grid-gap: 1rem;

  @media (min-width: 400px) and (max-width: 813px) {
    max-height: 230px;
    padding: 1rem;
    grid-gap: 0.4em;
  }

  @media (min-width: 768px) and (min-height: 1024px) {
    max-height: 430px;
    padding: 1.5rem;
  }
`;

export const Label = styled.label`
  color: white;
  font-size: 1.1rem;
  letter-spacing: 1.1px;

  @media (min-width: 768px) and (min-height: 1024px) {
    font-size: 1.3rem;
  }
`;
export const Input = styled.input`
  height: 2rem;
  border-radius: 4px;
  border: none;
  background-color: #efefef;

  width: 4ch;

  font-size: 1.1rem;

  @media (min-width: 768px) and (min-height: 1024px) {
    font-size: 1.3rem;
  }

  text-align: center;

  &:disabled {
    background-color: #333;
  }
`;

export const FieldSet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) and (min-height: 1024px) {
    margin-bottom: 1rem;
  }
`;

export const CreateButton = styled.button`
  margin-top: 0.2rem;
  height: 2rem;

  @media (min-width: 400px) and (max-width: 813px) {
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) and (min-height: 1024px) {
    margin-top: 1rem;
  }

  font-size: 1.1rem;

  text-transform: uppercase;

  font-weight: bold;

  border: none;
  border-radius: 4px;

  color: #22253d;

  background-color: #efefef;
`;
