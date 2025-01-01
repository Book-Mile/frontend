import React, { useState } from 'react';
import {
  PopUpInnerBox1,
  CardTitle,
  CardContent,
  PopUpInnerBox2,
  ModalContent,
  ModalContainer,
} from '../../../styled_components/popupStyle';
import LGButton from '../../LGButton/LGButton';
import RightPopup_two from './RightPopup_two';
import Rightpopup_one from './RightPopup_one';
import useModalSelectedGroup from '../../../hooks/useModalSelectedGroup';

const SelectedMine = ({ imgPath, title, content, handleClose }) => {
  const [inputValue, setInputValue] = useState('');
  const {
    selectedGroup,
    errorMessage,
    isNext,
    isAnimating,
    handleGroupClick,
    handleBack,
    handleCompleteClick,
  } = useModalSelectedGroup();

  // 줄바꿈 처리 (일반적으로는 \n을 <br />로 변환)
  const titleWithBreaks = title.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
  // 예시 데이터
  const groups = [
    {
      name: '횟수정하자 그룹',
      meetings: 18,
      members: 10,
    },
    {
      name: '다시하자 그룹',
      meetings: 15,
      members: 12,
    },
  ];

  return (
    <>
      <PopUpInnerBox1 imgPath={imgPath}>
        <div class="card__img"></div>
        <div class="card__info">
          <CardTitle>{titleWithBreaks}</CardTitle>
          <CardContent>{content}</CardContent>
        </div>
        {isNext ? (
          <LGButton
            text={'선택완료'}
            width={'200px'}
            bgColor={'#D9D9D9'}
            textColor={'#565656'}
            textSize={'15px'}
            height={'37px'}
            borderColor={'#565656'}
          />
        ) : (
          <LGButton
            text={'선택완료'}
            width={'200px'}
            bgColor={'#FFF0F0'}
            textSize={'15px'}
            height={'37px'}
            onClick={() => handleCompleteClick(inputValue)}
          />
        )}
      </PopUpInnerBox1>
      <PopUpInnerBox2>
        <ModalContainer>
          <ModalContent
            className={isAnimating ? 'animating' : ''}
            isNext={isNext}
          >
            {isNext ? (
              <Rightpopup_one
                handleBack={() => handleBack(setInputValue)}
                groupMemberNum={selectedGroup?.members || 0}
              />
            ) : (
              <RightPopup_two
                groups={groups}
                handleGroupClick={(group) =>
                  handleGroupClick(group, setInputValue)
                }
              />
            )}
          </ModalContent>
        </ModalContainer>
        <span className="popup_close" onClick={handleClose}>
          X
        </span>
      </PopUpInnerBox2>
    </>
  );
};

export default SelectedMine;
