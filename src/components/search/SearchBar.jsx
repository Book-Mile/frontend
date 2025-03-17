/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/search/search.svg';
import apiClient from '../../api/apiClient';

const SearchBar = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || '');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const placeholderText = '노벨 문학상 한강작가 ‘소년이 온다’';

  const handleSearch = async () => {
    const searchQuery = query || '소년이 온다';

    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
    }

    console.log(recentSearches);

    try {
      const response = await apiClient.post('/books/search', {
        query: searchQuery,
        queryType: 'Title',
        sort: 'Accuracy',
        maxResults: 10,
      });

      navigate(`/searchresults?query=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Search API Error:', error);
      alert('검색 중 문제가 발생했습니다.');
    }
  };

  const handleButtonClick = () => {
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <SearchBarContainer>
        <Input
          type="text"
          placeholder={placeholderText}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchButton
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={SearchIcon} alt="검색" width={22} height={22} />
        </SearchButton>
      </SearchBarContainer>

      {/* 최근 검색어가 있고, Hover 상태일 때만 표시 */}
      {(isHovered || query || recentSearches.length > 0) && (
        <RecentSearchesContainer>
          <h4>최근 검색</h4>
          {recentSearches.length === 0 ? (
            <p>최근 검색어가 없습니다.</p>
          ) : (
            recentSearches.map((search, index) => (
              <SearchItem key={index}>{search}</SearchItem>
            ))
          )}
        </RecentSearchesContainer>
      )}
    </div>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${(props) => props.theme.colors.main};
    border-radius: 40px;
    width: 570px;
    flex-direction: row;
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px 20px;
    font-size: 16px;
    border: none;
    outline: none;
    position: relative;
    border-radius: 40px 0 0 40px;

    &:focus {
        border-color: ${(props) => props.theme.colors.main};
    }
`;

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    height: 100%;
    background: white;
    border-radius: 0 40px 40px 0;
    position: relative;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const RecentSearchesContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    display: none;
`;

const SearchItem = styled.div`
    padding: 8px 0;
    font-size: 14px;
    color: ${(props) => props.theme.colors.main};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
