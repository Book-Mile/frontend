import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search/search.svg'

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 40px;
  width: 40%;
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

  
  &:hover {
    background-color: #f1f1f1;
  border-radius: 0 40px 40px 0;
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // 추후 실제 검색 로직 추가할 예정
    console.log('검색어:', query);
  };

  return (
    <SearchBarContainer>
        <Input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>
          <img src={SearchIcon} alt="검색" width={22} height={22} />
        </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
