import React, { useState, useEffect } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';

import SelectedChapter from './SelectedChapter';
import SelectedPages from './SelectedPages';
import SelectedNumber from './SelectedNumber';
import SelectedMine from './SelectedMine';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';

const MakingGroupPopup = ({ imgPath, imgNum, title, content, onClose }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리

  const renderComponent = () => {
    switch (imgNum) {
      case 1:
        return (
          <SelectedPages
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
            subject="PAGE"
          />
        );
      case 2:
        return (
          <SelectedChapter
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
            subject="CHAPTER"
          />
        );
      case 3:
        return (
          <SelectedNumber
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
            subject="NUMBER"
          />
        );
      case 4:
        return (
          <SelectedMine
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
            subject="CUSTOM"
          />
        );
      default:
        return <div>Unknown Component</div>;
    }
  };

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  useClosePopupAnimation(isClosing, onClose);
  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>{renderComponent()}</PopupInner>
    </PopupContainer>
  );
};

export default MakingGroupPopup;
