import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const SubItem = ({ rank, profileImage, name, percentage }) => {
  const defaultImage = "../../../public/images/basic_profile.png";

  return (
    <Link
      to={`/checkpoints`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        width: '100%'
      }}
    >
    <Container>
      <Header>
        {/* 순위를 */}
        <Number>{rank}</Number>

        {/* 프로필 이미지, 없으면 기본 이미지 사용 */}
        <ProfileImageWrapper>
          <ProfileImage src={profileImage || defaultImage} alt="Profile" />
        </ProfileImageWrapper>

        <Content>
          <TitleWrapper>
            <Title>{name}</Title>
            <Percentage>{percentage}%</Percentage>
          </TitleWrapper>

          <ProgressBarWrapper>
            <ProgressBar percentage={percentage} />
          </ProgressBarWrapper>
        </Content>
      </Header>
    </Container>
    </Link>
  );
};

export default SubItem;


const progressAnimation = (percentage) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${percentage}%;
  }
`;

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  gap: 5px;
  width: 100%;
  height: 56px;
  cursor: pointer;
`;

// 순위 및 프로필 이미지 스타일
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 1rem;
  cursor: pointer;
`;

// 순위 번호 스타일
const Number = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 16px;
  text-align: left;
    min-width: 24px;
    text-align: center; 

`;

// 프로필 이미지 래퍼 스타일
const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  position: relative;
  border-radius: 47px;
  background-color: #e7e7e7;
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
`;

// 내용 부분 스타일
const Content = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  gap: 10px;
  width: 100%;

`;

// 제목 및 비율을 포함한 래퍼 스타일
const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
`;

// 이름 스타일
const Title = styled.p`
  margin: 0;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 16px;
  text-align: left;
`;

// 퍼센티지 스타일
const Percentage = styled.p`
  margin: 0;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;

// 진행바 스타일 (배경)
const ProgressBarWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 3px;
  width: 100%;
  background-color: #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => (props.percentage ? `${props.percentage}%` : "0%")}; 
  background-color: ${props => props.theme.colors.main};
  animation: ${props => progressAnimation(props.percentage)} 1s ease-in-out;
`;
