import React, { useState } from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BookLabel from '../components/search/BookLabel';
import GroupedPeople from '../components/GroupedPeople';
import WhiteButton from '../components/button/whitebutton';
import EndGroupPopup from '../components/popup/EndGroupPopup/EndGroupPopup';

const MarginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 9.86%;
  position: relative;
  gap: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: 432px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  width: 100%;
  height: 432px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(217, 217, 217, 0.5), rgba(0, 0, 0, 0.5));
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  z-index: 2;
  color: white;
  margin: 0 9.86%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: calc(100% - 2 * 9.86%);

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
  color: #D5D5D5;
  cursor: pointer;
  z-index: 3;
  margin-top: 80px;
  display: flex;
  position: absolute;
  top: 16px;
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
  color: ${props => props.theme.colors.body};
`;

const GroupSize = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.body};
`;

const WaitMessage = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.body};
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
  margin-top: 70px;
  margin-bottom: 50px;
  flex-direction: column;
  gap: 30px;
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
  color: ${props => props.theme.colors.body};
`;

const MemberDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailText = styled.span`
  font-size: ${props => (props.size === 'large' ? '1.7rem' : '1.125rem')};
  font-weight: ${props => (props.size === 'large' ? '700' : '400')};
  color: ${props => (props.size === 'large' ? props.theme.colors.body : '#565656')};
`;

const MembersContainer = styled.div`
  position: relative;
  background-color: #F5F5F5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 50px;
  padding-bottom: 100px;
`;

const MemberSpan = styled.span`
  font-size: ${props => (props.type === 'current' ? '20px' : '16px')};
  font-weight: ${props => (props.type === 'current' ? '700' : '400')};
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
  color: ${props => props.theme.colors.body};
  margin: 0;
`;

const GroupSizeWrapper = styled(GroupSize)`
  display: flex;
  align-items: center;
  margin: 0;
`;

const WaitMessageStyled = styled(WaitMessage)`
  font-size: 1rem;
  color: ${props => props.theme.colors.body};
  margin: 0;
`;

const Lobby = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleStartClick = () => {
    navigate('/bookprogress');
  };

  const handleCloseClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {isPopupOpen && <EndGroupPopup onClose={handlePopupClose} />}

      <ImageContainer>
        <Image src="../../public/images/cover/dinnerindrawer.png" />
        <GradientOverlay />
        <Close onClick={handleCloseClick}>그룹종료</Close> {/* Add onClick handler */}
        <ContentWrapper>
          <LeftContent>
            <Title>채식주의자</Title>
            <SubTitle>한강 저</SubTitle>
            <GroupInfo>
              <span>198페이지</span>
              <span>9챕터</span>
            </GroupInfo>
          </LeftContent>
          <WhiteButton onClick={handleStartClick}>시작하기</WhiteButton> {/* Add onClick handler */}
        </ContentWrapper>
      </ImageContainer>
      <MarginContainer>
        <GroupContainer>
          <MemberInfo>
            <MemberImage src="../../public/images/cover/dinnerindrawer.png" />
            <MemberName>김기수</MemberName>
          </MemberInfo>
          <MemberDetails>
            <FlexRow>
              <DetailText size="large">같이 어휘력을 쌓읍시다</DetailText>
              <BookLabel text="페이지" fontSize="16px" />
            </FlexRow>
            <DetailText size="small">2024-11-30까지 모집 중</DetailText>
          </MemberDetails>
        </GroupContainer>
        <MembersContainer>
          <MembersWrapper>
              <FlexRowWrapper>
                <GroupMembersText>그룹원</GroupMembersText>
                <GroupSizeWrapper>
                  <MemberSpan type="current">4</MemberSpan>
                  <MemberSpan type="total">/8</MemberSpan>
                </GroupSizeWrapper>
              </FlexRowWrapper>
              <WaitMessageStyled>그룹원이 모두 모일 때까지 기다리고 있어요.</WaitMessageStyled>
          </MembersWrapper>
          <ProgressBarContainer>
            <GroupedPeople title="구구단을 외우자" imageUrl="../../public/images/cover/dinnerindrawer.png" />
          </ProgressBarContainer>
        </MembersContainer>
      </MarginContainer>
    </>
  );
};

export default Lobby;
