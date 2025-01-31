import styled from 'styled-components';
import Memberstory from './Memberstory'; // Memberstory 컴포넌트 불러오기

// 스타일 정의
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

const GroupThoughts = () => {
  const groupThoughtsData = [
    {
      imageSrc: '/images/ranking/uploadimg/night.jpg',
      nickname: '미친운체개발자',
      page: '40',
      text: `이야기의 흐름이 흥미롭고 몰입감이 있다. 주인공과 주변 인물들이
             조금씩 드러나며, 각자의 갈등과 내면의 혼란이 서서히 풀려가는 모습이 인상적이다. 특히,
             인간 관계에서 벌어질 갈등의 씨앗이 뿌려지며, 독자는 점차적으로 큰 이야기를 예상하게
             된다. 아직 주요 사건이나 전개가 본격적으로 시작되지는 않았지만, 그로 인해 이후에 어떤
             이야기가 펼쳐질지 궁금증을 자아낸다. 전체적으로 짜임새 있는 서술이 돋보이고, 독자는
             계속해서 페이지를 넘기고 싶어지게 만든다.`,
    },
    {
      imageSrc: '/images/ranking/uploadimg/night.jpg',
      nickname: '어쩔티비',
      page: '30',
      text: `재미있음 ㅇㅇ 솔직히 전개가 재미있어서 나도 모르게 봄`,
    },
  ];

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
