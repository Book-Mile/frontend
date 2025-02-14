import {
  MainWrapper,
  MainContent,
  Detail,
} from '../styled_components/main/MainStyle';
import BackgroundCircle from '../styled_components/main/BackgroundCircles';
import SearchBar from '../components/search/SearchBar';
import UpdateBook from '../components/main/updatebook';
import GrpRankPreview from '../components/main/GrpRankPreview';
import {
  MainTitle,
  SearchContainer,
  Letter,
} from '../styled_components/main/TextComponents';

const Main = () => {
  return (
    <>
      <MainWrapper>
        <BackgroundCircle />
        <MainContent>
          <MainTitle>함께 공유하면서 책 읽는</MainTitle>
          <SearchContainer>
            <Letter>B</Letter>
            <SearchBar />
            <Letter>K</Letter>
          </SearchContainer>
          <Letter>Mile</Letter>
        </MainContent>
      </MainWrapper>
      <Detail>
        <GrpRankPreview />
        <UpdateBook />
      </Detail>
    </>
  );
};

export default Main;
