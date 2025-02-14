import { useState, useEffect } from 'react';
import styled from 'styled-components';
import WhiteButton from '../components/button/whitebutton';
import RankingList1 from '../components/Ranking/RankingList1';
import GroupThoughts from '../components/Ranking/GroupThoughts';
import ImgComment from '../components/Ranking/ImgComment';
import BookCard from '../components/Ranking/BookCard';
import RatingPopup from '../components/popup/RatingPopup/RatingPopup';
import CheckpointRecordPopup from '../components/popup/CheckpointRecordPopup/CheckpointRecordPopup';
import ToggleOn from '../assets/Toggle/ToggleOn.svg';
import ToggleOff from '../assets/Toggle/ToggleOff.svg';

const BookProgress = () => {
  const [RatingModalOpen, setRatingModalOpen] = useState(false);
  const [CheckpointModalOpen, setCheckpointModalOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isToggled, setIsToggled] = useState(true);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);

  const toggleSwitch = () => {
    setIsToggled((prevState) => !prevState);
  };

  useEffect(() => {
    console.log('선택된 책 목록:', selectedBooks);
  }, [selectedBooks]);

  const handleReviewSubmit = (newRating, newReviewText) => {
    setRating(newRating);
    setReviewText(newReviewText);
    setHasReviewed(true);
    setRatingModalOpen(false);
  };
  const handleSelectItem = (item) => {
    const newBooks = [
      {
        imageSrc: 'https://via.placeholder.com/150',
        title: `${item.name}의 첫 번째 책`,
        description: `이 책은 ${item.name}의 첫 번째 작품입니다.`,
      },
      {
        imageSrc: 'https://via.placeholder.com/150',
        title: `${item.name}의 두 번째 책`,
        description: `이 책은 ${item.name}의 두 번째 작품입니다.`,
      },
      {
        imageSrc: 'https://via.placeholder.com/150',
        title: `${item.name}의 세 번째 책`,
        description: `이 책은 ${item.name}의 세 번째 작품입니다.`,
      },
    ];

    console.log('새로 추가될 책 목록:', newBooks);
    setSelectedBooks(newBooks);
  };

  return (
    <>
      <ImageContainer>
        <Image src="../../public/images/cover/dinnerindrawer.png" />
        <GradientOverlay />
        <Close>그룹종료</Close>
        <ContentWrapper>
          <LeftContent>
            <span>페이지</span>
            <GroupInfo>
              <Title>한강 작가 책 도장깨기</Title>
              <WhiteButton>
                {isToggled ? '템플릿 공개' : '템플릿 비공개'}
                <img
                  src={isToggled ? ToggleOn : ToggleOff}
                  alt="Toggle"
                  onClick={toggleSwitch}
                  style={{ cursor: 'pointer' }}
                />
              </WhiteButton>
            </GroupInfo>
            <SubTitle>서랍에 저녁을 넣어 두었다</SubTitle>
            <GroupInfo>
              <span>한강 저</span>
            </GroupInfo>
          </LeftContent>
          <GroupInfo>
            {!hasReviewed ? (
              <WhiteButton onClick={() => setRatingModalOpen(true)}>
                리뷰
              </WhiteButton>
            ) : (
              <>
                <div>
                  <p>리뷰</p>
                  <p>
                    {rating}점: {reviewText}
                  </p>
                </div>
              </>
            )}
            <WhiteButton onClick={() => setCheckpointModalOpen(true)}>
              체크포인트 기록
            </WhiteButton>
          </GroupInfo>
        </ContentWrapper>
      </ImageContainer>

      <RankWrapper>
        <RankingList1 onSelectItem={handleSelectItem} />
        {selectedBooks.map((book, index) => (
          <BookCard key={index} bookData={book} />
        ))}
      </RankWrapper>

      <CommentWrapper>
        <GroupThoughts />
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

      {RatingModalOpen && (
        <RatingPopup
          onClose={() => setRatingModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
      {CheckpointModalOpen && (
        <CheckpointRecordPopup
          // onClose={() => setCheckpointModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};

export default BookProgress;

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
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0.5),
    rgba(0, 0, 0, 0.5)
  );
`;
const Close = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  color: #d5d5d5;
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

const ImgCommentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const RankWrapper = styled.div`
  margin-bottom: 120px;
`;
