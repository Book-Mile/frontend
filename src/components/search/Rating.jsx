import React from 'react';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #565656;
`;

const Star = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  background: ${props => {
    if (props.filled === 'full') {
      return props.theme.colors.main;
    } else if (props.filled === 'half') {
      return `linear-gradient(90deg, ${props.theme.colors.main} 50%, #D3D3D3 50%)`;
    } else {
      return '#D3D3D3';
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

const Rating = ({ rating, totalStars }) => {
  const fullStars = Math.floor(rating / 2);
  const halfStars = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <RatingContainer>
      <div>평점: </div>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} filled="full" />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <Star key={fullStars + index} filled="half" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={fullStars + halfStars + index} filled="empty" />
      ))}
      <RatingNumber>{rating}</RatingNumber>
    </RatingContainer>
  );
};

export default Rating;
