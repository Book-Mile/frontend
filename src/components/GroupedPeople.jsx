import styled from 'styled-components';
/* eslint-disable react/prop-types */
const FlexContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow: hidden;
  gap: 10px;
  margin: 0;
`;

const ItemNumber = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  width: 17px;
  height: 2.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.body};
`;

const StyledImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 1.875rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
`;

const Title = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 10px;
  font-size: 1.125rem;
  font-weight: 700;
  text-align: left;
  color: ${(props) => props.theme.colors.body};
`;

const SubTitle = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0;
  font-size: 0.75rem;
  text-align: left;
  color: #565656;
`;

const GroupedPeople = ({ itemNumber, title, subtitle, imageUrl }) => {
  const formattedItemNumber = (itemNumber ?? 1).toString().padStart(2, '0');

  return (
    <FlexContainer>
      <ItemNumber>{formattedItemNumber}</ItemNumber>
      <StyledImage src={imageUrl || 'default-image.png'} alt="grouped people" />
      <TextWrapper>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </TextWrapper>
    </FlexContainer>
  );
};

export default GroupedPeople;
