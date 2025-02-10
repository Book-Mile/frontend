import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/search/search.svg';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isHovered, setIsHovered] = useState(false); 
  const handleSearch = () => {
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches].slice(0, 5)); // 최대 5개의 검색어만 저장
    }
    // 추후 실제 검색 로직 추가할 예정
    console.log('검색어:', query);
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
          placeholder="노벨 문학상 한강작가 ‘소년이 온다’"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}  
        />
        <SearchButton
          onClick={handleSearch}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={SearchIcon} alt="검색" width={22} height={22} />
        </SearchButton>
      </SearchBarContainer>

      {/* hover 상태가 true일 때만 최근 검색어 표시 */}
      {isHovered && recentSearches.length > 0 && (
        <RecentSearchesContainer>
          <h4>최근 검색</h4>
          {recentSearches.map((search, index) => (
            <SearchItem key={index}>{search}</SearchItem>
          ))}
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
  border: 2px solid ${props => props.theme.colors.main};
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
    border-color: ${props => props.theme.colors.main};
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
  color: ${props => props.theme.colors.main};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
