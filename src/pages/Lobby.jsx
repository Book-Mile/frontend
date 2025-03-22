import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BookLabel from '../components/search/BookLabel';
import GroupedPeople from '../components/GroupedPeople';
import WhiteButton from '../components/button/whitebutton';
import EndGroupPopup from '../components/popup/EndGroupPopup/EndGroupPopup';
import apiClient from '../api/apiClient';
import Loading from '../animations/Loading';
import { getUserInfoFromToken } from '../api/getusertoken';
import Cookies from 'js-cookie';
import {
  ImageContainer,
  MarginContainer,
  GradientOverlay,
  ContentWrapper,
  LeftContent,
  Title,
  SubTitle,
  GroupInfo,
  Close,
  GroupContainer,
  MemberInfo,
  MemberImage,
  MemberName,
  MemberDetails,
  DetailText,
  MembersContainer,
  ProgressBarContainer,
  FlexRowWrapper,
  GroupMembersText,
  GroupSizeWrapper,
  WaitMessageStyled,
  MemberSpan,
  MembersWrapper,
  FlexRow,
  BackgroundContainer,
} from '../styled_components/LobbyStyles';

const Lobby = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const groupId = params.get('groupId');

  const [groupData, setGroupData] = useState(null);
  const [members, setMembers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchedToken = Cookies.get('accessToken');
    const fetchedUserInfo = getUserInfoFromToken(fetchedToken);
  
    setUserInfo(fetchedUserInfo);
  
  }, []);
  
  useEffect(() => {
    if (!groupId) {
      console.error('Group ID가 없습니다');
      setIsLoading(false);
      return;
    }
  
    const fetchGroupData = async () => {
      try {
        const responseGroup = await apiClient.get(`/groups/${groupId}`);
        setGroupData(responseGroup.data);
  
        const responseMembers = await apiClient.get(`/groups/${groupId}/members`);
        setMembers(responseMembers.data || []);
  
        if (responseMembers.data && userInfo) {
          const currentUser = responseMembers.data.find(
            (member) => member?.userId === userInfo?.userId
          );
          if (currentUser) {
            setUserRole(currentUser.role);
          }
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error('그룹 데이터나 멤버 데이터를 가져오는 중 오류 발생:', error);
        setIsLoading(false);
      }
    };
  
    fetchGroupData();
  }, [groupId, userInfo]);
  console.log("groupId",groupId)

  const handleStartClick = async () => {
    try {
      const response = await apiClient.patch(`/groups/${groupId}`, {
        status: "IN_PROGRESS",
      });

      if (response.status === 200) {
        alert('그룹이 시작되었습니다');
        navigate(`/bookprogress?groupId=${groupId}`);
      }
    } catch (error) {
      console.error('그룹 시작 중 오류 발생:', error);
      alert('그룹 시작에 실패했습니다.');
    }
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
     {isPopupOpen && <EndGroupPopup onClose={handlePopupClose} groupId={groupId} />}

     <ImageContainer cover={groupData.book.cover}>
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
              <BookLabel
                text={
                  groupData.goalType === 'PAGE'
                    ? '페이지'
                    : groupData.goalType === 'CUSTOM'
                      ? '나만의 속도로'
                      : '횟수로'
                }
                fontSize="16px"
              />
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
                  <MemberSpan type="current">
                    {groupData.currentMembers}
                  </MemberSpan>
                  <MemberSpan type="total">/{groupData.maxMembers}</MemberSpan>
                </GroupSizeWrapper>
              </FlexRowWrapper>
              <WaitMessageStyled>
                그룹원이 모두 모일 때까지 기다리고 있어요.
              </WaitMessageStyled>
            </MembersWrapper>
            {members.length === 0 ? (
              <WaitMessageStyled>현재 그룹장 외 그룹원이 존재하지 않습니다.</WaitMessageStyled>
            ) : (
              <ProgressBarContainer>
                {members.map((member) =>
                  member.role === 'MEMBER' ? (
                    <MembersWrapper key={member.userId}>
                      <GroupedPeople title={member.nickname} imageUrl={member.image} />
                    </MembersWrapper>
                  ) : null
                )}
              </ProgressBarContainer>
            )}
          </MembersContainer>
        </BackgroundContainer>
      </MarginContainer>
    </>
  );
};

export default Lobby;
