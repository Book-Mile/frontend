import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookLabel from '../../components/search/BookLabel';
import ModalButton from '../modalButton/ModalButtonOk';

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
  const [activityData, setActivityData] = useState([]);
  const [completedMembers, setCompletedMembers] = useState(0); 
  const [totalMembers, setTotalMembers] = useState(30);

  useEffect(() => {
    // 예시 API 응답 (실제 API 호출로 대체 필요)
    const fetchedData = {
      labels: [
        { type: 'page', value: 100 },
        { type: 'chapter', value: 12 } 
      ],
      totalMembers: 30, 
      completedMembers: 12 
    };

    setActivityData(fetchedData.labels);
    setTotalMembers(fetchedData.totalMembers);
    setCompletedMembers(fetchedData.completedMembers);
  }, []);

  const iconMap = {
    page: <PageIcon />,
    speed: <SpeedIcon />,
    count: <CountIcon />,
    chapter: <ChapterIcon />
  };

  const textMap = {
    page: '페이지',
    speed: '속도',
    count: '횟수',
    chapter: '챕터'
  };

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
              text={`${activity.pageInfo}`}
              icon={<PageIcon />}
            />
          </LabelContainer>
        </GapContainer>
      </SectionWithGap>
      {!completed && (
        <ButtonContainer>
          <ModalButton />
        </ButtonContainer>
      )}
    </Container>
  );
}

export default ActivityCard;
