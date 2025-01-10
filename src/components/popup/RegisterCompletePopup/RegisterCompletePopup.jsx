import React, { useState, useEffect } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';

<<<<<<< Updated upstream
import Ok from '../../../assets/Alert/ok.svg';
=======
import Ok from '../../../assets/assets/ok.svg';
>>>>>>> Stashed changes

const PopUpInnerBox1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px 40px 60px;

  width: auto;
  height: auto;

  background: #ffffff;
  border-radius: 20px;
<<<<<<< Updated upstream
  position: relative;

  z-index: 10;
=======
>>>>>>> Stashed changes
`;
const Title = styled.div`
  /* 그룹 정보 */

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  color: ${(props) => props.theme.colors.main};
  font-style: normal;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

<<<<<<< Updated upstream
const BackRectangle = styled.div`
  display: flex;
  padding: 39px 53px;

  width: 50%;
  height: 50%;

  position: absolute;
  bottom: -20px; /* 컨테이너 아래로 20px 튀어나옴 */

  background: #ab0909;
  border-radius: 50px;

  z-index: 1;
`;

const PopUpInnerBox2 = styled.div`
  position: relative; /* 기준 컨테이너 설정 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const RegisterCompletePopup = ({ onClose = false }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
      // 조건이 만족되면 반복 종료
      if (seconds <= 1) {
        clearInterval(intervalId);
        setIsClosing(true);
      }
    }, 1000);
  });
=======
const RegisterCompletePopup = ({ onClose = false }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };
>>>>>>> Stashed changes

  useClosePopupAnimation(isClosing, onClose);

  return (
<<<<<<< Updated upstream
    <div>
      <PopupContainer isClosing={isClosing}>
        <PopupInner isClosing={isClosing}>
          <PopUpInnerBox2>
            <PopUpInnerBox1>
              <img src={Ok} alt="WarningIco" width="200px" height="200px" />
              <Title>저장 완료!</Title>
              <div>{seconds}초 뒤 창이 닫힙니다.</div>
            </PopUpInnerBox1>
            <BackRectangle />
          </PopUpInnerBox2>
        </PopupInner>
      </PopupContainer>
    </div>
=======
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <img src={Ok} alt="WarningIco" width="200px" height="200px" />
          <Title>저장 완료!</Title>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
>>>>>>> Stashed changes
  );
};

export default RegisterCompletePopup;
