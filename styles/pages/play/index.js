import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.div`
  height: 64px;
  width: 100%;
  background-color: #22154d;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 2.2rem 2rem;

  position: fixed;
  top: 0;

  h2 {
    font-size: 1.4rem;
    color: black;

    font-family: "Roboto";
    font-weight: 600;

    color: white;
  }
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
`;

export const CharImg = styled.img`
  border-radius: 16px;
  height: 135px;
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
