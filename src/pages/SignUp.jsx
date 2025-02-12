import { useState } from 'react';
import styled from 'styled-components';
import { validatePassword } from '../utils/publicFunctions.js';
import Cancel from '../assets/cancel.svg';

import {
  registerUser,
  emailRequest,
  checkEmailVerification,
} from '../api/Pages/SignUpRequest.jsx';
import {
  PopupContainer,
  PopupInner,
} from '../../src/styled_components/popupStyle.jsx';

import LGButton from '../components/LGButton/LGButton';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSented, setIsSented] = useState(false);
  const [authNum, setAuthNum] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordconfirm] = useState('');

  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리

  const handleSubmit = () => {
    // event.preventDefault();
    // console.log('Email:', email);
    // console.log('Password:', password);
    if (!isAuthed) {
      if (validatePassword(password)) {
        registerUser(email, password, passwordconfirm, navigate());
      } else {
        alert(
          '비밀번호는 8~16자의 영문 대소문자, 숫자, 특수문자로 이루어져야 합니다.',
        );
      }
    } else {
      alert('이메일 인증을 해주세요.');
    }
    // alert('회원가입이 정상적으로 되었습니다.');
  };

  const handleLoginButton = () => {
    navigate('/login');
  };

  function isValidEmail(email) {
    // 이메일 형식 검증을 위한 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSendAuthBtn = () => {
    if (isValidEmail(email)) {
      console.log('유효한 이메일 형식입니다.');
      emailRequest(email);
      setIsSented(true);
    } else {
      alert('유효하지 않은 이메일 형식입니다.');
    }
  };

  const checkAuthNum = () => {
    if (authNum.length === 6) {
      checkEmailVerification(email, authNum, setIsAuthed);
    } else {
      alert('인증번호는 6자리입니다.');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <PopupContainer>
      <PopupInner>
        <MainContainer>
          <Frame>
            <CloseBtn src={Cancel} onClick={handleClose} />

            <SignInLogo>
              BookMille의
              <br />
              회원이 되고 싶으신가요?
            </SignInLogo>
            <Frame1>
              <Frame2>
                <Frame3>
                  <IdInput>이메일</IdInput>
                  <InputFrame>
                    <Rectangle
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      width="none"
                    />
                    <LGButton
                      text="인증번호 전송"
                      width="87px"
                      height="40px"
                      radius="10px"
                      fontSize="14px"
                      func={handleSendAuthBtn}
                    ></LGButton>
                  </InputFrame>
                </Frame3>
                {isSented && (
                  <Frame3>
                    <IdInput>인증번호</IdInput>
                    <InputFrame>
                      <Rectangle
                        type="text"
                        id="authNum"
                        value={authNum}
                        onChange={(e) => setAuthNum(e.target.value)}
                        width="none"
                      />
                      <LGButton
                        text="확인"
                        width="87px"
                        height="40px"
                        radius="10px"
                        fontSize="14px"
                        func={checkAuthNum}
                      ></LGButton>
                    </InputFrame>
                  </Frame3>
                )}

                <Frame4>
                  <PasswordInput>비밀번호</PasswordInput>
                  <Rectangle5
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Frame4>
                <Frame4>
                  <PasswordInput>비밀번호 확인</PasswordInput>
                  <Rectangle5
                    type="password"
                    id="passwordconfirm"
                    value={passwordconfirm}
                    onChange={(e) => setPasswordconfirm(e.target.value)}
                  />
                </Frame4>
              </Frame2>
              <Frame5>
                <LGButton text="Sign Up" width="345px" func={handleSubmit} />
              </Frame5>
            </Frame1>
            <Frame6>
              <ForgotPassword>
                이미 회원가입을 하셨나요?{' '}
                <SmallButton onClick={handleLoginButton}>로그인</SmallButton>
              </ForgotPassword>
            </Frame6>
          </Frame>
        </MainContainer>
      </PopupInner>
    </PopupContainer>
  );
}

const MainContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  position: relative;
  width: fit-content;
  padding: 60px 80px;
  background: #ffffff;
  box-shadow:
    0px 369px 148px rgba(138, 138, 138, 0.01),
    0px 207px 124px rgba(138, 138, 138, 0.05),
    0px 92px 92px rgba(138, 138, 138, 0.09),
    0px 23px 51px rgba(138, 138, 138, 0.1);
  border-radius: 30px;
  z-index: 1000;
`;

const SignInLogo = styled.span`
  align-self: stretch;
  height: 52px;
  color: ${(props) => props.theme.colors.main};
  font-size: 24px;
  font-weight: 700;
  line-height: 35px;
  text-align: left;
  white-space: nowrap;
`;

const Frame1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: 350px;
`;

const Frame2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 345px;
`;

const Frame3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 345px;
`;

const IdInput = styled.span`
  width: 345px;
  height: 29px;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const InputFrame = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const Rectangle = styled.input`
  width: ${(props) => props.width || '345px'};
  height: 40px;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  flex-grow: 1;
  box-sizing: border-box;
`;

const Frame4 = styled(Frame3)``;

const PasswordInput = styled(IdInput)``;

const Rectangle5 = styled(Rectangle)``;

const Frame5 = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬 */
  width: 100%; /* 부모 너비를 차지하도록 설정 */
`;

const Frame6 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  height: 17px;
`;

const ForgotPassword = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #565656;
`;

const SmallButton = styled(ForgotPassword)`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: ${(props) => props.theme.colors.main};

  cursor: pointer;
`;

const CloseBtn = styled.img`
  position: absolute;
  top: 20px; /* 위쪽에서 10px */
  right: 20px; /* 오른쪽에서 10px */
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
