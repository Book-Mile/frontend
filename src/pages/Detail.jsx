import React, { useState } from "react";
import styled from "styled-components";
import Rating from "../components/search/Rating";
import ModalButton from '../components/modalButton/ModalButtonOk';

const Container = styled.main`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  overflow: visible;
  padding: 0 13.61%;
  top: 160px;
`;

const BookDetailWrapper = styled.article`
  display: flex;
  gap: 106px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 100px;
  }
`;

const BookCover = styled.figure`
  width: 330px;
  height: 466px;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  box-shadow: 29px 280px 79px 0 rgba(0, 0, 0, 0),
    19px 179px 72px 0 rgba(0, 0, 0, 0.01),
    10px 101px 61px 0 rgba(0, 0, 0, 0.05),
    5px 45px 45px 0 rgba(0, 0, 0, 0.09),
    1px 11px 25px 0 rgba(0, 0, 0, 0.1);

  img {
    width: 330px;
    height: 466px;
    object-fit: cover;
  }
`;

const StyledBookInfo = styled.section`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  word-wrap: break-word;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.colors.body};
  margin: 0;
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Label = styled.span`
  font-size: 16px;
  color: #565656;
  font-weight: 400;
  width: 100px;
  text-align: left;
`;

const InfoText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.body};
  text-align: left;
`;

const DescriptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.body};
  margin-bottom: 20px;
  line-height: 1.6;
  height: ${props => (props.isExpanded ? "auto" : "70px")};
  overflow: hidden;
  position: relative;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #565656;
  cursor: pointer;
  font-size: 12px;
  left: 0;
`;

const Detail = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const bookData = {
    title: "젊은 베르테르의 슬픔",
    author: "요한 볼프강 폰 괴테",
    publisher: "민음사",
    isbn: "9788937460258",
    pageCount: 244,
    chapters: "12",
    rating: 8.8,
    coverUrl: "../../public/images/cover/werther.png",
    description:
      "질풍노도의 시대를 이끈 청년 괴테의 대표작 청춘의 열병, 이룰 수 없는 사랑의 상징이 된 이름 세계적인 베스트셀러가 된 최초의 독일소설 “인간을 행복하게 만드는 것이 동시에 불행의 원천이 될 수 있다는 사실은 과연 필연인 것일까?” 괴테는 25세 되던 해 봄, 이미 약혼자가 있었던 샤로테 부프를 사랑하게 되었다. 그녀를 향한 이룰 수 없는 사랑에 절망한 나머지 괴테는 도망치다시피 귀향했다. 그 후 그의 친구 예루살렘이 남편이 있는 부인에게 연정을 품다가 자살했다는 소식을 들었다. 괴테는 마신에 홀린 것 같은 상태에서 예루살렘의 이야기와 자신의 체험을 엮어 불과 14주 만에 『젊은 베르테르의 슬픔』이라는 문제작을 완성했다. 이 작품은 1774년 출간되자마자 젊은 독자층을 완전히 감동의 소용돌이 속에 몰아넣었다. 실연당한 남자들이 베르테르처럼 자살하는 일도 있었고, 젊은 남자들은 노랑 조끼에 파랑 상의를 입었으며 여자들은 로테처럼 사랑받기를 원했다. ‘질풍노도의 시대’를 이끈 청년 괴테의 대표작이자 세계적으로 가장 많은 독자를 가지게 된 이 작품은 사랑의 열병을 앓는 전 세계 젊은이들의 영혼을 울렸다. 젊은 날의 생생한 사랑의 체험에서 나오는 생명감과 순수한 열정이 이토록 섬세하고 아름답게 묘사된 예는 다시 찾아볼 수 없을 것이다."
  };

  const toggleDescription = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <Container>
      <BookDetailWrapper>
        {/* 책 커버 */}
        <BookCover>
          <img src={bookData.coverUrl} alt="Book cover" />
        </BookCover>

        {/* 책 정보 */}
        <StyledBookInfo>
          <InfoRow>
            <Title>{bookData.title}</Title>
            <img src="../../public/images/aladinlogo.png" alt="알라딘 로고" width={40} />
          </InfoRow>

          {/* 저자부터 평점까지 */}
          <InfoSection>
            <InfoRow>
              <Label>저자:</Label>
              <InfoText>{bookData.author}</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>출판사:</Label>
              <InfoText>{bookData.publisher}</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>ISBN13:</Label>
              <InfoText>{bookData.isbn}</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>전체 페이지:</Label>
              <InfoText>{bookData.pageCount}쪽</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>챕터:</Label>
              <InfoText>{bookData.chapters}</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>평점:</Label>
              <Rating rating={bookData.rating} totalStars={5} />
            </InfoRow>
          </InfoSection>

          <DescriptionWrapper>
            <Description isExpanded={isExpanded}>
              {bookData.description}
            </Description>
            <MoreButton onClick={toggleDescription}>
              {isExpanded ? "간략히 보기" : "더보기"}
            </MoreButton>
          </DescriptionWrapper>
          {/* 추후 ModalButton 생기면 다시 수정 */}
          <ModalButton />
        </StyledBookInfo>
      </BookDetailWrapper>
    </Container>
  );
};

export default Detail;
