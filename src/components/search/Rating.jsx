/* eslint-disable react/prop-types */
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: 400;
  color: #565656;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.div`
  width: ${(props) => props.size || '14px'};
  height: ${(props) => props.size || '14px'};
  position: relative;
  background: ${(props) => {
    const quarter = props.filled;
    if (quarter === 1) {
      return props.theme.colors.main;
    } else if (quarter === 0.75) {
      return `linear-gradient(90deg, ${props.theme.colors.main} 75%, #D3D3D3 25%)`;
    } else if (quarter === 0.5) {
      return `linear-gradient(90deg, ${props.theme.colors.main} 50%, #D3D3D3 50%)`;
    } else if (quarter === 0.25) {
      return `linear-gradient(90deg, ${props.theme.colors.main} 25%, #D3D3D3 75%)`;
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
  color: ${(props) => props.theme.colors.main};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: 900;
`;

const Rating = ({ rating, totalStars = 5, starSize, fontSize }) => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const quarterStars = Math.floor(decimal * 4);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(1);
  }

  if (quarterStars === 1) stars.push(0.25);
  else if (quarterStars === 2) stars.push(0.5);
  else if (quarterStars === 3) stars.push(0.75);

  while (stars.length < totalStars) {
    stars.push(0);
  }

  return (
    <RatingContainer fontSize={fontSize}>
      <StarContainer>
        {stars.map((star, index) => (
          <Star key={index} filled={star} size={starSize} />
        ))}
      </StarContainer>
      <RatingNumber fontSize={fontSize}>{rating.toFixed(1)}</RatingNumber>
    </RatingContainer>
  );
};

export default Rating;
