import React, { useState } from 'react';
import styled from 'styled-components';

import LGButton from './components/LGButton/LGButton';

export default function Main() {
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
        <SignInLogo>Sign In to BookMile</SignInLogo>
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
            <LGButton text="Sign in" width="300px" />
          </Frame5>
          <Frame6>
            <ForgotPassword onClick={handleForgetPassword}>
              비밀번호를 잊어버리셨나요?
            </ForgotPassword>
            <Register onClick={handleSignUpButton}>회원가입</Register>
          </Frame6>
        </Frame1>
        <Frame7>
          <SnsLogin>SNS 계정으로 로그인 하기</SnsLogin>
          <Frame8>
            <Frame9>
              <Google />
            </Frame9>
            <FrameA>
              <KakaoTalkFill />
            </FrameA>
            <FrameB>
              <DuckIcon>
                <Vector />
              </DuckIcon>
            </FrameB>
          </Frame8>
        </Frame7>
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
  gap: 70px;
  position: relative;
  width: fit-content;
  padding: 60px 100px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 23px 51px rgba(138, 138, 138, 0.1);
`;

const SignInLogo = styled.span`
  align-self: stretch;
  height: 52px;
  color: #ab0909;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 36px;
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
  font-size: 20px;
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
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 17px;
`;

const ForgotPassword = styled.span`
  color: #565656;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 400;
`;

const Register = styled(ForgotPassword)`
  color: #ab0909;
`;

const Frame7 = styled(Frame1)`
  align-items: center;
`;

const SnsLogin = styled.span`
  width: 248px;
  height: 19px;
  color: #111111;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

const Frame8 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 345px;
  height: 64px;
`;

const Frame9 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 14px;
  border: 2px solid #d9d9d9;
  border-radius: 50px;
`;

const Google = styled.div`
  width: 100%;
  height: 100%;
  background: url(../assets/images/89fe60fb-15bf-4e00-beb7-58122a3a78c8.png)
    no-repeat center;
  background-size: cover;
`;

const FrameA = styled(Frame9)`
  background: #f7e600;
`;

const KakaoTalkFill = styled(Google)`
  background: url(../assets/images/56238878-185e-4e5f-8fe4-1e27582ed12e.png)
    no-repeat center;
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
