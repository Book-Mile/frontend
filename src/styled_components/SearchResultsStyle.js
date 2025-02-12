import styled from 'styled-components';

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
  color: #4E202A;
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
  color: ${props => (props.active ? props.theme.colors.main : '#4E202A')};
`;