import React, { useState, useEffect } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';

import Warning from '../../../assets/Alert/warning.svg';

const PopUpInnerBox1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px 40px 60px;
  gap: 50px;

  width: auto;
  height: auto;

  background: #ffffff;
  border-radius: 20px;
`;
const Title = styled.div`
  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: ${(props) => props.theme.colors.main};
  font-style: normal;
`;

const Content = styled.div`
  font-family: ${(props) => props.theme.font.main};
  font-size: 1rem;
  line-height: 35px;
  color: black;
  .book-title {
    font-weight: 800;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const EndGroupPopup = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(true), 300);
  };

  useClosePopupAnimation(isClosing, onClose);

  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <Title>그룹을 종료하시겠습니까?</Title>
          <img src={Warning} alt="WarningIco" width="200px" height="200px" />
          <ButtonContainer>
            <ModalButtonCancel width="150px" onClick={handleClose} />
            <ModalButtonOk width="150px" />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
  );
};

export default EndGroupPopup;
