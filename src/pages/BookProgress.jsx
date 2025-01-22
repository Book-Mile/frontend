import React from 'react';
import styled from 'styled-components';
import BarChart3D from '../components/Ranking/3d/BarChart3D'
import RankingList from '../components/Ranking/RankingList';
import WhiteButton from '../components/button/whitebutton';
import RankingList1 from '../components/Ranking/RankingList1';

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: 432px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  width: 100%;
  height: 432px;
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
  margin-top: 80px;
  display: flex;
  position: absolute;
  top: 16px;
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
  width: 150px;
  font-size: 1.25rem;
  margin: 5px 0;
`;

const GroupInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const RankingPage = () => {
  const rankings = [
    { id: 1, name: 'Alice', score: 94, profileImage: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Bob', score: 87, profileImage: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Charlie', score: 82, profileImage: 'https://via.placeholder.com/50' },
    { id: 4, name: 'David', score: 78 },
    { id: 5, name: 'Eve', score: 75 },
    { id: 6, name: 'Frank', score: 70 },
  ];



  return (
    <>
      <ImageContainer>
        <Image src="../../public/images/cover.png" />
        <GradientOverlay />
        <Close>그룹종료</Close>
        <ContentWrapper>
          <LeftContent>
            <Title>채식주의자</Title>
            <SubTitle>한강 저</SubTitle>
            <GroupInfo>
              <span>198페이지</span>
              <span>9챕터</span>
            </GroupInfo>
          </LeftContent>
          <WhiteButton>시작하기</WhiteButton>
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
    <div>
      <RankingList1/>
    </div>
    </>
  );
};

export default RankingPage;
