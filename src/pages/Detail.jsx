import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import apiClient from '../api/apiClient'; 
import Rating from '../components/search/Rating';
import ModalButton from '../components/modalButton/ModalCustomButton';
import ActivityCard from '../components/group/ActivityCard';
import ProgressGroup from '../components/group/ProgressGroup';
import Loding from '../animations/Loding'

const Detail = () => {
  const { isbn13 } = useParams();
  const [bookData, setBookData] = useState(null);
  const [recruitingGroups, setRecruitingGroups] = useState([]);
  const [inProgressGroups, setInProgressGroups] = useState([]);
  const [completedGroups, setCompletedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 책 정보와 그룹 리스트 데이터를 병렬로 가져오기
  useEffect(() => {
    const fetchBookAndGroupData = async () => {
      try {
        setLoading(true);
  
        const bookResponse = await apiClient.post('/books/detail', { isbn13 });
        setBookData(bookResponse.data);
  
        // 비구조화 할당 및 데이터 디버깅
        const [recruitingResponse, inProgressResponse, completedResponse] = await Promise.all([
          apiClient.get(`/groups/list/recruiting`, { params: { isbn13 } }),
          apiClient.get(`/groups/list/in-progress`, { params: { isbn13 } }),
          apiClient.get(`/groups/list/completed`, { params: { isbn13 } }),
        ]);
  
        // 데이터 확인
        console.log('Recruiting Response:', recruitingResponse.data);
        console.log('In Progress Response:', inProgressResponse.data);
        console.log('Completed Response:', completedResponse.data);
  
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
  console.log('Recruiting Response:', recruitingResponse.data);
  console.log('Recruiting Groups Type:', typeof recruitingResponse.data);
  console.log('Is Recruiting Groups Array?', Array.isArray(recruitingResponse.data));

  return (
    <Container>
      {/* 책 정보 섹션 */}
      <BookDetailWrapper>
        <BookCover>
          <img src={bookData.cover} alt="Book cover" />
        </BookCover>

        <StyledBookInfo>
          <Title>{bookData.title}</Title>
          <InfoSection>
            <InfoRow>
              <Label>저자:</Label>
              <InfoText>{bookData.author}</InfoText>
            </InfoRow>
            <InfoRow>
              <Label>출판사:</Label>
              <InfoText>{bookData.publisher}</InfoText>
            </InfoRow>
            <InfoRow>
              <Label>ISBN13:</Label>
              <InfoText>{isbn13}</InfoText>
            </InfoRow>
            <InfoRow>
              <Label>전체 페이지:</Label>
              <InfoText>{bookData.subInfo?.itemPage || '정보 없음'}쪽</InfoText>
            </InfoRow>
            <InfoRow>
              <Label>알라딘 평점:</Label>
              <Rating
                rating={(bookData.customerReviewRank / 2) || 0}
                totalStars={5}
              />
            </InfoRow>
          </InfoSection>
          <ModalButton
            onClick={handleButtonClick}
            width="168px"
            height="44px"
            fontWeight="500"
          >
            새로 생성하기
          </ModalButton>
        </StyledBookInfo>
      </BookDetailWrapper>

      {/* 모집 중인 그룹 섹션 */}
      <GroupWrapper>
        <GroupSection>
          <GroupTitle>모집중인 그룹</GroupTitle>
          <ActivityList>
          {Array.isArray(recruitingGroups) && recruitingGroups.length > 0 ? (
            recruitingGroups.map((group) => (
              <ActivityCard
                key={group.groupId}
                activity={{
                  groupName: group.groupName,
                  pageInfo: group.goalContent,
                  membersCount: `${group.currentMembers}/${group.maxMembers}명`,
                }}
                completed={false}
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
            {inProgressGroups.length > 0 ? (
              inProgressGroups.map((group) => (
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
            {completedGroups.length > 0 ? (
              completedGroups.map((group) => (
                <ActivityCard
                  key={group.groupId}
                  activity={{
                    groupName: group.groupName,
                    pageInfo: group.goalContent,
                    membersCount: `${group.currentMembers}/${group.maxMembers}명`,
                  }}
                  completed={true}
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
  top: 160px;
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