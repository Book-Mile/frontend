import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useUserStore from '../../src/store/store.js';

const MainContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 16px 100px;
  background: white;

  * {
    box-sizing: border-box;
  }
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  font-weight: bold;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 20px;
`;

const LoginText = styled(Link)`
  color: ${(props) => props.theme.colors.main};
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 8px 16px;
  text-decoration: none;
  padding: 10px 30px;
  border-radius: 30px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SignUpLink = styled(Link)`
  background-color: ${(props) => props.theme.colors.main};
  color: white;
  border-radius: 30px;
  padding: 8px 16px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  padding: 10px 30px;

  &:hover {
    background-color: #961414;
  }
`;

export default function NavBar() {
  const { name, setName } = useUserStore();

  const handleLogout = () => {
    setName(null);
    sessionStorage.removeItem('userData');
  };

  return (
    <nav className="navbar">
      <MainContainer>
        <LogoContainer to="/">LOGO</LogoContainer>
        <LoginContainer>
          {/*임시로 로그인 관리를 위해 컨디셔널 렌더링 해둔 코드입니다*/}
          {name === null ? (
            <>
              <LoginText to="/login">로그인</LoginText>
              <SignUpLink to="/signup">회원가입</SignUpLink>
            </>
          ) : (
            <>
              {name} 님{' '}
              <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
                로그아웃
              </span>
            </>
          )}
        </LoginContainer>
        {
          //로그인 후 사용
          /*<NotifiContainer>
              <NotifBell/>
              <ProfileImage />
          </NotifiContainer>*/
        }
      </MainContainer>
    </nav>
  );
}
