import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';

const ImgContainer = styled.div`
  width: 700px; /* 너비를 고정 */
  flex-shrink: 0; /* 고정 너비를 유지하여 줄어들지 않도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: start;
`;

const ImagePopup = ({ onClose = false, src, alt }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  useClosePopupAnimation(isClosing, onClose);

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  return (
    <PopupContainer isClosing={isClosing} onClick={handleClose}>
      <PopupInner isClosing={isClosing} onClick={handleClose}>
        <ImgContainer>
          <img src={src} alt={alt} />
        </ImgContainer>
      </PopupInner>
    </PopupContainer>
  );
};

export default ImagePopup;
