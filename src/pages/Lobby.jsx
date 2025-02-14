import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BookLabel from '../components/search/BookLabel';
import GroupedPeople from '../components/GroupedPeople';
import WhiteButton from '../components/button/whitebutton';
import EndGroupPopup from '../components/popup/EndGroupPopup/EndGroupPopup';
import apiClient from '../api/apiClient';
import Loading from '../animations/Loading';
import { getUserInfoFromToken } from '../api/getusertoken';
import Cookies from 'js-cookie';
import { ImageContainer, MarginContainer, GradientOverlay, ContentWrapper, LeftContent, Title, SubTitle, GroupInfo, Close, GroupContainer, MemberInfo, MemberImage, MemberName, MemberDetails, DetailText, MembersContainer, ProgressBarContainer, FlexRowWrapper, GroupMembersText, GroupSizeWrapper, WaitMessageStyled, MemberSpan, MembersWrapper,FlexRow,BackgroundContainer } from '../styled_components/LobbyStyles';


const Lobby = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const groupId = '27';
  // const groupId = params.get('groupId'); /creategroup에서 만든 그룹의 id URL로 받아오기

  const navigate = useNavigate();

  const [groupData, setGroupData] = useState(null);
  const [members, setMembers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 상태 변수로 토큰과 사용자 정보 저장
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 토큰과 사용자 정보를 한번만 가져오기
    const fetchedToken = Cookies.get('accessToken');
    const fetchedUserInfo = getUserInfoFromToken(fetchedToken);
    
    setToken(fetchedToken);
    setUserInfo(fetchedUserInfo);
  }, []); 

  useEffect(() => {
    
      if (groupId && userInfo) {
        console.log('그룹 ID와 사용자 정보는 모두 유효합니다.');
        setIsLoading(false);
      } else {
        console.error('Group ID 또는 User Info가 없습니다');
        setIsLoading(false);
      }
  
      const fetchGroupData = async () => {
        try {
          // 그룹 데이터 가져오기
          const responseGroup = await apiClient.get(`/groups/${groupId}`);
          setGroupData(responseGroup.data);
      
          // 그룹 멤버 가져오기
          const responseMembers = await apiClient.get(`/groups/${groupId}/members`);
          setMembers(responseMembers.data);
      
          // 멤버 리스트에서 userId가 일치하는 항목 찾기
          const currentUser = responseMembers.data
            .filter(member => member !== null && member !== undefined)
            .find(member => member.userId === userInfo.userId);
          
          if (currentUser) {
            setUserRole(currentUser.role);
          } else {
            console.log("해당 사용자 정보가 그룹에 없습니다.");
          }
      
          setIsLoading(false);
        } catch (error) {
          console.error('그룹 데이터나 멤버 데이터를 가져오는 중 오류 발생:', error);
          setIsLoading(false);
        }
      };
  
    fetchGroupData();
  }, [groupId, userInfo]);
  
  

  const handleStartClick = () => {
    navigate(`/bookprogress?groupId=${groupId}`);
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
  
  if (!groupData) {
    return <div>그룹 데이터를 로드할 수 없습니다.</div>;
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