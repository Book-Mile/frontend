import React, { useState } from 'react';
import {
  PopupContainer,
  PopupInner,
  Rightpopup_oneLabel,
  Rightpopup_oneInput,
  ErrorMessageEmpty,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';
import { handleOkClick } from '../../../api/Popup/JoinGroupPopupSubmit';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import makingGroupForm from '../../../hooks/makingGroupForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: ${(props) => props.theme.colors.main};
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  font-family: ${(props) => props.theme.font.main};
  font-size: 1rem;
  line-height: 35px;
  color: black;
  width: 100%;
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
  password = false,
  onClose = false,
  id = 1,
}) => {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // 에러 메시지 상태
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  const { error, handleError } = useErrorHandling();
  const { groupData, setPassword } = makingGroupForm();

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleConfirm = () => {
    let errorCheck = 0;

    if (password && !groupData.password) {
      setPasswordErrorMessage('비밀번호를 입력하세요.');
      errorCheck = 1;
    }

    if (errorCheck == 1) {
      return;
    }

    setPasswordErrorMessage('');
    handleOkClick(id, groupData.password)
      .then(() => {
        // Redirect to /lobby on successful confirmation
        navigate('/lobby');
      })
      .catch((err) => {
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
            <div style={{ marginBottom: '10%' }} />
            {/* 비밀번호 설정 */}
            {password && (
              <>
                <Rightpopup_oneLabel>비밀번호</Rightpopup_oneLabel>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5%',
                  }}
                >
                  <Rightpopup_oneInput
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* 에러 메시지 출력 */}
                <ErrorMessageEmpty>{passwordErrorMessage}</ErrorMessageEmpty>
              </>
            )}
          </Content>
          <ButtonContainer>
            <ModalButtonCancel width="120px" onClick={handleClose} />
            <ModalButtonOk onClick={handleConfirm} width="120px" />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
  );
};

export default JoinGroupPopup;
