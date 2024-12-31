import { useState } from 'react';

//전체 적인 팝업 관리
const useCardSelection = () => {
  const [selectedImgPath, setSelectedImgPath] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedImgNum, setSelectedImgNum] = useState(0);

  const handleCardClick = (card, imgNum) => {
    setSelectedImgPath(card.imgPath);
    setSelectedTitle(card.title);
    setSelectedContent(card.content);
    setSelectedImgNum(imgNum);
  };

  const handleClosePopup = () => {
    setSelectedImgPath(null);
    setSelectedTitle(null);
    setSelectedContent(null);
    setSelectedImgNum(0);
  };

  return {
    selectedImgPath,
    selectedTitle,
    selectedContent,
    selectedImgNum,
    handleCardClick,
    handleClosePopup,
  };
};

export default useCardSelection;
