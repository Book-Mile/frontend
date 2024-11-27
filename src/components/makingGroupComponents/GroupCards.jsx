import React, { useState } from 'react';
import styled from 'styled-components';
import Img1 from '../../assets/images/makingGroup1.png';
import Img2 from '../../assets/images/makingGroup2.png';
import Img3 from '../../assets/images/makingGroup3.png';
import Img4 from '../../assets/images/makingGroup4.png';
import MakingGroupPopup from '../popup/makingGroupPopup';

const GroupCards = () => {
  // 카드 정보를 배열로 저장
  const cardData = [
    {
      imgPath: Img1,
      title: '일정 페이지마다\n읽고 싶어요',
      content:
        '"나의 일정 페이지마다 기록을 남기고 싶어요!" "페이지별로 소중한 순간들을 간직해보세요. 기억을 더 선명하게, 하루를 더 특별하게."',
    },
    {
      imgPath: Img2,
      title: '챕터별로\n읽고 싶어요',
      content:
        '"일정 챕터마다 다채로운 이야기를 남겨보세요!" "여기에서 당신의 스토리가 한 장 한 장 더해집니다. 작은 챕터들이 모여 커다란 하루를 만들어가죠."',
    },
    {
      imgPath: Img3,
      title: '횟수를 정해놓고\n읽고 싶어요',
      content:
        '"횟수를 정해두고 나의 기록을 쌓아가요!" "기록한 만큼 나의 성장이 보입니다. 오늘의 나는 어제보다 더 나아졌을까요?"',
    },
    {
      imgPath: Img4,
      title: '나만의 속도별로\n읽고 싶어요',
      content:
        '"나의 일정 페이지마다 기록을 남기고 싶어요!" "페이지별로 소중한 순간들을 간직해보세요. 기억을 더 선명하게, 하루를 더 특별하게."',
    },
  ];

  const [selectedImgPath, setSelectedImgPath] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedImgNum, setSelectedImgNum] = useState(0);

  const handleCardClick = (card, imgNum) => {
    setSelectedImgPath(card.imgPath);
    setSelectedTitle(card.title);
    setSelectedContent(card.content);
    setSelectedImgNum(imgNum);
  };

  const handleClosePopup = () => {
    setSelectedImgPath(null);
    setSelectedTitle(null);
    setSelectedContent(null);
    setSelectedImgNum(0);
  };

  return (
    <>
      <ListBigContainer>
        {cardData.map((card, index) => (
          <ListContainer
            key={index}
            imgNum={index + 1}
            onClick={() => handleCardClick(card, index + 1)}
          >
            <div className="card__img"></div>
            <div className="card__info">
              <CardTitle>
                {card.title.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    <br />
                  </span>
                ))}
              </CardTitle>
              <CardContent>{card.content}</CardContent>
            </div>
          </ListContainer>
        ))}
      </ListBigContainer>
      {selectedImgPath && (
        <MakingGroupPopup
          imgPath={selectedImgPath}
          imgNum={selectedImgNum}
          title={selectedTitle}
          content={selectedContent}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

const ListBigContainer = styled.div`
  margin-top: 5%;
  width: 75%;
  height: 60%;
  display: grid;
  padding: 1rem;

  @media (min-width: 0px) {
    grid-gap: 6%;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-gap: 4%;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ListContainer = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px 26px;
  gap: 15px;
  height: 90%;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);

  background: #ffffff;
  border-radius: 20px;
  &:hover {
    box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
    transform: scale(1.1, 1.1);
  }
  .card__img {
    background-image: ${({ imgNum }) => {
      switch (imgNum) {
        case 1:
          return `url(${Img1})`;
        case 2:
          return `url('${Img2}')`;
        case 3:
          return `url('${Img3}')`;
        case 4:
          return `url('${Img4}')`;
        default:
          return 'none';
      }
    }};
    @media (max-width: 1200px) {
      background-image: none; /* 1500px 미만에서 이미지 제거 */
    }
    width: 95%;
    height: 30%;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .card__info {
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 24px 24px 24px;
  }
`;

const CardTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 35px;
  color: #111111;
  font-family: 'Noto Sans KR';
`;

const CardContent = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 140%;
  /* or 17px */
  text-align: center;

  color: #565656;
  margin-top: 15%;
  font-family: 'Inter';
`;

export default GroupCards;
