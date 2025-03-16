/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient.jsx';
import useUserStore from '../../src/store/store.js';
import { handleLogout } from '/src/utils/publicFunctions.js';
// import NotifBell from './icons/NotifBell.jsx';
import Cookies from 'js-cookie';

export default function NavBar() {
  const { name, setName } = useUserStore();
  const location = useLocation();
  
  const [userInfo, setUserInfo] = useState(null);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (name !== null) {
      apiClient.get('/users')
        .then(response => {
          setUserInfo(response.data.response);
        })
        .catch(error => {
          console.error('사용자 정보 가져오기 실패:', error);
        });
    }
  }, [name]);

  // 빈 곳을 클릭하면 드롭다운을 닫는 처리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsProfileDropdownVisible(false); 
  }, [location]);

  const logoutAndCloseDropdown = () => {
    handleLogout(setName);
    setIsProfileDropdownVisible(false); 
    Cookies.remove('accessToken'); 
    Cookies.remove('refreshToken'); 
  };

  return (
    <nav className="navbar">
      <MainContainer>
        <LogoContainer to="/">BOOKMILE</LogoContainer>
        <LoginContainer>
          {name === null ? (
            <>
              <LoginText to="/login">로그인</LoginText>
              <SignUpLink to="/signup">회원가입</SignUpLink>
            </>
          ) : (
            <>
              <NotifiContainer>
                {/* <NotifBell /> */}
                <ProfileImage
                  onClick={(e) => {
                    e.stopPropagation();  
                    setIsProfileDropdownVisible(!isProfileDropdownVisible);
                  }}
                  style={{ backgroundImage: `url(${userInfo?.image})` }}
                />
              </NotifiContainer>
            </>
          )}
        </LoginContainer>
      </MainContainer>
      
      {/* 사용자 정보 드롭다운 */}
      {isProfileDropdownVisible && userInfo && (
        <ProfileDropdown ref={dropdownRef}>
          <DropdownContent>
            <DropdownName>{userInfo.nickName} 님</DropdownName>
            <ProfileLink to="/mypage">회원정보 수정</ProfileLink>
            <LogoutButton onClick={logoutAndCloseDropdown}>로그아웃</LogoutButton>
          </DropdownContent>
        </ProfileDropdown>
      )}
    </nav>
  );
}

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
`;

const NotifiContainer = styled.div`
  display: flex;
  position: relative;
  gap: 20px;
  z-index: 10;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0; 
  background-color: white;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 9999;
`;

const DropdownContent = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const DropdownName = styled.span`
  font-weight: 700;
`;

const ProfileLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.colors.body};
  &:hover {
    cursor: pointer;
  }
`;

const LogoutButton = styled.button`
  border: none;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  background-color: white;
  font-size: 1em;
  text-align: start;
  padding: 0;
`;

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
  color: ${(props) => props.theme.colors.main};
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