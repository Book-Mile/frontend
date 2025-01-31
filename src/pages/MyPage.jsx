import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import ProgressBookList from '../components/ProgressBookList.jsx';
import PendingBookList from '../components/PendingBookList.jsx';
import EndedBookList from '../components/EndedBookList.jsx';
import Edit from '/src/assets/MyInfoAssets/edit.svg';

export default function EditMyInfo() {
  const [nickname, setNickname] = useState('무서운 토끼');
  const [email, setEmail] = useState('email@gmail.com');
  const [tab, setTab] = useState(1);

  const handleTabChange = (tab) => {
    setTab(tab);
  };

  const navigate = useNavigate();
  const handleUserEditBtn = () => {
    navigate('/edit-profile');
  };

  return (
    <>
      <MainContainer>
        <OuterFrame>
          <UpperFrame>
            <UserFrame>
              <UserFrameLeft>
                <img src={'/src/assets/profile.png'} />
              </UserFrameLeft>
              <UserFrameRight>
                <NickName>
                  {nickname}
                  <img
                    src={Edit}
                    onClick={handleUserEditBtn}
                    style={{ cursor: 'pointer' }}
                  />
                </NickName>
                <Email>{email}</Email>
              </UserFrameRight>
            </UserFrame>
          </UpperFrame>
          <DownFrame>
            <TabFrame>
              <TabBtn
                onClick={() => handleTabChange(1)}
                color={!(tab === 1) ? '#9C9C9C' : ''}
              >
                현재 진행 중인 리스트
              </TabBtn>
              <TabBtn
                onClick={() => handleTabChange(2)}
                color={!(tab === 2) ? '#9C9C9C' : ''}
              >
                시작 대기중인 리스트
              </TabBtn>
              <TabBtn
                onClick={() => handleTabChange(3)}
                color={!(tab === 3) ? '#9C9C9C' : ''}
              >
                종료된 리스트
              </TabBtn>
            </TabFrame>
            <ContentFrame>
              {tab === 1 ? (
                <ProgressBookList />
              ) : tab === 2 ? (
                <PendingBookList />
              ) : tab === 3 ? (
                <EndedBookList />
              ) : (
                <></>
              )}
            </ContentFrame>
          </DownFrame>
        </OuterFrame>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%; /* 부모 요소의 100% 높이를 차지 */
  gap: 30px; /* 요소 간 간격 */
  box-sizing: border-box;
  overflow-y: auto; /* 필요한 경우만 스크롤 */
`;

const OuterFrame = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;

const UpperFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const UserFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;
const UserFrameLeft = styled.div`
  width: fit-content;
  height: fit-content;
`;
const UserFrameRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;
const NickName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */
  display: flex;
  align-items: center;

  color: #4e202a;
  gap: 10px;
`;
const Email = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #565656;
`;

const DownFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 5;
  gap: 20px;
`;

const TabFrame = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;
const TabBtn = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  color: ${(props) => props.color || props.theme.colors.main};
  cursor: pointer;
`;

const ContentFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
