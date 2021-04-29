import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  padding: 2rem;

  border-radius: 16px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  margin-top: 64px;
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

export const NavButton = styled.button`
  height: 54px;
  min-width: 200px;

  font-size: 1.3rem;

  background-color: #efefef;
  border: none;
  border-radius: 12px;

  margin-bottom: 1.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LinkButton = styled.button`
  margin-bottom: 1rem;
  font-size: 1.4rem;

  padding: 0.8rem;
  width: 100%;

  background-color: #22253d;

  border: none;
  color: white;

  border-radius: 15px;
`;

export const JoinGameContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  section {
    display: flex;

    label {
      color: white;
      width: 70%;

      font-size: 1.2rem;
    }
    input {
      width: 25%;
      font-size: 1.2rem;

      text-align: center;
    }
  }
`;

export const JoinButton = styled.button`
  margin-top: 1rem;
  font-size: 1.4rem;
  padding: 0.8rem;
  width: 100%;

  align-self: center;

  background-color: #22253d;

  border: none;
  color: white;

  border-radius: 15px;

  &:disabled {
    filter: brightness(0.7);
  }
`;
