import styled, { keyframes } from 'styled-components';

const titleEffect = keyframes`
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

export const MainTitle = styled.h1`
  letter-spacing: -0.1em;
  font-size: 4rem;
  font-weight: 900;
  color: #ab0909;
  margin: 0;
  animation: ${titleEffect} 1s ease-out forwards;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
  animation: ${titleEffect} 1s ease-out forwards;
`;

export const Letter = styled(MainTitle)`
  animation: ${titleEffect} 1s ease-out forwards;
  font-size: 4rem;
  font-weight: bold;
  color: #ab0909;
`;
