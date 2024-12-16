import styled, { css } from 'styled-components';

const CheckPointRecordPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const BookImgContainer = styled.div`
  /* image */

  position: absolute;
  width: 200px;
  height: 250px;
  right: 20%;
  top: 169px;
  border: 1px solid black;
  background: url(image.png);
  filter: drop-shadow(19px 179px 72px rgba(0, 0, 0, 0.01))
    drop-shadow(10px 101px 61px rgba(0, 0, 0, 0.05))
    drop-shadow(5px 45px 45px rgba(0, 0, 0, 0.09))
    drop-shadow(1px 11px 25px rgba(0, 0, 0, 0.1));
`;

const BottomPresentContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ff6d6d;
  height: 30%;
`;

const RecordContainer = styled.div`
  display: flex;
  margin-top: 7%;
  height: 63%;
  width: 70%;
  background-color: yellow;
`;

export {
  CheckPointRecordPageContainer,
  BookImgContainer,
  BottomPresentContainer,
  RecordContainer,
};
