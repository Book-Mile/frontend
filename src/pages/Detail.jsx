import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import apiClient from '../api/apiClient';
import Rating from '../components/search/Rating';
import ModalButton from '../components/modalButton/ModalCustomButton';
import ActivityCard from '../components/group/ActivityCard';
import ProgressGroup from '../components/group/ProgressGroup';
import Loding from '../animations/Loding';
import ReviewCard from '../components/search/ReviewCard';

const Detail = () => {
  const { isbn13 } = useParams();
  const [bookData, setBookData] = useState(null);
  const [recruitingGroups, setRecruitingGroups] = useState([]);
  const [inProgressGroups, setInProgressGroups] = useState([]);
  const [completedGroups, setCompletedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchBookAndGroupData = async () => {
      try {
        setLoading(true);

        const bookResponse = await apiClient.post('/books/detail', { isbn13 });
        setBookData(bookResponse.data);

        const [recruitingResponse, inProgressResponse, completedResponse] = await Promise.all([
          apiClient.get(`/groups/list/recruiting`, { params: { isbn13 } }),
          apiClient.get(`/groups/list/in-progress`, { params: { isbn13 } }),
          apiClient.get(`/groups/list/completed`, { params: { isbn13 } }),
        ]);

        setRecruitingGroups(recruitingResponse.data || []);
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


  const handleButtonClick = () => {
    window.location.href = `/creategroup?isbn=${isbn13}`;
  };

  if (loading) return <Loding />;
  if (error) return <div>오류 발생: {error}</div>;

  const getRandomGroups = (groups, count) => {
    if (groups.length <= count) return groups;
    const shuffled = [...groups].sort(() => Math.random() - 0.5); // 배열을 랜덤하게 섞음
    return shuffled.slice(0, count); // 지정된 개수만큼 리턴
  };
  
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
              <Title>{bookData.response[0].title}</Title>
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
                  <Rating rating={4} totalStars={5} />
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
          <span>더보기</span>
        </RatingRow>
        <RatingRow>
          <ReviewCard
            rating={4}
            name="똑똑한황구30"
            date="25.01.15"
            review="진심 좋음... 그냥 왜 명작이라고 하는지 알 것 같은 기분"
          />
          <ReviewCard
            rating={3}
            name="똑똑한황구312"
            date="24.12.22"
            review="팀원들이 별로였음ㄹㅇ 근데 책 내용은 좋았음"
          />
        </RatingRow>
      </PreviewRanking>
  
      {/* 모집 중인 그룹 섹션 */}
      <GroupWrapper>
        <GroupSection>
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

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.body};
  margin: 0;
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
