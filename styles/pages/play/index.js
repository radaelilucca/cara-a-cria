import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PlayerCharHeader = styled.div`
  display: flex;
`;

export const ImgIcon = styled.button`
  all: unset;
  margin-left: 1.2rem;
  svg {
    height: 1.5rem;
    width: 1.5rem;

    path {
      fill: white;
    }
  }

  @media (min-width: 1366px) {
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
`;

export const CharsContainer = styled.div`
  display: grid;
  grid-gap: 0.4rem;
  position: relative;

  padding: 0 0.5rem;

  margin-top: 80px;

  margin-bottom: 80px;

  grid-template-columns: repeat(2, 1fr);
  overflow-y: scroll;

  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 764px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1366px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const ActionButtons = styled.div`
  position: fixed;
  bottom: 0;

  height: 64px;

  background-color: #22154d;

  z-index: 100;

  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    background-color: white;

    &:disabled {
      filter: brightness(0.6);
    }

    width: 46%;
    height: 60%;

    margin: 0;
    padding: 0;

    border: 1px solid white;
    border-radius: 8px;

    color: black;

    text-transform: uppercase;
  }

  @media (min-width: 500px) {
    background: transparent;

    margin-right: 3rem;
    bottom: 0.5rem;
    justify-content: flex-end;

    button {
      font-size: 1.3rem;
      width: 25%;
      padding: 1rem 1rem;
      height: 64px;

      &:last-child {
        margin-left: 0.6rem;
      }
    }
  }
`;

export const DetailChar = styled.div`
  background: #22253d;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;

  border-radius: 16px;
  border: 0;

  img {
    border-radius: 16px;
    border: 2px solid white;
    height: 280px;
  }

  @media (min-height: 500px) and (min-width: 764px) {
    padding: 1.5rem;

    img {
      height: 380px;
    }
  }

  @media (min-height: 500px) and (min-width: 1024px) {
    img {
      height: 450px;
    }
  }

  @media (min-height: 500px) and (min-width: 1366px) {
    padding: 2rem;

    img {
      height: 540px;
    }
  }

  h3 {
    font-family: "Roboto";

    color: white;
    padding: 0;
    margin: 0;

    font-size: 1.4rem;
    margin-top: 0.5rem;
    min-height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CharItem = styled.button`
  background: #22253d;

  width: 100%;
  height: 100%;

  border: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  padding: 1.2rem;

  border-radius: 16px;
`;

export const CharImg = styled.img`
  border-radius: 16px;
  height: 90%;
  max-width: 90%;
`;

export const CharName = styled.h3`
  font-family: "Roboto";

  color: ${({ checked }) => (checked ? "#22253d" : "white")};

  padding: 0;
  margin: 0;
  letter-spacing: 1.05px;

  font-size: 1rem;

  margin-top: 1rem;

  min-height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
`;
