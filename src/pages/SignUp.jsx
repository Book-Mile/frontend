import React, { useState } from 'react';
import styled from 'styled-components';

import LGButton from '../components/LGButton/LGButton';

export default function Login() {
  const [userid, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordconfirm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', userid);
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
        <SignInLogo>
          BookMile의
          <br />
          회원이 되고 싶으신가요?
        </SignInLogo>
        <Frame1>
          <Frame2>
            <Frame3>
              <IdInput>아이디</IdInput>
              <InputFrame>
                <Rectangle
                  type="text"
                  id="userid"
                  value={userid}
                  onChange={(e) => setUsername(e.target.value)}
                  width="none"
                />
                <LGButton
                  text="중복확인"
                  width="87px"
                  height="100%"
                  radius="10px"
                  fontSize="14px"
                ></LGButton>
              </InputFrame>
            </Frame3>
            <Frame3>
              <IdInput>닉네임</IdInput>
              <InputFrame>
                <Rectangle
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  width="none"
                />
                <LGButton
                  text="중복확인"
                  width="87px"
                  height="100%"
                  radius="10px"
                  fontSize="14px"
                ></LGButton>
              </InputFrame>
            </Frame3>
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
            <LGButton text="Sign in" width="345px" />
          </Frame5>
        </Frame1>
        <Frame6>
          <ForgotPassword onClick={handleForgetPassword}>
            이미 회원가입을 하셨나요?{' '}
            <Register onClick={handleSignUpButton}>로그인</Register>
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
  gap: 20px;
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

const Register = styled(ForgotPassword)`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: ${(props) => props.theme.colors.main};
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
