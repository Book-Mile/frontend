/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import LGButton from '../../LGButton/LGButton';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { SecessionUserPopupDelete } from '../../../api/Popup/SecessionUserPopupDelete';

const PopUpInnerBox1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px 60px 40px;
  gap: 40px;

  width: fit-content;
  height: fit-content;

  background: #ffffff;
  border-radius: 20px;

  .input_secession {
    box-sizing: border-box;

    width: 372px;
    height: 50px;

    border: 1px solid #bbbbbb;
    border-radius: 10px;
  }
`;
const Title = styled.div`
  /* 그룹 정보 */

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
  /* identical to box height */

  color: ${(props) => props.theme.colors.main};

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Content = styled.div`
  font-family: ${(props) => props.theme.font.main};
  font-size: 1rem;
  line-height: 35px;
  color: #4e202a;

  .red {
    color: ${(props) => props.theme.colors.main};
  }

  .red-bold {
    color: ${(props) => props.theme.colors.main};
    font-weight: 700;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const Circle = styled.div`
  /* Frame 52901 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;

  width: 30px;
  height: 30px;

  background-color: ${(props) => props.theme.colors.sub};
  border-radius: 50px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const InputBox = styled.div`
  Input {
    height: 40px;
    width: 372px;
    border: 1px solid #bbbbbb;
    border-radius: 10px;
    padding-left: 10px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 32px;
  }
`;

const SecessionUserPopup = ({ onClose = false }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  const [inputValue, setInputValue] = useState(''); // input 값 관리
  const { error, handleError } = useErrorHandling();
  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  const handleSubmit = () => {
    SecessionUserPopupDelete().catch((err) => {
      handleError(err);
    });
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  if (error) {
    throw error; // 렌더링 시 에러 발생
  }

  // input 값 변경 핸들러 추가
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useClosePopupAnimation(isClosing, onClose);

  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <Circle>
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8332 12.8333V19.8333M12.1665 12.8333V19.8333M7.49984 8.16667V22.1667C7.49984 22.7855 7.74567 23.379 8.18325 23.8166C8.62084 24.2542 9.21433 24.5 9.83317 24.5H19.1665C19.7853 24.5 20.3788 24.2542 20.8164 23.8166C21.254 23.379 21.4998 22.7855 21.4998 22.1667V8.16667M5.1665 8.16667H23.8332M8.6665 8.16667L10.9998 3.5H17.9998L20.3332 8.16667"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Circle>
          <Title>계정 삭제 요청</Title>
          <Content>
            계정 삭제 완료 시{' '}
            <span className="red">데이터가 삭제되며 복구할 수 없습니다.</span>
            <br /> 위 내용에 동의하실 경우 <br />
            입력창 내에 <span className="red-bold">‘탈퇴하겠습니다’</span> 를
            입력해주세요.
          </Content>
          <InputBox>
            <input
              placeholder="탈퇴하겠습니다"
              value={inputValue} // input 값 설정
              onChange={handleInputChange} // input 값 변경 핸들러 추가
            ></input>
          </InputBox>

          <ButtonContainer>
            <LGButton
              width="160px"
              height={'45px'}
              bgColor={'#FFF0F0'}
              text={'취소'}
              func={handleClose}
              fontSize="16px"
              fontWeight={'700'}
            />
            <LGButton
              width="160px"
              height={'45px'}
              textColor={inputValue === '탈퇴하겠습니다' ? '' : '#626262'}
              borderColor={inputValue === '탈퇴하겠습니다' ? '' : '#626262'}
              bgColor={inputValue === '탈퇴하겠습니다' ? '#FFF0F0' : '#E8E8E8'} // 조건부 색상 변경
              text={'회원탈퇴'}
              fontSize="16px"
              disabled={inputValue !== '탈퇴하겠습니다'} // 조건부 비활성화
              fontWeight={'700'}
              func={() => {
                if (inputValue === '탈퇴하겠습니다') {
                  handleSubmit(); // 회원 탈퇴 함수 호출
                }
              }}
            />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
  );
};

export default SecessionUserPopup;
