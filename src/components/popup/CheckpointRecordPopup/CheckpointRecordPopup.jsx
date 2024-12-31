import React, { useState, useEffect } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';

const PopUpInnerBox1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px 40px 60px;
  gap: 40px;

  width: auto;
  height: auto;

  background: #ffffff;
  border-radius: 20px;
`;
const Title = styled.div`
  display: flex;
  width: 100%;

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  color: ${(props) => props.theme.colors.main};
  font-style: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 345px;
`;

const InputTitle = styled.span`
  width: 345px;
  height: 29px;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const Rectangle = styled.input`
  width: ${(props) => props.width || '345px'};
  height: ${(props) => props.height || '40px'};
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  flex-grow: 1;
  box-sizing: border-box;

  font-style: normal;
  font-weight: 350;
  line-height: 14px;

  color: #565656;
  padding: 10px;
`;

const CheckpointRecordPopup = ({ onClose = false }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  const [page, setPage] = useState(''); // 닫힘 상태 관리

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  useClosePopupAnimation(isClosing, onClose);

  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <Title>체크포인트 기록하기</Title>
          <ContentFrame>
            <InputTitle>현재 페이지수</InputTitle>
            <Rectangle
              type="input"
              id="page"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            />
            <InputTitle>내용</InputTitle>
            <Rectangle
              as="textarea"
              id="page"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              height="150px"
              placeholder="130자 이내로 입력해주세요."
              style={{
                textAlign: 'left',
                verticalAlign: 'top',
                resize: 'none', // 크기 조정 비활성화
              }}
            />
          </ContentFrame>
          <ButtonContainer>
            <ModalButtonCancel width="150px" onClick={handleClose} />
            <ModalButtonOk width="150px" />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
  );
};

export default CheckpointRecordPopup;
