import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const ImgIcon = styled.button`
  all: unset;
  margin-left: auto;

  svg {
    height: 2rem;
    width: 2rem;

    path {
      fill: white;
    }
  }
`;

export const CharsContainer = styled.div`
  display: grid;

  margin: 200px 0;
  padding: 0 1rem;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  max-height: calc(100vh - 20px);

  overflow: scroll;

  @media (min-width: 764px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1.5rem;
  }

  @media (min-width: 1366px) {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1.8rem;
  }
`;

export const PlayerChar = styled.div`
  background: #22253d;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.5rem;

  border-radius: 16px;
  border: 0;

  img {
    border-radius: 16px;
    border: 2px solid white;
    height: 324px;
  }

  h3 {
    font-family: "Bangers";
    color: ${({ checked }) => (checked ? "#22253d" : "white")};
    padding: 0;
    margin: 0;
    letter-spacing: 1.5px;
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

export const CharItem = styled.button`
  background: ${({ checked }) => (checked ? "#EF494B" : "#22253d")};

  max-width: 8rem;

  border: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  padding: 1rem;

  border-radius: 16px;

  @media (min-width: 764px) {
    max-width: 10rem;
  }

  @media (min-width: 1366px) {
    max-width: 12rem;
  }
`;

export const CharImg = styled.img`
  border-radius: 16px;
  height: 135px;

  @media (min-width: 764px) {
    height: 155px;
  }

  @media (min-width: 1366px) {
    height: 185px;
  }
`;

export const CharName = styled.h3`
  font-family: "Bangers";

  color: ${({ checked }) => (checked ? "#22253d" : "white")};

  padding: 0;
  margin: 0;
  letter-spacing: 1.5px;

  font-size: 1.3rem;

  margin-top: 1rem;
`;
