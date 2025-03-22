/* eslint-disable react/prop-types */
import styled, { keyframes } from 'styled-components';
import SubRanking from './SubRanking';
import DefaultProfile from '../../../public/images/profile.png';

const RankingList1 = ({ onSelectItem, progressData }) => {
  const responseData = progressData?.response;

  if (!Array.isArray(responseData)) {
    console.error("progressData가 배열이 아닙니다:", progressData);
    return <NoData>데이터 형식 오류입니다.</NoData>;
  }

  if (responseData.length === 0) {
    return <NoData>데이터가 없습니다.</NoData>;
  }

  const sortedData = [...responseData]
    .sort((a, b) => parseFloat(b.progress) - parseFloat(a.progress))
    .map((item) => ({
      ...item,
      progress: Math.floor(parseFloat(item.progress)),
    }));
  const topRanks = sortedData.slice(0, 3);
  const remainingRanks = sortedData.slice(3);
  

  return (
    <Container>
      <SvgOne
        viewBox="0 0 1183 583"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g filter="url(#filter0_f_507_2279)">
          <ellipse
            cx="916.5"
            cy="-125.987"
            rx="316.5"
            ry="312.745"
            fill="url(#paint0_linear_507_2279)"
          />
        </g>
        <SvgGradientFilter />
      </SvgOne>

      <SvgTwo
        width="753"
        height="583"
        viewBox="0 0 753 583"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g filter="url(#filter0_f_507_2280)">
          <ellipse
            cx="257.474"
            cy="254.419"
            rx="257.474"
            ry="254.419"
            transform="matrix(0.999952 -0.00974339 0.00997875 0.99995 -365 423.987)"
            fill="url(#paint0_linear_507_2280)"
          />
        </g>
        <SvgGradientFilterTwo />
      </SvgTwo>

      <MainWapper>
        <Background>
          {topRanks[0] && (
            <One>
              <ProfileImage src={topRanks[0].profile || DefaultProfile} />
              <Name>{topRanks[0].nickname}</Name>
            </One>
          )}
          {topRanks[1] && (
            <Two>
              <ProfileImage src={topRanks[1].profile || DefaultProfile} />
              <Name>{topRanks[1].nickname}</Name>
            </Two>
          )}
          {topRanks[2] && (
            <Three>
              <ProfileImage src={topRanks[2].profile || DefaultProfile} />
              <Name>{topRanks[2].nickname}</Name>
            </Three>
          )}

          {topRanks[0] && <PercentOne>{topRanks[0].progress}%</PercentOne>}
          {topRanks[1] && <PercentTwo>{topRanks[1].progress}%</PercentTwo>}
          {topRanks[2] && <PercentThree>{topRanks[2].progress}%</PercentThree>}

          {topRanks[0] && <ImageOne src="../../../public/images/ranking/rectangle1.png" />}
          {topRanks[1] && <ImageTwo src="../../../public/images/ranking/rectangle2.png" />}
          {topRanks[2] &&<ImageThree src="../../../public/images/ranking/rectangle3.png" />}
        </Background>
      </MainWapper>

      <SubRankingContainer>
        <SubRanking onSelectItem={onSelectItem} remainingRanks={remainingRanks} />
      </SubRankingContainer>
    </Container>
  );
};

export default RankingList1;

const slideUp = () => keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NoData = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #999;
`;

const Container = styled.div`
  width: 100%;
  height: 583px;
  position: relative;
  overflow: hidden;
`;

const Background = styled.div`
  height: 583px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const MainWapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const SvgOne = styled.svg`
  position: absolute;
  left: 256.5px;
  top: -6.23px;
`;

const SvgTwo = styled.svg`
  position: absolute;
  left: -35.5px;
  top: 56.49px;
`;

const ImageOne = styled.img`
  width: 300px;
  height: 614.22px;
  position: absolute;
  left: 267.5px;
  top: 50px;
  object-fit: contain;
  animation: ${({ delay }) => slideUp(delay)} 1s ease-out forwards;
`;

const ImageTwo = styled.img`
  width: 300px;
  height: 571.73px;
  position: absolute;
  left: 130.5px;
  top: 181.72px;
  object-fit: contain;
  animation: ${({ delay }) => slideUp(delay)} 2s ease-out forwards;
`;

const ImageThree = styled.img`
  width: 300px;
  height: 571.73px;
  position: absolute;
  left: 379.5px;
  top: 248.04px;
  object-fit: contain;
  animation: ${({ delay }) => slideUp(delay)} 3s ease-out forwards;
`;

const SubRankingContainer = styled.div`
  position: absolute;
  left: 1060px;
  top: 40px;
  @media (max-width: 1800px) {
    position: absolute;
    left: 960px;
    top: 40px;
  }
  @media (max-width: 1490px) {
    position: absolute;
    left: 760px;
    top: 40px;
  }
  @media (max-width: 900px) {
    left: 760px;
    top: 40px;
    flex-direction: column;
    display: flex;
  }
`;

const PercentOne = styled.div`
  position: absolute;
  left: 375px;
  top: 200px;
  z-index: 3;
  font-weight: 800;
  font-size: 1.75rem;
  color: #cc645f;
  animation: ${({ delay }) => slideUp(delay)} 1s ease-out forwards;
`;
const PercentTwo = styled.div`
  position: absolute;
  left: 250.5px;
  top: 331.72px;
  z-index: 3;
  font-weight: 800;
  font-size: 1.75rem;
  color: #7da3c9;
  animation: ${({ delay }) => slideUp(delay)} 2s ease-out forwards;
`;
const PercentThree = styled.div`
  position: absolute;
  left: 500.5px;
  top: 401.72px;
  z-index: 3;
  font-weight: 800;
  font-size: 1.75rem;
  color: #e39191;
  animation: ${({ delay }) => slideUp(delay)} 3s ease-out forwards;
`;
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
const Name = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const One = styled.div`
  position: absolute;
  left: 365px;
  top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  gap: 10px;
  animation: ${({ delay }) => slideUp(delay)} 1s ease-out forwards;
`;

const Two = styled.div`
  position: absolute;
  left: 220px;
  top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  gap: 10px;
  animation: ${({ delay }) => slideUp(delay)} 2s ease-out forwards;
`;

const Three = styled.div`
  position: absolute;
  left: 480px;
  top: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  gap: 10px;
  animation: ${({ delay }) => slideUp(delay)} 3s ease-out forwards;
`;

const SvgGradientFilter = () => (
  <>
    <defs>
      <filter
        id="filter0_f_507_2279"
        x={0}
        y="-1038.73"
        width={1833}
        height="1825.49"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={300}
          result="effect1_foregroundBlur_507_2279"
        />
      </filter>
      <linearGradient
        id="paint0_linear_507_2279"
        x1="887.98"
        y1="69.1695"
        x2="1185.27"
        y2="92.8299"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D0CFFF" />
        <stop offset={1} stopColor="#F65E5E" />
      </linearGradient>
    </defs>
  </>
);

const SvgGradientFilterTwo = () => (
  <>
    <defs>
      <filter
        id="filter0_f_507_2280"
        x="-962.474"
        y="-178.534"
        width="1714.95"
        height="1708.84"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={300}
          result="effect1_foregroundBlur_507_2280"
        />
      </filter>
      <linearGradient
        id="paint0_linear_507_2280"
        x1="428.222"
        y1="83.1506"
        x2="83.5338"
        y2="323.096"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D0CFFF" />
        <stop offset={1} stopColor="#F65E5E" />
      </linearGradient>
    </defs>
  </>
);


