import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';

const Section = styled.section`
  position: relative;
  width: 1155px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.body};
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Icon = styled.svg`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: 100%;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc(25% - 20px);
  
  @media (max-width: 1439px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 358px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BookTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const Author = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #565656;
`;

const BookList = () => {
  const [startIndex, setStartIndex] = useState(0);
  const scrollRef = useRef(null);

  const books = [
    {
      title: "소프트웨어 개발에 ChatGPT 사용하기",
      author: "오노 사토시",
      image: "../../../public/images/cover/Chatgpt.png"
    },
    {
      title: "디자인 구구단",
      author: "에이핫",
      image: "../../../public/images/cover/designBasics.jpg"
    },
    {
      title: "AI 영상 제작",
      author: "민지영, 문수민, 전은재, 앤미디어",
      image: "../../../public/images/cover/AI-VideoCreation.jpg"
    },
    {
      title: "혼자 공부하는 머신러닝+딥러닝",
      author: "박해선",
      image: "../../../public/images/cover/ML-Self-Study.jpg"
    },
    {
      title: "리액트로 만드는 웹 애플리케이션",
      author: "김민수",
      image: "../../../public/images/cover/ML-Self-Study.jpg"
    },
    {
      title: "자바스크립트 완벽 가이드",
      author: "벤 프랭클린",
      image: "../../../public/images/cover/ML-Self-Study.jpg"
    },
    {
      title: "프론트엔드 개발의 비밀",
      author: "이상준",
      image: "../../../public/images/cover/ML-Self-Study.jpg"
    },
    {
      title: "웹 디자인의 핵심",
      author: "김상호",
      image: "../../../public/images/cover/ML-Self-Study.jpg"
    }
  ];

  const nextBook = () => {
    if (startIndex + 4 < books.length) {
      setStartIndex(prevIndex => prevIndex + 4);
    }
  };

  const prevBook = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex(prevIndex => prevIndex - 4);
    }
  };

  const scrollProps = useSpring({
    scrollLeft: startIndex * (1155 / 4),
    config: { tension: 200, friction: 25 },
    reset: true
  });

  return (
    <Section>
      <Header>
        <Title>최신도서</Title>
        <Navigation>
          <Icon
            onClick={prevBook}
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 5.5L10 15.5L20 25.5" stroke="#4E202A" />
          </Icon>
          <Icon
            onClick={nextBook}
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 25.5L20 15.5L10 5.5" stroke="#4E202A" />
          </Icon>
        </Navigation>
      </Header>
      <animated.div style={{ ...scrollProps }}>
        <ContentWrapper ref={scrollRef}>
          {books.slice(startIndex, startIndex + 4).map((book, index) => (
            <BookCard key={index}>
            <Link to={`/details/${book.id}`}>
              <BookImage src={book.image} alt={book.title} />
            </Link>
            <BookInfo>
              <Link to={`/details/${book.id}`}>
                <BookTitle>{book.title}</BookTitle>
              </Link>
              <Author>{book.author}</Author>
            </BookInfo>
          </BookCard>
          ))}
        </ContentWrapper>
      </animated.div>
    </Section>
  );
};

export default BookList;
