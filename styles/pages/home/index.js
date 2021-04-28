import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 50vw;

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
  height: 84px;
  width: 320px;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  background-color: #22253d;

  border: none;
  color: white;

  border-radius: 15px;
`;

export const JoinButton = styled.button`
  height: 84px;
  min-width: 320px;

  margin-top: 1rem;
  font-size: 1.5rem;

  background-color: #22253d;

  border: none;
  color: white;

  border-radius: 15px;
`;

export const JoinGameContainer = styled.div`
  min-width: 320px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
