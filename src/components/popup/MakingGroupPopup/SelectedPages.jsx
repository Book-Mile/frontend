/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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
import Rightpopup_one from './RightPopup_one';
import useModalSelectedGroup from '../../../hooks/useModalSelectedGroup';
import { RightPopup_oneRequestList } from '../../../api/Popup/RightPopup_oneRequestList';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import { useLocation } from 'react-router-dom';

const SelectedPages = ({ imgPath, title, content, handleClose, subject }) => {
  const [inputValue, setInputValue] = useState('');
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get('isbn'); // URL에서 isbn13 가져와서 bookId로 사용
  const {
    selectedGroup,
    errorMessage,
    isNext,
    isAnimating,
    handleGroupClick,
    handleBack,
    handleCompleteClick,
  } = useModalSelectedGroup();

  // 예시 데이터
  const [groups, setGroups] = useState([
    // {
    //   name: '횟수정하자 그룹',
    //   meetings: 18,
    //   members: 10,
    // },
    // {
    //   name: '다시하자 그룹',
    //   meetings: 15,
    //   members: 12,
    // },
    // {
    //   name: '횟수정하자 그룹',
    //   meetings: 18,
    //   members: 10,
    // },
    // {
    //   name: '다시하자 그룹',
    //   meetings: 15,
    //   members: 12,
    // },
    // {
    //   name: '횟수정하자 그룹',
    //   meetings: 18,
    //   members: 10,
    // },
    // {
    //   name: '다시하자 그룹',
    //   meetings: 15,
    //   members: 12,
    // },
  ]);

  const { error, handleError } = useErrorHandling();
  useEffect(() => {
    RightPopup_oneRequestList(setGroups, setApiErrorMsg, subject, bookId).catch(
      (err) => {
        handleError(err);
      },
    ); // 분리된 fetchGroups 함수 호출
  }, []);
  if (error) {
    throw apiErrorMsg; // 렌더링 시 에러 발생
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 줄바꿈 처리 (일반적으로는 \n을 <br />로 변환)
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
            placeholder="페이지"
            style={{ textAlign: 'right' }}
            disabled={isNext}
          />
          {errorMessage && (
            <ErrorMessageEmpty>{errorMessage}</ErrorMessageEmpty>
          )}
        </PopUPInput>
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
            func={() => handleCompleteClick(inputValue)}
          />
        )}
      </PopUpInnerBox1>
      <PopUpInnerBox2>
        <span className="popup_close" onClick={handleClose}>
          X
        </span>
        <ModalContainer>
          <ModalContent
            className={isAnimating ? 'animating' : ''}
            isNext={isNext}
          >
            {isNext ? (
              <Rightpopup_one
                handleBack={() => handleBack(setInputValue)}
                groupMemberNum={selectedGroup?.members || 0}
                subject={subject}
                handleClose={handleClose}
                inputValue={inputValue}
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
      </PopUpInnerBox2>
    </>
  );
};

export default SelectedPages;
