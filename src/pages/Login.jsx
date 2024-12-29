import React, { useState } from 'react';
import styled from 'styled-components';

import LGButton from '../components/LGButton/LGButton';

// import { ReactComponent as Google } from '../assets/snslogo/google.svg';
import googleLogo from '/src/assets/snslogo/google.svg';
import kakaoLogo from '/src/assets/snslogo/kakao.svg';
import naverLogo from '/src/assets/snslogo/naver.svg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleSignUpButton = () => {
    alert('회원가입 버튼 눌림');
  };

  const handleForgetPassword = () => {
    alert('비밀번호 찾기 버튼 눌림');
  };

  return (
    <MainContainer>
      <Frame>
        <SignInLogo>로그인</SignInLogo>
        <Frame1>
          <Frame2>
            <Frame3>
              <IdInput>아이디</IdInput>
              <Rectangle
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
            </Frame3>
            <Frame4>
              <PasswordInput>비밀번호</PasswordInput>
              <Rectangle5
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </Frame4>
          </Frame2>
          <Frame5>
            <LGButton text="Sign in" width="345px" />
          </Frame5>
        </Frame1>
        <Frame7>
          <SnsLogin>SNS 계정으로 로그인 하기</SnsLogin>
          <Frame8>
            <Frame9>
              <img src={googleLogo} alt="Google Logo" />
            </Frame9>
            <FrameA>
              <img src={kakaoLogo} alt="Kakao Logo" />
            </FrameA>
            <FrameB>
              <img src={naverLogo} alt="Naver Logo" />
            </FrameB>
          </Frame8>
        </Frame7>
        <Frame6>
          <ForgotPassword onClick={handleForgetPassword}>
            아직 회원이 아니신가요?{' '}
            <Register onClick={handleSignUpButton}>회원가입</Register>
          </ForgotPassword>
          <ForgotPassword onClick={handleForgetPassword}>
            비밀번호를 잊어버리셨나요?{' '}
            <Register onClick={handleSignUpButton}>비밀번호 찾기</Register>
          </ForgotPassword>
        </Frame6>
      </Frame>
    </MainContainer>
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
  background: #fafafa;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px;
  position: relative;
  width: fit-content;
  padding: 60px 100px;
  background: #ffffff;
  box-shadow:
    0px 369px 148px rgba(138, 138, 138, 0.01),
    0px 207px 124px rgba(138, 138, 138, 0.05),
    0px 92px 92px rgba(138, 138, 138, 0.09),
    0px 23px 51px rgba(138, 138, 138, 0.1);
  border-radius: 30px;
`;

const SignInLogo = styled.span`
  align-self: stretch;
  height: 52px;
  color: #ab0909;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 52px;
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
  gap: 30px;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const Rectangle = styled.input`
  width: 345px;
  height: 49px;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
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

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #565656;
`;

const Register = styled(ForgotPassword)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #ab0909;
`;

const Frame7 = styled(Frame1)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SnsLogin = styled.span`
  width: 248px;
  height: 19px;
  color: #565656;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

const Frame8 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 345px;
  height: 64px;
`;

const Frame9 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 14px;
  border: 2px solid #d9d9d9;
  border-radius: 50px;
`;

const FrameA = styled(Frame9)`
  background: #f7e600;
`;

const FrameB = styled(FrameA)`
  background: #2db400;
`;

const DuckIcon = styled.div`
  width: 100%;
  height: 100%;
`;

const Vector = styled.div`
  width: 100%;
  height: 100%;
  background: url(../assets/images/7cfbe015-4f3f-419e-9c35-e8b967d3e511.png)
    no-repeat center;
  background-size: cover;
`;
