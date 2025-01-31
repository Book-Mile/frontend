import React, { useState, useEffect } from 'react';
import {
  PopUpInnerBox1,
  CardTitle,
  CardContent,
  PopUpInnerBox2,
  PopUPInput,
  ErrorMessageEmpty,
  ModalContent,
  ModalContainer,
} from '../../../styled_components/popupStyle';
import LGButton from '../../LGButton/LGButton';
import RightPopup_two from './RightPopup_two';
import useModalSelectedGroup from '../../../hooks/useModalSelectedGroup';
import Rightpopup_one from './RightPopup_one';
import { RightPopup_oneRequestList } from '../../../api/Popup/RightPopup_oneRequestList';
import { useErrorHandling } from '../../../hooks/useErrorHandling';

const SelectedChapter = ({ imgPath, title, content, handleClose, subject }) => {
  const [inputValue, setInputValue] = useState('');
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [isNext, setIsNext] = useState(false); // Next 단계 상태
  const {
    selectedGroup,
    errorMessage,
    isAnimating,
    handleGroupClick,
    handleBack,
    handleCompleteClick,
  } = useModalSelectedGroup();
  
  const [groups, setGroups] = useState([
    // 예시 데이터 (실제로는 API에서 받아오는 데이터)
    { name: '횟수정하자 그룹', meetings: 18, members: 10 },
    { name: '다시하자 그룹', meetings: 15, members: 12 },
    { name: '횟수정하자 그룹', meetings: 18, members: 10 },
    { name: '다시하자 그룹', meetings: 15, members: 12 },
    { name: '횟수정하자 그룹', meetings: 18, members: 10 },
    { name: '다시하자 그룹', meetings: 15, members: 12 },
  ]);

  const { error, handleError } = useErrorHandling();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirm = (inputValue) => {
    setIsNext(true);
  };

  // 줄바꿈 처리
  const titleWithBreaks = title.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <>
      <PopUpInnerBox1 imgPath={imgPath}>
        <div className="card__img"></div>
        <div className="card__info">
          <CardTitle>{titleWithBreaks}</CardTitle>
          <CardContent>{content}</CardContent>
        </div>
        <PopUPInput>
          <input
            className="page-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="챕터"
            style={{ textAlign: 'right' }}
          />
          {errorMessage && <ErrorMessageEmpty>{errorMessage}</ErrorMessageEmpty>}
        </PopUPInput>

        <LGButton
          text={isNext ? '선택완료' : '선택완료'}
          width={'200px'}
          bgColor={isNext ? '#D9D9D9' : '#FFF0F0'}
          textColor={isNext ? '#565656' : '#000'}
          textSize={'15px'}
          height={'37px'}
          borderColor={'#565656'}
          onClick={() => handleCompleteClick(inputValue)}
        />
      </PopUpInnerBox1>

      {/* Modal Container */}
      <PopUpInnerBox2>
        <ModalContainer>
          <ModalContent className={isAnimating ? 'animating' : ''} isNext={isNext}>
            {isNext ? (
              <Rightpopup_one
                handleBack={() => {
                  setIsNext(false); 
                  handleBack(setInputValue);
                }}
                groupMemberNum={selectedGroup?.members || 0}
                subject={subject}
                inputValue={inputValue}
                onClick={handleConfirm}
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

export default SelectedChapter;
