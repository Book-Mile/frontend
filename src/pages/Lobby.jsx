import { useState,useEffect } from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BookLabel from '../components/search/BookLabel';
import GroupedPeople from '../components/GroupedPeople';
import WhiteButton from '../components/button/whitebutton';
import EndGroupPopup from '../components/popup/EndGroupPopup/EndGroupPopup';
import { useLocation } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Loading from '../animations/Loading';
import { getUserInfoFromToken } from '../api/getusertoken';
import Cookies from 'js-cookie';


const Lobby = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const groupId = '27';  // 예시로 '27' 사용, 실제로는 URL에서 받아올 수 있음

  const navigate = useNavigate();

  const [groupData, setGroupData] = useState(null);
  const [members, setMembers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 쿠키에서 토큰 추출
  const token = Cookies.get('accessToken');
  console.log("Token from Cookies: ", token); // 쿠키에서 토큰 값 확인

  // JWT 토큰에서 사용자 정보 추출
  const userInfo = getUserInfoFromToken(token); // JWT 토큰에서 사용자 정보 추출
  console.log("User Info from token: ", userInfo); // 추출된 사용자 정보 확인

  useEffect(() => {
    if (!groupId || !userInfo) {
      console.error('Group ID or User Info is missing');
      setIsLoading(false);
      return;
    }

    const fetchGroupData = async () => {
      try {
        // 그룹 데이터 가져오기
        const responseGroup = await apiClient.get(`/groups/${groupId}`);
        setGroupData(responseGroup.data);

        // 그룹 멤버 가져오기
        const responseMembers = await apiClient.get(`/groups/${groupId}/members`);
        setMembers(responseMembers.data);

        // 현재 로그인한 사용자가 그룹에 포함되어 있는지 확인
        const currentUser = responseMembers.data.find(member => member.userId === userInfo.userId);
        
        if (currentUser) {
          setUserRole(currentUser.role); // 'MASTER' 또는 'MEMBER' 설정
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching group or members data:', error);
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId, userInfo]); // userInfo가 변경될 때마다 useEffect 실행

  const handleStartClick = () => {
    navigate(`/bookprogress?bookId=${groupData?.book.isbn13}`);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {isPopupOpen && <EndGroupPopup onClose={handlePopupClose} />}

      <ImageContainer>
        <GradientOverlay />
        {userRole === 'MASTER' && (
          <Close onClick={handleCloseClick}>그룹종료</Close>
        )}
        <ContentWrapper>
          <LeftContent>
            <Title>{groupData.book.title}</Title>
            <SubTitle>{groupData.book.author}</SubTitle>
            <GroupInfo>
              <span>{groupData.book.totalPage}페이지</span>
            </GroupInfo>
          </LeftContent>
          {userRole === 'MASTER' && (
            <WhiteButton onClick={handleStartClick}>시작하기</WhiteButton>
          )}
        </ContentWrapper>
      </ImageContainer>

      <MarginContainer>
        <GroupContainer>
          <MemberInfo>
            <MemberImage src={groupData.masterImage} />
            <MemberName>{groupData.masterNickname}</MemberName>
          </MemberInfo>
          <MemberDetails>
            <FlexRow>
              <DetailText size="large">{groupData.groupName}</DetailText>
              <BookLabel text={groupData.goalType === 'PAGE' ? '페이지' : groupData.goalType === 'CUSTOM' ? '나만의 속도로' : '횟수로'} fontSize="16px" />
            </FlexRow>
            <DetailText size="small">{groupData.groupDescription}</DetailText>
          </MemberDetails>
        </GroupContainer>

        <BackgroundContainer>
          <MembersContainer>
            <MembersWrapper>
              <FlexRowWrapper>
                <GroupMembersText>그룹원</GroupMembersText>
                <GroupSizeWrapper>
                  <MemberSpan type="current">{groupData.currentMembers}</MemberSpan>
                  <MemberSpan type="total">/{groupData.maxMembers}</MemberSpan>
                </GroupSizeWrapper>
              </FlexRowWrapper>
              <WaitMessageStyled>
                그룹원이 모두 모일 때까지 기다리고 있어요.
              </WaitMessageStyled>
            </MembersWrapper>
            <ProgressBarContainer>
              {members.map((member) => {
                if (member.role === 'MEMBER') {
                  return (
                    <MembersWrapper key={member.userId}>
                      <GroupedPeople
                        title={member.nickname}
                        imageUrl={member.image}
                      />
                    </MembersWrapper>
                  );
                }
                return null;
              })}
            </ProgressBarContainer>
          </MembersContainer>
        </BackgroundContainer>
      </MarginContainer>
    </>
  );
};

export default Lobby;



const MarginContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
`;

const BackgroundContainer = styled.div`
  background-color: #f5f5f5;
  width: 100%;
`;

const ImageContainer = styled.div`
  background-image: url("../../public/images/cover/dinnerindrawer.png");
  display: flex;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 332px;
  background-position: center;
  background-size: cover;
`;


const GradientOverlay = styled.div`
  width: 100%;
  height: 332px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0.5),
    rgba(0, 0, 0, 0.5)
  );
`;

const ContentWrapper = styled.div`
  z-index: 2;
  color: white;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 1156px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const SubTitle = styled.p`
  width: 150px;
  font-size: 1.25rem;
  margin: 5px 0;
`;

const GroupInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const Close = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  color: #d5d5d5;
  cursor: pointer;
  z-index: 3;
  display: flex;
  position: absolute;
  top: 40px;
  left: 40px;
  background: none;
  border: none;
  padding: 10px 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: none;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border: none;
  }
`;

const GroupMembers = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.body};
`;

const GroupSize = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.body};
`;

const WaitMessage = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.body};
  width: 533px;
  height: 11px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 1156px;
  margin: 60px auto;
`;

const MemberInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MemberImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 30px;
  object-fit: cover;
`;

const MemberName = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.body};
`;

const MemberDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailText = styled.span`
  font-size: ${(props) => (props.size === 'large' ? '1.7rem' : '1.125rem')};
  font-weight: ${(props) => (props.size === 'large' ? '700' : '400')};
  color: ${(props) =>
    props.size === 'large' ? props.theme.colors.body : '#565656'};
`;

const MembersContainer = styled.div`
  position: relative;
  background-color: #f5f5f5;
  width: 1156px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 50px;
  padding-bottom: 100px;
`;

const MemberSpan = styled.span`
  font-size: ${(props) => (props.type === 'current' ? '20px' : '16px')};
  font-weight: ${(props) => (props.type === 'current' ? '700' : '400')};
`;

const MembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FlexRowWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

const GroupMembersText = styled(GroupMembers)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.body};
  margin: 0;
`;

const GroupSizeWrapper = styled(GroupSize)`
  display: flex;
  align-items: center;
  margin: 0;
`;

const WaitMessageStyled = styled(WaitMessage)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.body};
  margin: 0;
`;