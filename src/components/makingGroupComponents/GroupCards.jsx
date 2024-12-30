import React, { useState } from 'react';

import MakingGroupPopup from '../popup/MakingGroupPopup/MakingGroupPopup';
import { cardData } from '../../data/cardData';
import {
  ListBigContainer,
  ListContainer,
  CardContent,
  CardTitle,
} from '../../styled_components/makingGroupPageStyle';
import useCardSelection from '../../hooks/useCardSelection';

const GroupCards = () => {
  const {
    selectedImgPath,
    selectedTitle,
    selectedContent,
    selectedImgNum,
    handleCardClick,
    handleClosePopup,
  } = useCardSelection();

  return (
    <>
      <ListBigContainer>
        {cardData.map((card, index) => (
          <ListContainer
            key={index}
            imgNum={index + 1}
            onClick={() => handleCardClick(card, index + 1)}
          >
            <div className="card__img"></div>
            <div className="card__info">
              <CardTitle>
                {card.title.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    <br />
                  </span>
                ))}
              </CardTitle>
              <CardContent>{card.content}</CardContent>
            </div>
          </ListContainer>
        ))}
      </ListBigContainer>
      {selectedImgPath && (
        <MakingGroupPopup
          imgPath={selectedImgPath}
          imgNum={selectedImgNum}
          title={selectedTitle}
          content={selectedContent}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default GroupCards;
