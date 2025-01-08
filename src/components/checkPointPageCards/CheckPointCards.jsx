import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  ButtonContainer,
  CardsWrapper,
} from '../../styled_components/CheckPointRecordPageStyle';

const CheckPointCards = ({ images, handleCardClick }) => {
  const [cards, setCards] = useState(images);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setIsButtonVisible(false);
  };
  useEffect(() => {
    setCards(images);
  }, [images]);

  const handleNext = () => {
    const updatedCards = [...cards];
    const movedCard = updatedCards.pop();
    updatedCards.unshift(movedCard);
    setCards(updatedCards);
  };

  const handlePrev = () => {
    const updatedCards = [...cards];
    const movedCard = updatedCards.shift();
    updatedCards.push(movedCard);
    setCards(updatedCards);
  };

  return (
    <>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ButtonContainer>
          <Button
            className="prev"
            onClick={handlePrev}
            isVisible={isButtonVisible}
          >
            &darr;
          </Button>
          <Button
            className="next"
            onClick={handleNext}
            isVisible={isButtonVisible}
          >
            &uarr;
          </Button>
        </ButtonContainer>
        <CardsWrapper>
          {cards.map((image, index) => (
            <Card
              onClick={() => handleCardClick(image)}
              key={index}
              position={index}
              src={image}
              alt={`체크포인트 이미지 ${index + 1}`}
            />
          ))}
        </CardsWrapper>
      </div>
    </>
  );
};

export default CheckPointCards;
