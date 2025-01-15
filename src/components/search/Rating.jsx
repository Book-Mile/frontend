import React from 'react';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #565656;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  background: ${props => {
    // 채워진 정도에 따라 다르게 설정
    const quarter = props.filled;
    if (quarter === 1) {
      return props.theme.colors.main; // 꽉 찬 별
    } else if (quarter === 0.75) {
      return `linear-gradient(90deg, ${props.theme.colors.main} 75%, #D3D3D3 25%)`; // 75% 채운 별
    } else if (quarter === 0.5) {
      return `linear-gradient(90deg, ${props.theme.colors.main} 50%, #D3D3D3 50%)`; // 반 별
    } else if (quarter === 0.25) {
      return `linear-gradient(90deg, ${props.theme.colors.main} 25%, #D3D3D3 75%)`; // 25% 채운 별
    } else {
      return '#D3D3D3'; // 비어있는 별
    }
  }};
  border-radius: 50%;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;

const RatingNumber = styled.div`
  color: ${props => props.theme.colors.main};
  font-size: 14px;
  font-weight: 900;
`;

const Rating = ({ rating, totalStars = 5 }) => {
  // 5점 만점에 맞춰서 반영
  const fullStars = Math.floor(rating); // 정수 부분 (꽉 찬 별)
  const decimal = rating - fullStars; // 소수점 부분
  const quarterStars = Math.floor(decimal * 4); // 소수점에 따른 0.25, 0.5, 0.75 구하기
  const stars = [];

  // 꽉 찬 별
  for (let i = 0; i < fullStars; i++) {
    stars.push(1); // 꽉 찬 별
  }

  // 세분화된 별 처리 (0.25, 0.5, 0.75 채운 별)
  if (quarterStars === 1) stars.push(0.25); // 0.25 채운 별
  else if (quarterStars === 2) stars.push(0.5); // 0.5 채운 별
  else if (quarterStars === 3) stars.push(0.75); // 0.75 채운 별

  // 빈 별 처리
  while (stars.length < totalStars) {
    stars.push(0); // 빈 별
  }

  return (
    <RatingContainer>
      <StarContainer>
      {stars.map((star, index) => (
        <Star key={index} filled={star} />
      ))}
      </StarContainer>
      <RatingNumber>{rating.toFixed(1)}</RatingNumber>
    </RatingContainer>
  );
};

export default Rating;
