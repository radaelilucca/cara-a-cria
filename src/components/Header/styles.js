import styled from "styled-components";

export const HeaderContainer = styled.div`
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

  h2,
  span {
    font-size: 1.3rem;
    color: black;

    font-family: "Roboto";
    font-weight: 600;

    color: white;
  }

  span {
    text-transform: uppercase;
  }
`;
