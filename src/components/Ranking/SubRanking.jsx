import React from 'react';
import SubItem from './SubItem'; // SubItem 컴포넌트를 import

import styled from 'styled-components';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 390px;
  height: 430px;
  position: relative;
  overflow: hidden;
  gap: 20px;
  padding: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

// 화살표 스타일
const ArrowIcon = styled.svg`
  width: 100%;
  height: 24px;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
`;

const SubRanking = () => {
  const data = [
    { rank: 4, name: "미친운체개발자", percentage: 87, profileImage: '' },
    { rank: 5, name: "미친운체개발자", percentage: 75, profileImage: '' },
    { rank: 6, name: "미친운체개발자", percentage: 67, profileImage: '' },
    { rank: 7, name: "미친운체개발자", percentage: 43, profileImage: '' },
    { rank: 8, name: "미친운체개발자", percentage: 27, profileImage: '' },
  ];

  return (
    <Container>
      {data.map(item => (
        <SubItem 
          key={item.rank} 
          rank={item.rank} 
          profileImage={item.profileImage} 
          name={item.name} 
          percentage={item.percentage} 
        />
      ))}
      <ArrowIcon viewBox="0 0 390 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path d="M188 8L195.5 16L203 8" stroke="#4E202A" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="390" fill="white" transform="translate(0 24) rotate(-90)" />
          </clipPath>
        </defs>
      </ArrowIcon>
    </Container>
  );
};

export default SubRanking;
