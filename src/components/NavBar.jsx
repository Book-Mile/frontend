import React from 'react';
import styled from 'styled-components';
import NotifBell from './icons/NotifBell';
import LoginButton from './LGButton/LGButton'


const MainContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 16px 80px;
  background: ${props => props.theme.colors.background};

  * {
    box-sizing: border-box;
  }
`;

const LogoContainer = styled.div`
  font-weight: bold; 
`;

const NotifiContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 24px;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(images/profile.png);
  background-size: cover; 
  background-position: center; 
  border-radius: 50%; 
  margin-right: 8px;
  cursor: pointer;
`;

export default function NavBar() {
  return (
    <MainContainer>
      <LogoContainer>LOGO</LogoContainer>
      <LoginButton text="로그인" width="7.5rem"/>
      {//로그인 후 사용
      /*<NotifiContainer>
          <NotifBell/>
          <ProfileImage />
      </NotifiContainer>*/}
    </MainContainer>
  );
}
