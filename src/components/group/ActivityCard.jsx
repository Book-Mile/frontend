import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookLabel from '../../components/search/BookLabel';
import ModalButton from '../modalButton/ModalCustomButton';

const Container = styled.article`
  width: 23.92%;
  height: 24.31%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  padding: 3.2%;
  border-radius: 20px;
  background-color: ${(props) => (props.completed ? '#f0f0f0' : props.theme.colors.sub)};
  border: 1px solid ${(props) => (props.completed ? '#565656' : props.theme.colors.main)};
`;

const TopSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 15px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 30px;
  object-fit: cover;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  border-radius: 5px;
  border: 1px solid #565656;
`;

const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 0;
  flex-wrap: wrap;
`;

const AuthorText = styled.p`
  margin: 0;
  text-align: left;
  font-size: 12px;
  color: ${(props) => props.theme.colors.body};
`;

const MainText = styled.p`
  margin: 0;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.body};
`;

const SectionWithGap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const GapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.footer`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  margin-top: 60px;
`;

import SpeedIcon from '../../assets/label/speed.svg?react';
import PageIcon from '../../assets/label/page.svg?react';
import ChapterIcon from '../../assets/label/chapter.svg?react';
import CountIcon from '../../assets/label/count.svg?react';

function ActivityCard({ completed = false, activity }) {
  const [completedMembers, setCompletedMembers] = useState(0); 
  const [totalMembers, setTotalMembers] = useState(30);

  useEffect(() => {
    // 예시 API 응답 (실제 API 호출로 대체 필요)
    const fetchedData = {
      totalMembers: 30, 
      completedMembers: 12 
    };

    setCompletedMembers(fetchedData.completedMembers);
    setTotalMembers(fetchedData.totalMembers);
  }, []);

  const handleButtonClick = () => {
    window.location.href = '/makingGroup';
  };

  // 아이콘을 매핑하기 위한 객체
  const iconMap = {
    page: <PageIcon />,
    speed: <SpeedIcon />,
    count: <CountIcon />,
    chapter: <ChapterIcon />
  };

  // 텍스트를 매핑하기 위한 객체
  const textMap = {
    page: '페이지',
    speed: '속도',
    count: '횟수',
    chapter: '챕터'
  };

  // activity.pageInfo에 따라 동적으로 처리
  const determineTypeAndText = (pageInfo) => {
    if (pageInfo.includes('페이지')) {
      return { type: 'page', text: pageInfo };
    } else if (pageInfo.includes('속도')) {
      return { type: 'speed', text: pageInfo };
    } else if (pageInfo.includes('횟수')) {
      return { type: 'count', text: pageInfo };
    } else if (pageInfo.includes('챕터')) {
      return { type: 'chapter', text: pageInfo };
    }
    return { type: 'page', text: pageInfo };  // 기본값
  };

  const { type, text } = determineTypeAndText(activity.pageInfo);

  return (
    <Container completed={completed}>
      <SectionWithGap>
        <TopSection>
          <Image src="../../public/images/cover/werther.png" alt="profile" />
          <ProgressBar>
            <span style={{ fontSize: '12px', color: '#4E202A', fontWeight: '700' }}>
              {completedMembers}
            </span>
            <span style={{ fontSize: '10px', color: '#565656' }}>
              /{totalMembers}
            </span>
          </ProgressBar>
        </TopSection>
        <GapContainer>
          <InfoContainer>
            <AuthorText>홍길동</AuthorText>
            <MainText>{activity.groupName}</MainText>
          </InfoContainer>
          <LabelContainer>
            <BookLabel
              text={text}
              icon={iconMap[type]} // 동적으로 아이콘을 렌더링
            />
          </LabelContainer>
        </GapContainer>
      </SectionWithGap>
      {!completed && (
        <ButtonContainer>
          <ModalButton onClick={handleButtonClick} width="168px" height="44px" fontWeight="500">
            참여하기
          </ModalButton>
        </ButtonContainer>
      )}
    </Container>
  );
}

export default ActivityCard;
