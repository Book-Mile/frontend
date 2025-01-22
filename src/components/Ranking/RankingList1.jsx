import React from 'react';
import styled, { keyframes } from 'styled-components';
import SubRanking from './SubRanking';

// 애니메이션 정의: 이미지들이 아래에서 위로 올라오는 애니메이션
const slideUp = (delay) => keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 583px;
  position: relative;
  overflow: visible;
`;

const Background = styled.div`
  width: 1200px;
  height: 583px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  /* Background를 기준으로 위치 지정 */
`;

const SvgOne = styled.svg`
  position: absolute;
  left: 256.5px;  /* Background 내에서의 위치 */
  top: -6.23px;
`;

const SvgTwo = styled.svg`
  position: absolute;
  left: -35.5px;  /* Background 내에서의 위치 */
  top: 56.49px;
`;

const ImageOne = styled.img`
  width: 300px;
  height: 614.22px;
  position: absolute;
  left: 267.5px;  /* Background 내에서의 위치 */
  top: 50px;
  object-fit: contain;
  animation: ${({ delay }) => slideUp(delay)} 1s ease-out forwards;
`;

const ImageTwo = styled.img`
  width: 300px;
  height: 571.73px;
  position: absolute;
  left: 130.5px;  /* Background 내에서의 위치 */
  top: 181.72px;
  object-fit: contain;
  animation: ${({ delay }) => slideUp(delay)} 2s ease-out forwards;
`;

const ImageThree = styled.img`
  width: 300px;
  height: 571.73px;
  position: absolute;
  left: 379.5px;  /* Background 내에서의 위치 */
  top: 248.04px;
  object-fit: contain;
  animation: ${({ delay }) => slideUp(delay)} 3s ease-out forwards;
`;

const SubRankingContainer = styled.div`
  position: absolute;
  left: 1079.5px;  /* Background 내에서의 위치 */
  top: 40px;
  object-fit: contain;
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
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={300} result="effect1_foregroundBlur_507_2279" />
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
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={300} result="effect1_foregroundBlur_507_2280" />
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

const MyComponent = () => {
  return (
    <Container>
      <div>
        <Background>
          <ImageOne src="../../../public/images/ranking/rectangle1.png" delay="0s" />
          <ImageTwo src="../../../public/images/ranking/rectangle2.png" delay="0.3s" />
          <ImageThree src="../../../public/images/ranking/rectangle3.png" delay="0.6s" />
        </Background>

        <SvgOne
          width="1183"
          height="583"
          viewBox="0 0 1183 583"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" /* 비율을 고정하지 않고 화면 크기에 맞게 설정 */
          >
          <g filter="url(#filter0_f_507_2279)">
            <ellipse cx="916.5" cy="-125.987" rx="316.5" ry="312.745" fill="url(#paint0_linear_507_2279)" />
          </g>
          <SvgGradientFilter />
        </SvgOne>

        <SvgTwo
          width="753"
          height="583"
          viewBox="0 0 753 583"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" /* 비율을 고정하지 않고 화면 크기에 맞게 설정 */
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
      </div>
      <SubRankingContainer>
        <SubRanking />
      </SubRankingContainer>
    </Container>
  );
};

export default MyComponent;
