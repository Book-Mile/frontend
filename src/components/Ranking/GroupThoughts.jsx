import styled from 'styled-components';
import Memberstory from './memberstory';

const GroupThoughts = ({ groupThoughtsData }) => {  
  // 외부에서 전달받은 데이터를 사용
  return (
    <Container>
      <Title>그룹원들은 이런 생각을 했어요</Title>
      <ContentWrapper>
        {groupThoughtsData.map((story, index) => (
          <Memberstory
            key={index}
            imageSrc={story.imageSrc}
            nickname={story.nickname}
            page={story.page}
            text={story.text}
          />
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default GroupThoughts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  gap: 30px;
`;

const Title = styled.p`
  width: 1156px;
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  color: #ab0909;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 1156px;
  gap: 20px;
`;

