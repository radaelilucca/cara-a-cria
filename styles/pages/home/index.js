import styled from "styled-components";

export const Container = styled.div`
  height: 60vh;
  width: 70vw;

  padding: 2rem;

  background: red;
  border-radius: 16px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
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
