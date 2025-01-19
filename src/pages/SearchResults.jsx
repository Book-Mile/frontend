import React from 'react';
import styled from 'styled-components';
import ModalButton from '../components/modalButton/ModalButtonOk';
import BookLabel from '../components/search/BookLabel';
import SearchBar from '../components/search/SearchBar';
import Rating from '../components/search/Rating';

const Container = styled.div`
  margin: 0 9.86%;
  margin-top: 80px;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const SearchResultTextContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const SearchResultTitle = styled.span`
  color: ${props => props.theme.colors.main};
  font-size: 18px;
  font-weight: 700;
  word-wrap: break-word;
`;

const SearchResultCount = styled.span`
  color: #4E202A;
  font-size: 18px;
  font-weight: 400;
  word-wrap: break-word;
`;

const BookSectionWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  width: 100%;
  gap: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const BookContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
`;

const BookImage = styled.img`
  width: 176px;
  height: 258px;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  gap: 20px;
`;

const BookTitle = styled.div`
  color: #4E202A;
  font-size: 18px;
  font-weight: 700;
  word-wrap: break-word;
  gap: 10px;
  display: flex;
`;

const AladinImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
  width: 44px;
`;

const BookSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #565656;
  font-size: 14px;
  font-weight: 400;
  gap: 10px;
  word-wrap: break-word;
`;


const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 200px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  width: 100%;
  height: 38px;
  gap: 6px;
`;

const PageText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${props => (props.active ? props.theme.colors.main : '#4E202A')};
`;

const SearchResults = () => {
    const rating = 7.5;
    const totalStars = 5;
  
    return (
      <>
        <Container>
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
  
          <SearchResultTextContainer>
            <SearchResultTitle>‘채식주의자’</SearchResultTitle>
            <SearchResultCount>검색 결과 총 00건</SearchResultCount>
          </SearchResultTextContainer>
  
          <BookSectionWrapper>
            <BookContainer>
              <BookImage src="https://via.placeholder.com/176x258" />
              <BookDetails>
                <BookTitle>
                  <span>채식주의자</span>
                  <AladinImage src="../../public/images/aladinlogo.png" alt="알라딘 로고" />
                </BookTitle>
                <BookSubtitle>
                  <span>저자: 한강</span>
                  <span>출판사 : 창비</span>
                  <div>출간일: 2022년 03월</div>
                  <LabelContainer>
                    <div>평점:</div>
                    <Rating rating={rating} totalStars={totalStars} />
                  </LabelContainer>
                </BookSubtitle>
                <LabelContainer>
                  <BookLabel text="국내도서" />
                </LabelContainer>
              </BookDetails>
            </BookContainer>
  
            <ModalButtonWrapper>
              <ModalButton />
            </ModalButtonWrapper>
          </BookSectionWrapper>
        </Container>
  
        <Pagination>
          <PageText>이전</PageText>
          <PageText active>1</PageText>
          <PageText>2 3 4 5 6 7 다음</PageText>
        </Pagination>
      </>
    );
  };
  
  export default SearchResults;