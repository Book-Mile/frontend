import styled from 'styled-components';

const GrpRankPreview = () => (
  <Container>
    <Title>가장 많은 성취도 달성한 그룹</Title>
    <GroupList>
      <GroupItem>
        <RankNumber>01</RankNumber>
        <GroupImage>
          <GroupImageContent src="../../../public/images/cover/designBasics.jpg" alt="Group 1" />
        </GroupImage>
        <GroupInfo>
          <GroupName>구구단을 외우자</GroupName>
          <GroupDescription>디자인 구구단</GroupDescription>
        </GroupInfo>
      </GroupItem>
      <GroupItem>
        <RankNumber>02</RankNumber>
        <GroupImage>
          <GroupImageContent src="../../../public/images/cover/1st threshold for sentence building training in English.jpg" alt="Group 2" />
        </GroupImage>
        <GroupInfo>
          <GroupName>영어뿌셔뿌셔</GroupName>
          <GroupDescription>영어로 문장 만들기 훈련 1차 임계점</GroupDescription>
        </GroupInfo>
      </GroupItem>
      <GroupItem>
        <RankNumber>03</RankNumber>
        <GroupImage>
          <GroupImageContent src="../../../public/images/cover/Let-life- flow.jpg" alt="Group 3" />
        </GroupImage>
        <GroupInfo>
          <GroupName>흐르는강물을거꾸로거슬러</GroupName>
          <GroupDescription>삶이 흐르는 대로</GroupDescription>
        </GroupInfo>
      </GroupItem>
      <GroupItem>
        <RankNumber>04</RankNumber>
        <GroupImage>
          <GroupImageContent src="../../../public/images/cover/ETS-TOEIC-750+.jpg" alt="Group 4" />
        </GroupImage>
        <GroupInfo>
          <GroupName>또...익</GroupName>
          <GroupDescription>ETS 토익 단기공략 750+ (LC+RC)</GroupDescription>
        </GroupInfo>
      </GroupItem>
    </GroupList>
  </Container>
);

export default GrpRankPreview;


const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 1156px;
  margin: 0 auto;
  position: relative;
  gap: 5px;
`;

const Title = styled.h2`
  width: 100%;
  height: 43px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  color: ${props => props.theme.colors.body};
`;

const GroupList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  gap: 20px;
  padding: 3px 0;
`;

const GroupItem = styled.article`
  width: 274px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
`;


const RankNumber = styled.span`
  margin: 0;
  width: 17px;
  height: 2.5rem;
  font-size: 0.75rem;
  text-align: left;
  color: ${props => props.theme.colors.body};
`;

const GroupImage = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
`;

const GroupImageContent = styled.img`
  width: 61px;
  height: 5rem;
  object-fit: cover;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
`;

const GroupName = styled.p`
  width: 170px;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  color: ${props => props.theme.colors.body};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

const GroupDescription = styled.p`
  margin: 0;
  width: 140px;
  font-size: 0.75rem;
  text-align: left;
  color: #565656;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;
