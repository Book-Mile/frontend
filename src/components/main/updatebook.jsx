import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { fetchNewBooks } from '../../api/Pages/MainResponse'

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
    
  useEffect(() => {
    const retrievedToken = JSON.parse(sessionStorage.getItem('userData'))?.accessToken;
    console.log('retrievedToken:', retrievedToken);
  
    if (!retrievedToken) {
      console.warn('No access token available');
      return;
    }

    const fetchBooks = async () => {
      const newBooks = await fetchNewBooks(retrievedToken);
      setBooks(newBooks);
    };

    fetchBooks();
  }, []);
  
  // 다음 페이지 이동
  const nextBook = () => {
    if (startIndex + 4 < books.length) {
      setStartIndex(prevIndex => prevIndex + 4);
    }
  };

  // 이전 페이지 이동
  const prevBook = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex(prevIndex => prevIndex - 4);
    }
  };

  // 스크롤 애니메이션
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
          <Icon onClick={prevBook} viewBox="0 0 30 31">
          <path
            d="M15.1177 27.5817L13.4378 29.26L4.28769 20.1131C4.14019 19.9665 4.02314 19.7922 3.94326 19.6003C3.86339 19.4083 3.82226 19.2024 3.82226 18.9945C3.82226 18.7865 3.86339 18.5807 3.94326 18.3887C4.02314 18.1967 4.14019 18.0224 4.28769 17.8758L13.4378 8.72418L15.1161 10.4025L6.5281 18.9921L15.1177 27.5817Z"
            fill="#4E202A"
          />
           </Icon>
          <Icon onClick={nextBook} viewBox="0 0 30 31">
          <path
            d="M3.88231 10.4183L5.56223 8.73999L14.7123 17.8869C14.8598 18.0335 14.9769 18.2078 15.0567 18.3997C15.1366 18.5917 15.1777 18.7976 15.1777 19.0055C15.1777 19.2135 15.1366 19.4193 15.0567 19.6113C14.9769 19.8033 14.8598 19.9776 14.7123 20.1242L5.56223 29.2758L3.88389 27.5975L12.4719 19.0079L3.88231 10.4183Z"
            fill="#4E202A"
          />
          </Icon>
        </Navigation>
      </Header>
      <animated.div style={{ ...scrollProps }}>
        <ContentWrapper>
          {books.slice(startIndex, startIndex + 4).map((book, index) => (
            <BookCard key={book.title || index}>
              <BookImage src={book.cover} alt={book.title} />
              <BookInfo>
                <BookTitle>{book.title}</BookTitle>
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 268px;
  height: 20px;
`;