import React from 'react';
import styled, { keyframes } from 'styled-components';
import SearchBar from '../components/search/SearchBar';
import UpdateBook from '../components/main/updatebook'
import GrpRankPreview from '../components/main/GrpRankPreview';

const bookEffect = keyframes`
  0% {
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 0;
  }
  30% {
    transform: scale(1.2) translate(-30px, -20px) rotate(-10deg);
    opacity: 0.5;
  }
  60% {
    transform: scale(1.2) translate(30px, -20px) rotate(10deg);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
`;

const titleEffect = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const BackgroundCircle1 = styled.svg`
  position: absolute;
  top: 5vh;
  left: 45vw;
  width: 60vw;
  height: auto;
  animation: ${bookEffect} 1.5s ease-out forwards;
`;

const BackgroundCircle2 = styled.svg`
  position: absolute;
  top: 0vh;
  left: -6vw;
  height: auto;
  animation: ${bookEffect} 1.5s ease-out forwards;
`;

const MainWrapper = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f9f9f9;
`;

const MainContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1155px;
  height: 100vh;
  margin: 0 auto;
  text-align: left;
  z-index: 2;

  @media screen and (min-width: 1920px) {
    padding: 0 10%;
  }
`;


const MainTitle = styled.h1`
  letter-spacing:-0.1em;
  font-size: 4rem;
  font-weight: 900;
  color: #ab0909;
  margin: 0;
  animation: ${titleEffect} 1s ease-out forwards;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
  animation: ${titleEffect} 1s ease-out forwards;
`;


const Detail = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap:120px;
`;

const Letter = styled(MainTitle)`
  animation: ${titleEffect} 1s ease-out forwards;
`;



const Main = () => {
  return (
    <>
    <MainWrapper>
    <BackgroundCircle1
      width={1123}
      height={947}
      viewBox="0 0 1123 947"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_1320_733)">
        <circle cx="916.5" cy="30.5" r="316.5" fill="url(#paint0_linear_1320_733)" />
      </g>
      <defs>
        <filter
          id="filter0_f_1320_733"
          x={0}
          y={-886}
          width={1833}
          height={1833}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={300} result="effect1_foregroundBlur_1320_733" />
        </filter>
        <linearGradient
          id="paint0_linear_1320_733"
          x1="854.5"
          y1="-59.5"
          x2="1186.16"
          y2="240.554"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0CFFF" />
          <stop offset={1} stopColor="#F65E5E" />
        </linearGradient>
      </defs>
    </BackgroundCircle1>

    <BackgroundCircle2
      width={813}
      height={1701}
      viewBox="0 0 813 1701"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_1320_734)">
        <circle
          cx="-44.9999"
          cy={843}
          r="257.474"
          transform="rotate(-0.564967 -44.9999 843)"
          fill="url(#paint0_linear_1320_734)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1320_734"
          x="-902.475"
          y="-14.4741"
          width="1714.95"
          height="1714.95"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={300} result="effect1_foregroundBlur_1320_734" />
        </filter>
        <linearGradient
          id="paint0_linear_1320_734"
          x1="-44.9999"
          y1="585.526"
          x2="174.372"
          y2="1013.88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF2CF" />
          <stop offset={1} stopColor="#F65E5E" />
        </linearGradient>
      </defs>
    </BackgroundCircle2>




      
      <MainContent>
        <MainTitle>함께 공유하면서 책 읽는</MainTitle>
        <SearchContainer>
          <Letter>B</Letter>
          <SearchBar />
          <Letter>K</Letter>
        </SearchContainer>
        <Letter>Mile</Letter>
      </MainContent>
    </MainWrapper>
    <Detail>
      <GrpRankPreview/>
      <UpdateBook/>
    </Detail>
    </>
  );
};

export default Main;
