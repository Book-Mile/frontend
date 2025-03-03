import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../api/apiClient';
import ModalButton from '../components/modalButton/ModalCustomButton';
import BookLabel from '../components/search/BookLabel';
import SearchBar from '../components/search/SearchBar';
import Rating from '../components/search/Rating';
import Loading from '../animations/Loading';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get('query');

    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, [location]);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post('/books/search', { query });
        setBooks(response.data.response || []);
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  const handleCreateGroup = (isbn13) => {
    navigate(`/creategroup?isbn=${isbn13}`);
  };

  const handleBookClick = (isbn13) => {
    navigate(`/details/${isbn13}`);
  };

  return (
    <>
      <Container>
        <SearchBarWrapper>
          <SearchBar initialQuery={query} />
        </SearchBarWrapper>

        <SearchResultTextContainer>
          <SearchResultTitle>‘{query || '검색어 없음'}’</SearchResultTitle>
          <SearchResultCount>검색 결과 총 {books.length}건</SearchResultCount>
        </SearchResultTextContainer>
        {error && <p>❌ {error}</p>}

        {books.map((book) => (
          <BookSectionWrapper
            key={book.isbn13}
            onClick={() => handleBookClick(book.isbn13)}
          >
            <BookContainer>
              <div>
                <BookImage src={book.cover} alt={book.title} />
              </div>
              <BookDetails>
                <BookTitle>
                  <span>{book.title}</span>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <AladinImage
                      src="../../public/images/aladinlogo.png"
                      alt="알라딘 로고"
                    />
                  </a>
                </BookTitle>
                <BookSubtitle>
                  <span>저자: {book.author}</span>
                  <span>출판사 : {book.publisher}</span>
                  <div>ISBN: {book.isbn13}</div>
                  <LabelContainer>
                    <div>평점:</div>
                    <Rating
                      rating={book.customerReviewRank / 2}
                      totalStars={5}
                    />
                  </LabelContainer>
                </BookSubtitle>
                <LabelContainer>
                  <BookLabel text="국내도서" />
                </LabelContainer>
              </BookDetails>
            </BookContainer>

            <ModalButtonWrapper>
              <ModalButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateGroup(book.isbn13);
                }}
              >
                참여하기
              </ModalButton>
            </ModalButtonWrapper>
          </BookSectionWrapper>
        ))}
      </Container>

      <Pagination>
        <PageText>이전</PageText>
        <PageText active>1</PageText>
        <PageText>2 3 4 5 6 7 다음</PageText>
      </Pagination>
      {loading && <Loading />}
    </>
  );
};

export default SearchResults;

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
  color: ${(props) => props.theme.colors.main};
  font-size: 18px;
  font-weight: 700;
  word-wrap: break-word;
`;

const SearchResultCount = styled.span`
  color: #4e202a;
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
  cursor: pointer;
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
  color: #4e202a;
  font-size: 18px;
  font-weight: 700;
  word-wrap: break-word;
  gap: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 600px;
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
  color: ${(props) => (props.active ? props.theme.colors.main : '#4E202A')};
`;
