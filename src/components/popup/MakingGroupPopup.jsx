import React, { useState, useEffect } from 'react';
import { PopupContainer, PopupInner } from '../../styled_components/popupStyle';

import SelectedChapter from './SelectedChapter';
import SelectedPages from './SelectedPages';
import SelectedNumber from './SelectedNumber';
import SelectedMine from './SelectedMine';

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
          />
        );
      case 2:
        return (
          <SelectedChapter
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
          />
        );
      case 3:
        return (
          <SelectedNumber
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
          />
        );
      case 4:
        return (
          <SelectedMine
            imgPath={imgPath}
            title={title}
            content={content}
            handleClose={handleClose}
          />
        );
      default:
        return <div>Unknown Component</div>;
    }
  };

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose(); // 애니메이션 완료 후 onClose 호출
      }, 350); // 애니메이션 지속 시간
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>{renderComponent()}</PopupInner>
    </PopupContainer>
  );
};

export default MakingGroupPopup;
