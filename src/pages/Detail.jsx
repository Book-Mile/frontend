import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import apiClient from '../api/apiClient';
import Rating from '../components/search/Rating';
import ModalButton from '../components/modalButton/ModalCustomButton';
import ActivityCard from '../components/group/ActivityCard';
import ProgressGroup from '../components/group/ProgressGroup';
import Loding from '../animations/Loding';
import ReviewCard from '../components/search/ReviewCard';
import ReviewList from '../components/starRating/ReviewList';

const Detail = () => {
  const { isbn13 } = useParams();
  const [bookData, setBookData] = useState(null);
  const [BookId,setBookId] = useState(null);
  const [bookRating, setBookRating] = useState(0);
  const [recruitingGroups, setRecruitingGroups] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [inProgressGroups, setInProgressGroups] = useState([]);
  const [completedGroups, setCompletedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('detail')

  const detailRef = useRef(null);
  const reviewRef = useRef(null);

  const toggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleScrollToDetail = () => {
    setActiveTab('detail');
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleScrollToReviews = () => {
    setActiveTab('reviews');
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const fetchAllReviews = async (bookId) => {
    const pageSize = 1;
    let pageNumber = 1;
    let allReviews = [];
  
    try {
      while (true) {
        const response = await apiClient.get(`/reviews`, {
          params: { bookId, pageNumber, pageSize },
        });
    
        const reviews = response.data.response.content;
  
        if (!reviews || reviews.length === 0) break;
  
        const formattedReviews = reviews.map(review => ({
          username: review.name,
          date: formatDate(review.createdAt),
          comment: review.text,
          rating: review.rating,
        }));
  
        allReviews = [...allReviews, ...formattedReviews];
        pageNumber++;
      }
  
      setRecentReviews(allReviews);
    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchBookAndGroupData = async () => {
      try {
        setLoading(true);

        const bookResponse = await apiClient.post('/books/detail', { isbn13 });
        setBookData(bookResponse.data);

        const recruitingResponse = await apiClient.get(`/groups/list/recruiting`, { params: { isbn13 } });
        setRecruitingGroups(recruitingResponse.data || []);

        if (recruitingResponse.data?.response?.length > 0) {
          const groupId = recruitingResponse.data.response[0].groupId;
          const groupDetailResponse = await apiClient.get(`/groups/${groupId}`);
          const fixedBookId = groupDetailResponse.data.bookId;
          setBookId(fixedBookId);

          const ratingResponse = await apiClient.get(`/reviews/${fixedBookId}/total-rate`);
          setBookRating(ratingResponse.data.response || 0);

          const recentReviewsResponse = await apiClient.get(`/reviews/recent-reviews`, { params: { bookId: fixedBookId } });
          setRecentReviews(recentReviewsResponse.data.response || []);
          fetchAllReviews(fixedBookId);
        }

        const [inProgressResponse, completedResponse] = await Promise.all([
          apiClient.get(`/groups/list/in-progress`, { params: { isbn13 } }),
          apiClient.get(`/groups/list/completed`, { params: { isbn13 } }),
        ]);

        setInProgressGroups(inProgressResponse.data || []);
        setCompletedGroups(completedResponse.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndGroupData();
  }, [isbn13]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'detail') {
              setActiveTab('detail');
            } else if (entry.target.id === 'reviews') {
              setActiveTab('reviews');
            }
          }
        });
      },
      { threshold: 0.6 }
    );
  
    if (detailRef.current) observer.observe(detailRef.current);
    if (reviewRef.current) observer.observe(reviewRef.current);
  
    return () => {
      if (detailRef.current) observer.unobserve(detailRef.current);
      if (reviewRef.current) observer.unobserve(reviewRef.current);
    };
  }, []);

  const handleButtonClick = () => {
    window.location.href = `/creategroup?isbn=${isbn13}`;
  };

  const getRandomGroups = (groups, count) => {
    if (groups.length <= count) return groups;
    const shuffled = [...groups].sort(() => Math.random() - 0.5); 
    return shuffled.slice(0, count);
  };
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    return `${year}.${month}.${day}`;
  };

  const scrollToSection = (ref, tabName) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveTab(tabName);
    }
  };

  if (loading) return <Loding />;
  if (error) return <div>오류 발생: {error}</div>;
  
  return (
    <Container>
      {/* 책 정보 섹션 */}
      <BookDetailWrapper>
        {bookData && bookData.response && bookData.response.length > 0 ? (
          <>
            <BookCover>
              <img src={bookData.response[0].cover} alt="Book cover" />
            </BookCover>
  
            <StyledBookInfo>
              <TitleRow>
              <Title>{bookData.response[0].title}</Title>
              <Aladin src="/images/aladinlogo.png" alt="알라딘 연결 링크" onClick={() => window.open(`${bookData.response[0].link}`, "_blank")}/>
              </TitleRow>
              <InfoSection>
                <InfoRow>
                  <Label>저자:</Label>
                  <InfoText>{bookData.response[0].author}</InfoText>
                </InfoRow>
                <InfoRow>
                  <Label>출판사:</Label>
                  <InfoText>{bookData.response[0].publisher}</InfoText>
                </InfoRow>
                <InfoRow>
                  <Label>ISBN13:</Label>
                  <InfoText>{isbn13}</InfoText>
                </InfoRow>
                <InfoRow>
                  <Label>전체 페이지:</Label>
                  <InfoText>{bookData.response[0].subInfo?.itemPage || '정보 없음'}쪽</InfoText>
                </InfoRow>
                <InfoRow>
                  <Label>알라딘 평점:</Label>
                  <Rating rating={(bookData.response[0].customerReviewRank / 2) || 0} totalStars={5} />
                </InfoRow>
                <InfoRow>
                  <Label>BookMile 평점:</Label>
                  <Rating rating={bookRating} totalStars={5} />
                </InfoRow>
              </InfoSection>
  
              {/* 더보기 설명 */}
              <DescriptionWrapper>
                <Description isExpanded={isExpanded} onClick={toggleDescription}>
                  {bookData.response[0].description}
                  {!isExpanded && (
                    <Ellipsis onClick={toggleDescription}>...</Ellipsis>
                  )}
                </Description>
              </DescriptionWrapper>
  
              <ModalButton onClick={handleButtonClick} width="168px" height="44px" fontWeight="500">
                새로 생성하기
              </ModalButton>
            </StyledBookInfo>
          </>
        ) : (
          <Loding />
        )}
      </BookDetailWrapper>
  
      {/* 미리보기 리뷰 */}
      <PreviewRanking>
        <RatingRow>
          <GroupTitle>BookMile 리뷰</GroupTitle>
          <More onClick={handleScrollToReviews}>더보기</More>
        </RatingRow>
        <RatingRow>
        {recentReviews.length > 0 ? (
          recentReviews.map((review, index) => (
            <ReviewCard
              key={index}
              rating={review.rating}
              name={review.username} 
              date={review.date} 
              review={review.comment}
            />
          ))
        ) : (
          <EmptyMessage>리뷰가 없습니다.</EmptyMessage>
        )}
        </RatingRow>
      </PreviewRanking>
  
      {/* 모집 중인 그룹 섹션 */}
      <GroupWrapper ref={detailRef}>
        <GroupSection>
          <NavBar>
            <NavButton
              onClick={handleScrollToDetail}
              active={activeTab === 'detail'}
            >
              상세정보
            </NavButton>
            <NavButton
              onClick={handleScrollToReviews}
              active={activeTab === 'reviews'}
            >
              BookMile 리뷰
            </NavButton>
          </NavBar>

          <GroupTitle>모집중인 그룹</GroupTitle>
          <ActivityList>
            {recruitingGroups.response && recruitingGroups.response.length > 0 ? (
              getRandomGroups(recruitingGroups.response, 3).map((group) => (
                <ActivityCard
                  key={group.groupId}
                  activity={{
                    groupName: group.groupName,
                    pageInfo: group.groupDescription,
                    maxMembers: group.maxMembers,
                    currentMembers: group.currentMembers,
                    masterNickname: group.masterNickname,
                    masterImage: group.masterImage,
                    goalContent: group.goalContent,
                    goalType: group.goalType,
                    groupDescription: group.groupDescription,
                  }}
                  completed={group.status === 'COMPLETED'}
                />
              ))
            ) : (
              <EmptyMessage>현재 생성된 그룹이 없습니다.</EmptyMessage>
            )}
          </ActivityList>
        </GroupSection>
  
        {/* 진행 중인 그룹 섹션 */}
        <GroupSection>
          <GroupTitle>독서 진행중인 그룹</GroupTitle>
          <ActivityList>
            {inProgressGroups.response && inProgressGroups.response.length > 0 ? (
              getRandomGroups(inProgressGroups.response, 4).map((group) => (
                <ProgressGroup
                  key={group.groupId}
                  groupName={group.groupName}
                  pageInfo={group.goalContent}
                  membersCount={`${group.currentMembers}/${group.maxMembers}명`}
                />
              ))
            ) : (
              <EmptyMessage>현재 생성된 그룹이 없습니다.</EmptyMessage>
            )}
          </ActivityList>
        </GroupSection>
  
        {/* 완료된 그룹 섹션 */}
        <GroupSection>
          <GroupTitle>독서 완료 그룹</GroupTitle>
          <ActivityList>
            {completedGroups.response && completedGroups.response.length > 0 ? (
              getRandomGroups(completedGroups.response, 3).map((group) => (
                <ActivityCard
                  key={group.groupId}
                  activity={{
                    groupName: group.groupName,
                    pageInfo: group.groupDescription,
                    maxMembers: group.maxMembers,
                    currentMembers: group.currentMembers,
                    masterNickname: group.masterNickname,
                    masterImage: group.masterImage,
                    goalContent: group.goalContent,
                    goalType: group.goalType,
                  }}
                  completed={group.status === 'COMPLETED'}
                />
              ))
            ) : (
              <EmptyMessage>현재 생성된 그룹이 없습니다.</EmptyMessage>
            )}
          </ActivityList>
        </GroupSection>
      </GroupWrapper>

        <ReviewSection ref={reviewRef}>
          <NavBar>
            <NavButton
              onClick={handleScrollToDetail}
              active={activeTab === 'detail'}
            >
              상세정보
            </NavButton>
            <NavButton
              onClick={handleScrollToReviews}
              active={activeTab === 'reviews'}
            >
              BookMile 리뷰
            </NavButton>  
          </NavBar>

          <ALLRating>
            <GroupTitle>전체 평점</GroupTitle>
            <Rating rating={bookRating} totalStars={5} starSize="24px" fontSize="24px" />
          </ALLRating>
          {recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <ReviewList
                  username={review.username}
                  date={review.date}
                  comment={review.comment}
                  rating={review.rating}
                />
              ))
            ) : (
            <EmptyMessage>리뷰가 없습니다.</EmptyMessage>
          )}
        </ReviewSection> 
    </Container>
  );
};

