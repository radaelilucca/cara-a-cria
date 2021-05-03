import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 64px;
  width: 100%;
  background-color: #22154d;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2.2rem 2rem;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  h2 {
    font-size: 1.25rem;
    color: black;

    font-family: "Roboto";
    font-weight: 600;

    color: white;
  }

  span {
    text-transform: uppercase;
  }
`;
