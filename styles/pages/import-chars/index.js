import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  margin-top: 200px;

  overflow-x: hidden;

  label {
    color: white;
    margin-right: 1.8rem;

    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  label,
  input {
    font-size: 1.2rem;
  }

  input {
    background: #41414d;
    color: white;
    border: 1px solid #eee;

    padding: 0.5rem;

    border-radius: 12px;
  }

  button {
    margin-left: 1.4rem;

    padding: 0.5rem;

    font-size: 1.2rem;
    background: #eee;
    border: 1px solid #41414d;

    color: #41414d;

    font-weight: bold;

    border-radius: 12px;
  }
`;

export const CharsContainer = styled.div`
  h5 {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const Chars = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;

  list-style: none;

  padding: 0;

  button {
    cursor: pointer;
  }

  li {
    color: white;
    font-size: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
    }
  }
`;

export const ImportModal = styled.div`
  background-color: black;

  color: white;

  display: flex;
  flex-direction: column;

  padding: 1rem;

  border-radius: 1rem;

  width: 18vw;

  form {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    input {
      background: #41414d;
      color: white;
      border: 1px solid #eee;

      padding: 0.5rem;

      border-radius: 12px;
      margin-bottom: 1.4rem;
    }

    label,
    input,
    button {
      font-size: 1.3rem;
      color: white;
    }

    button {
      border: 1px solid #eee;

      padding: 0.5rem;

      border-radius: 12px;
      margin-bottom: 1.4rem;
      background: white;
      color: #41414d;
      font-weight: bold;
    }
  }
`;
