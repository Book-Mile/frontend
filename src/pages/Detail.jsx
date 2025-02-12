
import { useState } from 'react';
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

const Detail = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const bookData = {
    title: '젊은 베르테르의 슬픔',
    author: '요한 볼프강 폰 괴테',
    publisher: '민음사',
    isbn: '9788937460258',
    pageCount: 244,
    chapters: '12',
    aladinRating: 8.8 * 0.5,
    bookmileRating: 4.2,
    coverUrl: '../../public/images/cover/werther.png',
    description:
      '질풍노도의 시대를 이끈 청년 괴테의 대표작 청춘의 열병, 이룰 수 없는 사랑의 상징이 된 이름 세계적인 베스트셀러가 된 최초의 독일소설 “인간을 행복하게 만드는 것이 동시에 불행의 원천이 될 수 있다는 사실은 과연 필연인 것일까?” 괴테는 25세 되던 해 봄, 이미 약혼자가 있었던 샤로테 부프를 사랑하게 되었다. 그녀를 향한 이룰 수 없는 사랑에 절망한 나머지 괴테는 도망치다시피 귀향했다. 그 후 그의 친구 예루살렘이 남편이 있는 부인에게 연정을 품다가 자살했다는 소식을 들었다. 괴테는 마신에 홀린 것 같은 상태에서 예루살렘의 이야기와 자신의 체험을 엮어 불과 14주 만에 『젊은 베르테르의 슬픔』이라는 문제작을 완성했다. 이 작품은 1774년 출간되자마자 젊은 독자층을 완전히 감동의 소용돌이 속에 몰아넣었다. 실연당한 남자들이 베르테르처럼 자살하는 일도 있었고, 젊은 남자들은 노랑 조끼에 파랑 상의를 입었으며 여자들은 로테처럼 사랑받기를 원했다. ‘질풍노도의 시대’를 이끈 청년 괴테의 대표작이자 세계적으로 가장 많은 독자를 가지게 된 이 작품은 사랑의 열병을 앓는 전 세계 젊은이들의 영혼을 울렸다. 젊은 날의 생생한 사랑의 체험에서 나오는 생명감과 순수한 열정이 이토록 섬세하고 아름답게 묘사된 예는 다시 찾아볼 수 없을 것이다.',
  };

  const handleButtonClick = () => {
    window.location.href = `/creategroup?isbn=${bookData.isbn}`;
  };

  const [activityData] = useState([
    {
      groupName: '베르테르 독서모임',
      pageInfo: '20페이지 씩',
      membersCount: '10명',
    },
    {
      groupName: '문학적 탐방',
      pageInfo: '50페이지 씩',
      membersCount: '15명',
    },
    {
      groupName: '책과 함께하는 나의 여정',
      pageInfo: '30횟수',
      membersCount: '8명',
    },
  ]);

  // 진행중인 그룹 데이터
  const [progressGroupData] = useState([
    {
      groupName: '젊은 베르테르의 진행 모임',
      pageInfo: '15페이지 씩 진행 중',
      membersCount: '12명',
    },
    {
      groupName: '고전 독서클럽',
      pageInfo: '25페이지 씩 진행 중',
      membersCount: '20명',
    },
    {
      groupName: '고전 독서클럽',
      pageInfo: '25페이지 씩 진행 중',
      membersCount: '20명',
    },
  ]);

  // 완료된 그룹 데이터
  const [completedGroupData] = useState([
    {
      groupName: '완료된 그룹 A',
      pageInfo: '20페이지',
      membersCount: '10명',
    },
    {
      groupName: '완료된 그룹 B',
      pageInfo: '나만의 속도',
      membersCount: '5명',
    },
    {
      groupName: '완료된 그룹 B',
      pageInfo: '30페이지',
      membersCount: '5명',
    },
  ]);

  const toggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <Container>
      <BookDetailWrapper>
        {/* 책 커버 */}
        <BookCover>
          <img src={bookData.coverUrl} alt="Book cover" />
        </BookCover>

        {/* 책 정보 */}
        <StyledBookInfo>
          <Title>{bookData.title}</Title>

          {/* 저자, 출판사, ISBN 등 정보 */}
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
              <InfoText>{bookData.isbn}</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>전체 페이지:</Label>
              <InfoText>{bookData.pageCount}쪽</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>챕터:</Label>
              <InfoText>{bookData.chapters}</InfoText>
            </InfoRow>

            <InfoRow>
              <Label>알라딘 평점:</Label>
              <Rating rating={bookData.aladinRating} totalStars={5} />
            </InfoRow>
            <InfoRow>
              <Label>BookMile 평점:</Label>
              <Rating rating={bookData.bookmileRating} totalStars={5} />
            </InfoRow>
          </InfoSection>

          {/* 더보기 설명 */}
          <DescriptionWrapper>
            <Description isExpanded={isExpanded} onClick={toggleDescription}>
              {bookData.description}
              {!isExpanded && (
                <Ellipsis onClick={toggleDescription}>...</Ellipsis>
              )}
            </Description>
          </DescriptionWrapper>
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

      {/*미리보기 리뷰*/}
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

      <GroupWrapper>
        {/* 모집중인 그룹 */}
        <GroupSection>
          <GroupTitle>모집중인 그룹</GroupTitle>
          <ActivityList>
            {activityData.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity.groupName}
                completed={false}
              />
            ))}
          </ActivityList>
        </GroupSection>

        {/* 독서 진행중인 그룹 */}
        <GroupSection>
          <GroupTitle>독서 진행중인 그룹</GroupTitle>
          <ActivityList>
            {progressGroupData.map((activity, index) => (
              <ProgressGroup
                key={index}
                groupName={activity.groupName}
                pageInfo={activity.pageInfo}
                membersCount={activity.membersCount}
              />
            ))}
          </ActivityList>
        </GroupSection>

        {/* 독서 완료 그룹 */}
        <GroupSection>
          <GroupTitle>독서 완료 그룹</GroupTitle>
          <ActivityList>
            {completedGroupData.map((activity, index) => (
              <ActivityCard key={index} activity={activity} completed={true} />
            ))}
          </ActivityList>
        </GroupSection>
      </GroupWrapper>
    </Container>
  );
};

export default Detail;
