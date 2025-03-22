import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import apiClient from '../api/apiClient';
import { getUserInfoFromToken } from '../api/getusertoken';

import WhiteButton from '../components/button/whitebutton';
import RankingList1 from '../components/Ranking/RankingList1';
import GroupThoughts from '../components/Ranking/GroupThoughts';
import ImgComment from '../components/Ranking/ImgComment';
import BookCard from '../components/Ranking/BookCard';

import RatingPopup from '../components/popup/RatingPopup/RatingPopup';
import CheckpointRecordPopup from '../components/popup/CheckpointRecordPopup/CheckpointRecordPopup';
import EndGroupPopup from '../components/popup/EndGroupPopup/EndGroupPopup';

import Loading from '../animations/Loading'
import ToggleOn from '../assets/Toggle/ToggleOn.svg';
import ToggleOff from '../assets/Toggle/ToggleOff.svg';

const BookProgress = () => {
  const [groupData, setGroupData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [isToggled, setIsToggled] = useState(null);
  const [RatingModalOpen, setRatingModalOpen] = useState(false);
  const [CheckpointModalOpen, setCheckpointModalOpen] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(null);
  const [externalData, setExternalData] = useState([]);
  const [imgComments, setImgComments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const groupId = searchParams.get("groupId");
  
  console.log("groupId",groupId)

    useEffect(() => {
      const fetchedToken = Cookies.get('accessToken');
      const fetchedUserInfo = getUserInfoFromToken(fetchedToken);
    
      setUserInfo(fetchedUserInfo);
    
    }, []);
  
    useEffect(() => {
      const fetchGroupData = async () => {
        try {
          const responseGroup = await apiClient.get(`/groups/${groupId}`);
          setGroupData(responseGroup.data);
  
          const responseMembers = await apiClient.get(`/groups/${groupId}/members`);
          setIsMember(responseMembers.data.some(member => member?.userId === userInfo?.userId));
  
          if (responseMembers.data.some(member => member?.userId === userInfo?.userId && member.role === 'MASTER')) {
            setIsMaster(true);
          }
  
          const response = await apiClient.get('/records/progress', {
            params: { groupId },
          });
          setProgressData(response.data || []);
        } catch (error) {
          console.error('데이터를 가져오는 중 오류 발생:', error);
          setIsLoading(false);
        }
      };
  
      if (groupId && userInfo) {
        fetchGroupData();
      }
    }, [groupId, userInfo]);


  useEffect(() => {
    const savedIsToggled = localStorage.getItem(`group_${groupId}_isToggled`);
    
    if (savedIsToggled !== null) {
      setIsToggled(JSON.parse(savedIsToggled)); 
    } else {
      setIsToggled(true); 
    }
  }, [groupId]);

  useEffect(() => {
    if (isToggled !== null) {
      localStorage.setItem(`group_${groupId}_isToggled`, JSON.stringify(isToggled));
    }
  }, [isToggled, groupId]);

  const toggleTemplate = async () => {
    try {
      await apiClient.patch(`/groups/${groupId}/private`, {
        isOpen: !isToggled,
      });
      setIsToggled((prev) => !prev);
      alert("템플릿 공개 설정이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error('템플릿 공개 상태 변경 실패:', error);
    }
  };

  useEffect(() => {
    const fetchRandomRecords = async () => {
      try {
        const response = await apiClient.get('/records/random', {
          params: { groupId },
        });
  
        if (response.data?.response) {
          const textComments = response.data.response.map(item => ({
            nickname: item.nickName,
            text: item.text,
            page: item.currentPage,
            imageSrc: item.userImageUrl
          }));
  
          const imageComments = response.data.response
            .filter(item => item.recordImageUrl)
            .map(item => ({
              nickname: item.nickName,
              comment: item.text,
              imageSrc: item.recordImageUrl,
            }));
  
          setExternalData(getRandomItems(textComments, 2));
          setImgComments(getRandomItems(imageComments, 2));
        }
      } catch (error) {
        console.error('랜덤 기록을 가져오는 중 오류 발생:', error);
      }
    };
  
    if (groupId) {
      fetchRandomRecords();
    }
  }, [groupId]);

  const handleReviewButtonClick = () => {
      if (!(isMaster || isMember)) {
        alert("그룹에 속한 멤버가 아닙니다!");
        return; 
      }
      setRatingModalOpen(true);
    };
  
    const handleCheckpointButtonClick = () => {
      if (!(isMaster || isMember)) {
        alert("그룹에 속한 멤버가 아닙니다!");
        return; 
      }
      setCheckpointModalOpen(true);
    };

    const handleReviewSubmit = (newRating, newReviewText) => {
      setRating(newRating);
      setReviewText(newReviewText);
      setHasReviewed(true);
      setRatingModalOpen(false);
  
      localStorage.setItem(
        `group_${groupId}_review`,
        JSON.stringify({ savedRating: newRating, savedReviewText: newReviewText })
      );
    };

  const getRandomItems = (array, count) => {
    if (array.length <= count) return array;
    return array.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const handleCloseClick = () => {
    setIsPopupOpen(true);
  };
  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    {isPopupOpen && <EndGroupPopup onClose={handlePopupClose} groupId={groupId} />}
    <ImageContainer>
      <Image cover={groupData?.book?.cover || ''} />
      <GradientOverlay />
      {isMaster && <Close onClick={handleCloseClick}>그룹 종료</Close>}
      <ContentWrapper>
        <LeftContent>
          <span>{groupData?.goalType === 'NUMBER' ? 'PAGE' : 'CUSTOM'}</span>
          <GroupInfo>
            <Title>{groupData?.groupName}</Title>
            {isMaster && (
              <WhiteButton onClick={toggleTemplate}>
                {isToggled ? '템플릿 공개' : '템플릿 비공개'}
                <img
                  src={isToggled ? ToggleOn : ToggleOff}
                  alt="Toggle"
                  style={{ cursor: 'pointer' }}
                />
              </WhiteButton>
            )}
          </GroupInfo>
          <SubTitle>{groupData?.book?.title}</SubTitle>
          <GroupInfo>
            <span>{groupData?.book?.author}</span>
          </GroupInfo>
        </LeftContent>
            <GroupInfo>
              {!hasReviewed ? (
                <WhiteButton onClick={handleReviewButtonClick}>
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
              <WhiteButton onClick={handleCheckpointButtonClick}>
                체크포인트 기록
              </WhiteButton>
            </GroupInfo>
        </ContentWrapper>
      </ImageContainer>

    <RankWrapper>
      <RankingList1 progressData={progressData} />
      {selectedBooks.map((book, index) => (
          <BookCard key={index} bookData={book} />
        ))}
    </RankWrapper>

      <CommentWrapper>
        <GroupThoughts groupThoughtsData={externalData} />
        <ImgCommentWrapper>
          {imgComments.map((comment, index) => (
            <ImgComment
              key={index}
              nickname={comment.nickname}
              comment={comment.comment}
              imageSrc={comment.imageSrc}
            />
          ))}
        </ImgCommentWrapper>
      </CommentWrapper>

      {RatingModalOpen && (
        <RatingPopup
          onClose={() => setRatingModalOpen(false)}
          onSubmit={handleReviewSubmit}
          id={groupData?.bookId}
        />
      )}
      {CheckpointModalOpen && (
        <CheckpointRecordPopup
          // onClose={() => setCheckpointModalOpen(false)}
          onSubmit={handleReviewSubmit}
          groupId={groupId}
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

const Image = styled.div`
  background-image: ${({ cover }) => `url(${cover})`};
  display: flex;
  height: 360px;
  align-items: flex-end;
  position: relative;
  width: 100%;
  background-position: center;
  background-size: cover;
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
