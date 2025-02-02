import React, { useState } from 'react';
import styled from 'styled-components';
import BarChart3D from '../components/Ranking/3d/BarChart3D'
import RankingList from '../components/Ranking/RankingList';
import WhiteButton from '../components/button/whitebutton';
import RankingList1 from '../components/Ranking/RankingList1';
import GroupThoughts from '../components/Ranking/GroupThoughts';
import ImgComment from '../components/Ranking/ImgComment';
import BookCard from '../components/Ranking/BookCard';
import { Link } from 'react-router-dom';
import RankingPopup from '../components/popup/RatingPopup/RatingPopup'

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: 360px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  width: 100%;
  height: 360px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(217, 217, 217, 0.5), rgba(0, 0, 0, 0.5));
`;
const Close = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  color: #D5D5D5;
  cursor: pointer;
  z-index: 3;
  display: flex;
  position: absolute;
  top: 20px;
  left: 40px;
  background: none;
  border: none;
  padding: 10px 20px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: none;
    
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border: none;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  z-index: 2;
  color: white;
  margin: 0 9.86%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: calc(100% - 2 * 9.86%);


  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1.25rem;
  margin: 5px 0;
`;

const GroupInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const CommentWrapper = styled.div`
  margin: 0 auto;
  width: 1156px;
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const ImgCommentWrapper= styled.div`
  display: flex;
  gap: 20px;
`;

const RankWrapper= styled.div`
  margin-bottom: 120px;
`;

const RankingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ImageContainer>
        <Image src="../../public/images/cover/dinnerindrawer.png" />
        <GradientOverlay />
        <Close>그룹종료</Close> {/* //그룹장한테만 보임 */}
        <ContentWrapper>
          <LeftContent>
          <GroupInfo>
            <Title>한강 작가 책 도장깨기</Title>
            <WhiteButton>페이지</WhiteButton>
          </GroupInfo>
            <SubTitle>서랍에 저녁을 넣어 두었다</SubTitle>
            <GroupInfo>
              <span>한강 저</span>
            </GroupInfo>
          </LeftContent>
          <GroupInfo>
          <WhiteButton onClick={() => setIsModalOpen(true)}>리뷰</WhiteButton>
          <Link to="/checkPointRecord">
          <WhiteButton>체크포인트 기록</WhiteButton>
          </Link>
          </GroupInfo>
        </ContentWrapper>
      </ImageContainer>
    {/* <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <BarChart3D/>
      </div>
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff' }}>
        <RankingList rankings={rankings.slice(3)} />
      </div>
    </div> */}
    <RankWrapper>
      <RankingList1/>
    </RankWrapper>
    <CommentWrapper>
      <GroupThoughts/>
      <ImgCommentWrapper>
        <ImgComment 
          nickname="우리이기 이전에" 
          comment="너무 공감갔던 글귀들" 
          imageSrc="../../public/images/cover/dinnerindrawer.png" 
        />
        <ImgComment 
          nickname="미친운체개발자" 
          comment="스스로를 닦달하지 말고, 매사에 너무 심각하지 말고, 너무 고민하지 말고, 그냥 재미있게 살았으면 좋겠다." 
          imageSrc="../../public/images/cover/dinnerindrawer.png" 
        />
      </ImgCommentWrapper>
    </CommentWrapper>
    {isModalOpen && <RankingPopup onClose={() => setIsModalOpen(false)} />} 
    </>
  );
};

export default RankingPage;