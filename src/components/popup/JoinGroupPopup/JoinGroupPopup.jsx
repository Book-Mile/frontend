import React, { useState } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';
import { handleOkClick } from '../../../api/Popup/JoinGroupPopupSubmit';
import { useErrorHandling } from '../../../hooks/useErrorHandling';

const PopUpInnerBox1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 80px;
  gap: 50px;

  width: 30%;
  height: auto;

  background: #ffffff;
  border-radius: 20px;
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
  justify-content: space-between;
`;

const JoinGroupPopup = ({
  title = '그룹명',
  subject = '페이지',
  onClose = false,
}) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리

  const { error, handleError } = useErrorHandling();

  const onOkClick = () => {
    handleOkClick(title, subject).catch((err) => {
      handleError(err);
    });
  };
  if (error) {
    throw error; // 렌더링 시 에러 발생
  }

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };
  useClosePopupAnimation(isClosing, onClose);

  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <Title>그룹 정보</Title>
          <Content>
            <span className="book-title">"{title}"</span>에 참여하시겠습니까?{' '}
            <br /> 방식 : {subject}
          </Content>
          <ButtonContainer>
            <ModalButtonCancel width="150px" onClick={handleClose} />
            <ModalButtonOk onClick={onOkClick} width="150px" />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
  );
};

export default JoinGroupPopup;