export default Detail;

const EmptyMessage = styled.div`
  text-align: center;
  color: #999;
  margin-top: 1rem;
`;


const Container = styled.main`
  width: 1156px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  top: 80px;
  position: relative;
`;

const BookDetailWrapper = styled.article`
  display: flex;
  gap: 106px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const BookCover = styled.figure`
  width: 330px;
  height: 466px;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  box-shadow:
    29px 280px 79px 0 rgba(0, 0, 0, 0),
    19px 179px 72px 0 rgba(0, 0, 0, 0.01),
    10px 101px 61px 0 rgba(0, 0, 0, 0.05),
    5px 45px 45px 0 rgba(0, 0, 0, 0.09),
    1px 11px 25px 0 rgba(0, 0, 0, 0.1);

  img {
    width: 330px;
    height: 466px;
    object-fit: cover;
  }
`;

const StyledBookInfo = styled.section`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  word-wrap: break-word;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: start;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.body};
  margin: 0;
`;
const Aladin = styled.img`
  object-fit: cover;
  width: 56px;
  height: 30px;
  cursor: pointer;
  margin-top: 10px;
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Label = styled.span`
  font-size: 16px;
  color: #565656;
  font-weight: 400;
  width: 120px;
  text-align: left;
`;

const InfoText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.body};
  text-align: left;
`;

const DescriptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.body};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.isExpanded ? 'unset' : 3)};
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const Ellipsis = styled.span`
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  padding-left: 10px;
  cursor: pointer;
`;
const PreviewRanking = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const RatingRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupWrapper = styled.section`
  margin: 120px 0;
`;

const GroupSection = styled.section`
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const GroupTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.colors.body};
`;

const More = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.colors.body};

`;

const ActivityList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ALLRating = styled.div`
  display: flex;
  gap: 32px;
  `;

const NavBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  `;

  const NavButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => (props.active ? props.theme.colors.body : '#565656')};
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  transition: background 0.3s;
  border-bottom: 4px solid ${(props) => (props.active ? props.theme.colors.main : '#D9D9D9')};
  padding: 10px 30px;
  cursor: pointer;
`;

const ReviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: #f9f9f9;
`;

