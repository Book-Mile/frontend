import styled from 'styled-components';
import Rating from './Rating'; /* eslint-disable react/prop-types */

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  gap: 0.625rem;
  padding: 0.875rem 2rem;
  border-radius: 20px;
  background-color: white;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 0.625rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 0.625rem;
`;

const Text = styled.p`
  margin: 0;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0.875rem;
  text-align: left;
  color: #565656;
`;

const ReviewText = styled.p`
  margin: 0;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0.875rem;
  text-align: left;
  color: #565656;
`;

const ReviewCard = ({ name, date, review, rating }) => {
  return (
    <Container>
      <InnerContainer>
        <Rating
          rating={rating}
          totalStars={5}
          starSize="20px"
          fontSize="16px"
        />
        <TopRow>
          <Text>{name}</Text>
          <Text>{date}</Text>
        </TopRow>
        <ReviewText>{review}</ReviewText>
      </InnerContainer>
    </Container>
  );
};

export default ReviewCard;
