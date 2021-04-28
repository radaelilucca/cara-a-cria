import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImgIcon = styled.button`
  all: unset;
  margin-left: auto;

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
  grid-gap: 0.2rem;

  padding: 0 0.2rem;

  margin-top: 100px;
  margin-bottom: 1rem;

  grid-template-columns: repeat(2, 1fr);
  overflow: scroll;

  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.2rem;
  }

  @media (min-width: 764px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1.5rem;
  }

  @media (min-width: 1366px) {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1.6rem;
  }
`;

export const DetailChar = styled.div`
  background: #22253d;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;

  border-radius: 16px;
  border: 0;

  img {
    border-radius: 16px;
    border: 2px solid white;
    height: 280px;
  }

  @media (min-height: 500px) {
    img {
      height: 380px;
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
  height: 16rem;

  border: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  padding: 1rem;

  border-radius: 16px;

  @media (min-width: 764px) {
    width: 10rem;
    height: 16rem;
  }

  @media (min-width: 1366px) {
    max-width: 12rem;
    height: 18rem;
  }
`;

export const CharImg = styled.img`
  border-radius: 16px;
  height: 86%;

  @media (min-width: 500px) {
    height: 155px;
    max-width: 140px;
  }

  @media (min-width: 764px) {
    height: 185px;
  }

  @media (min-width: 1366px) {
    height: 185px;
  }
`;

export const CharName = styled.h3`
  font-family: "Roboto";

  color: ${({ checked }) => (checked ? "#22253d" : "white")};

  padding: 0;
  margin: 0;
  letter-spacing: 1.05px;

  font-size: 1rem;

  margin-top: 0.4rem;

  min-height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
`;
