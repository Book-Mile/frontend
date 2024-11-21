import React, { useState } from 'react';
import styled from 'styled-components';

import LGButton from '../components/LGButton/LGButton';

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
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 70px;
  position: relative;
  width: fit-content;
  padding: 60px 100px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 23px 51px 0 rgba(138, 138, 138, 0.1);
`;

const SignUp1 = styled.span`
  align-self: stretch;
  height: 52px;
  color: #ab0909;
  font-family:
    Noto Sans KR,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 52px;
  text-align: left;
  z-index: 1;
`;

const Frame2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 40px;
  position: relative;
  width: 350px;
  z-index: 2;
`;

const Frame3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  position: relative;
  width: 345px;
  z-index: 3;
`;

const Frame4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  width: 345px;
  z-index: 4;
`;

const Id = styled.span`
  width: 345px;
  height: 29px;
  color: #000000;
  font-family:
    Noto Sans KR,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
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

const Frame5 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  width: 345px;
`;

const Password = styled.span`
  width: 345px;
  height: 29px;
  color: #000000;
  font-family:
    Noto Sans KR,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const Rectangle6 = styled.input`
  width: 345px;
  height: 49px;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

const Frame7 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  width: 345px;
`;

const PasswordConfirm = styled.span`
  width: 345px;
  height: 29px;
  color: #000000;
  font-family:
    Noto Sans KR,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const Rectangle8 = styled.input`
  width: 345px;
  height: 49px;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 43px;
  padding: 10px;
  cursor: pointer;
  background: transparent;
  border: 2px solid #ab0909;
  border-radius: 30px;
`;

const SignIn = styled.span`
  position: absolute;
  width: 64px;
  height: 29px;
  top: 4px;
  left: 138px;
  color: #ab0909;
  font-family:
    Noto Sans KR,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 28.96px;
  text-align: left;
`;

const Frame6 = styled.div`
  display: flex;
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  width: 100%;
`;

const Frame9 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 17px;
`;

const AlreadySignedUp = styled.span`
  width: 183px;
  height: 17px;
  color: #565656;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 17px;
`;

const Login = styled.span`
  width: 60px;
  height: 17px;
  color: #ab0909;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Ubuntu,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft Yahei UI',
    'Microsoft Yahei',
    'Source Han Sans CN',
    sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 17px;
`;

export default function Main() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, seetConfirmPassword] = useState('');

  const handleSignUpButton = () => {
    alert('회원가입 버튼 눌림');
  };

  const handleLoginButton = () => {
    alert('로그인 버튼 눌림');
  };

  return (
    <MainContainer>
      <Frame>
        <SignUp1>회원가입</SignUp1>
        <Frame2>
          <Frame3>
            <Frame4>
              <Id>아이디</Id>
              <Rectangle
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
              />{' '}
            </Frame4>
            <Frame5>
              <Password>비밀번호</Password>
              <Rectangle6
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </Frame5>
            <Frame7>
              <PasswordConfirm>비밀번호 확인</PasswordConfirm>
              <Rectangle8
                type="password"
                id="password"
                value={confirmpassword}
                onChange={(e) => seetConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
              />
            </Frame7>
          </Frame3>
          <Frame6 onClick={handleSignUpButton}>
            <LGButton text="Sign In" width="300px" />
          </Frame6>
          <Frame9>
            <AlreadySignedUp>이미 회원가입을 하셨나요?</AlreadySignedUp>
            <Login onClick={handleLoginButton}>로그인</Login>
          </Frame9>
        </Frame2>
      </Frame>
    </MainContainer>
  );
}
