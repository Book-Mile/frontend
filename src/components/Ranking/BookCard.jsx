import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  height: 340px;
  width: 370px;
  position: relative;
  overflow: hidden;
  gap: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const ImageContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 370px;
  height: 340px;
  position: relative;
  background-color: white;
`;

const StyledImage = styled.img`
  width: 370px;
  height: 340px;
  position: absolute;
  left: -0.5px;
  top: -0.5px;
  object-fit: cover;
  background-color: white;
  z-index: 1;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 2;
`;

const Title = styled.p`
  width: 310px;
  position: absolute;
  left: 30px;
  top: 146px;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: left;
  color: ${(props) => (props.imageExists ? 'white' : props.theme.colors.body)};
  z-index: 3;
`;

const Description = styled.p`
  width: 310px;
  height: 128px;
  position: absolute;
  left: 30px;
  top: 44px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  color: ${(props) => (props.imageExists ? 'white' : props.theme.colors.body)};
  overflow: hidden;
  z-index: 3;
`;

const BookCard = ({ bookData }) => {
  const handleImageError = (e) => {
    e.target.src = '';
    e.target.style.backgroundColor = 'white';
  };

  const imageExists = !!bookData.imageSrc;

  return (
    <Container>
      <ImageContainer>
        {imageExists && <StyledImage src={bookData.imageSrc} onError={handleImageError} />}
        {imageExists && <GradientOverlay />}
        <Title imageExists={imageExists}>{bookData.title}</Title>
        <Description imageExists={imageExists}>{bookData.description}</Description>
      </ImageContainer>
    </Container>
  );
};

export default BookCard;
