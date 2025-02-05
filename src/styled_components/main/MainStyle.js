import styled from 'styled-components';

export const MainWrapper = styled.main`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: #f9f9f9;
`;

export const MainContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1155px;
  height: 100vh;
  margin: 0 auto;
  text-align: left;
  z-index: 2;

  @media screen and (min-width: 1920px) {
    padding: 0 10%;
  }
`;

export const Detail = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 120px;
`;