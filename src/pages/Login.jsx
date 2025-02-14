import { useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../../src/store/store.js';

import {
  PopupContainer,
  PopupInner,
} from '../../src/styled_components/popupStyle.jsx';

import LGButton from '../components/LGButton/LGButton';
import { login, socialLogin } from '../api/Pages/LoginRequest.jsx';

// import { ReactComponent as Google } from '../assets/snslogo/google.svg';
import googleLogo from '/src/assets/snslogo/google.svg';
import kakaoLogo from '/src/assets/snslogo/kakao.svg';
import naverLogo from '/src/assets/snslogo/naver.svg';
import { useNavigate } from 'react-router-dom';
import useClosePopupAnimation from '../hooks/useClosePopupAnimation.jsx';
import Cancel from '../assets/cancel.svg';

export default function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isClosing] = useState(false); // 닫힘 상태 관리

  const navigate = useNavigate();
  const { setName } = useUserStore();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    login(email, password, navigate, setName);
  };

  const handleSocial = (social) => {
    socialLogin(social); // 플랫폼별 로그인
  };

  //회원가입 버튼 눌렸을 때
  const handleSignUpButton = () => {
    navigate('/signup');
  };

  //비밀번호 찾기 버튼 눌렸을 때
  const handleForgetPassword = () => {
    alert('비밀번호 찾기 버튼 눌림');
  };

  const handleClose = () => {
    navigate('/');
  };
  const onClose = false;
  useClosePopupAnimation(isClosing, onClose);

  return (
    <PopupContainer>
      <PopupInner>
        <LoginWrapper>
          <LoginBox>
            <CloseButton src={Cancel} onClick={handleClose} />
            <LoginTitle>BookMille에 로그인</LoginTitle>
            <LoginForm>
              <InputWrapper>
                <InputLabel>이메일</InputLabel>
                <InputField
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>비밀번호</InputLabel>
                <PasswordField
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin();
                    }
                  }}
                />
              </InputWrapper>
              <ButtonWrapper>
                <LGButton text="Log in" width="345px" func={handleLogin} />
              </ButtonWrapper>
            </LoginForm>
            <SocialLoginWrapper>
              <SocialLoginText>SNS 계정으로 로그인 하기</SocialLoginText>
              <SocialLogins>
                <SocialLoginIcon>
                  <img
                    src={googleLogo}
                    alt="Google Logo"
                    onClick={() => handleSocial('google')}
                  />
                </SocialLoginIcon>
                <SocialLoginIcon style={{ background: '#f7e600' }}>
                  <img
                    src={kakaoLogo}
                    alt="Kakao Logo"
                    onClick={() => handleSocial('kakao')}
                  />
                </SocialLoginIcon>
                <SocialLoginIcon style={{ background: '#2db400' }}>
                  <img
                    src={naverLogo}
                    alt="Naver Logo"
                    onClick={() => handleSocial('naver')}
                  />
                </SocialLoginIcon>
              </SocialLogins>
            </SocialLoginWrapper>
            <OtherLinksWrapper>
              <ForgotPassword>
                아직 회원이 아니신가요?{' '}
                <SignUpButton onClick={handleSignUpButton}>
                  회원가입
                </SignUpButton>
              </ForgotPassword>
              <ForgotPassword>
                비밀번호를 잊어버리셨나요?{' '}
                <PasswordRecoveryButton onClick={handleForgetPassword}>
                  비밀번호 찾기
                </PasswordRecoveryButton>
              </ForgotPassword>
            </OtherLinksWrapper>
          </LoginBox>
        </LoginWrapper>
      </PopupInner>
    </PopupContainer>
  );
}

const LoginWrapper = styled.div`
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

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 35px;
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
`;

const LoginTitle = styled.span`
  align-self: stretch;
  height: 52px;
  color: ${(props) => props.theme.colors.main};
  font-size: 24px;
  font-weight: 700;
  line-height: 52px;
  text-align: left;
  white-space: nowrap;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: 350px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  width: 345px;
`;

const InputLabel = styled.span`
  width: 345px;
  height: 29px;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const InputField = styled.input`
  width: 345px;
  height: 49px;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

const PasswordField = styled(InputField)``;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 350px;
`;

const SocialLoginText = styled.span`
  width: 248px;
  height: 19px;
  color: #565656;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

const SocialLogins = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 345px;
  height: 64px;
`;

const SocialLoginIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 14px;
  border: 2px solid #d9d9d9;
  border-radius: 50%;
`;

const OtherLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 350px;
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

const SignUpButton = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
`;

const PasswordRecoveryButton = styled(SignUpButton)``;

const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
