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
  padding: 2rem 2rem;
  border-radius: 20px;
  background-color: white;
  border: 1px solid #d9d9d9;
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
  font-size: 0.75rem;
  text-align: left;
  color: #565656;
`;

const ReviewText = styled.p`
  margin: 0;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 1rem;
  text-align: left;
  font-weight: 500;
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
