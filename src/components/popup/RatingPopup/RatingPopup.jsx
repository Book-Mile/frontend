/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';
import { RatingPopupSubmit } from '../../../api/Popup/RatingPopupSubmit';
import { useErrorHandling } from '../../../hooks/useErrorHandling';
import StarRating from '../../starRating/StarRating';
import { useLocation } from 'react-router-dom';
const PopUpInnerBox1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 80px;
  gap: 50px;

  width: 30%;
  height: auto;

  background: #ffffff;
  border-radius: 20px;
`;
const Title = styled.div`
  /* 그룹 정보 */

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  color: ${(props) => props.theme.colors.main};
  font-style: normal;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Content = styled.div`
  font-family: ${(props) => props.theme.font.main};
  font-size: 1rem;
  line-height: 35px;
  color: black;
  width: 100%;
  .subTitle {
    /* 별점 */
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    color: #4e202a;
  }
  .custom_textarea {
    /* Frame 52895 */
    margin-top: 5%;

    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;

    width: 100%;
    height: 150px;

    border: 1px solid #d9d9d9;
    border-radius: 5px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 350;
    font-size: 12px;
    line-height: 14px;

    resize: none; /* 크기 조절 비활성화 */
    overflow: auto; /* 필요시 스크롤만 허용 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const RatingPopup = ({ onClose = false, id = 1, onSubmit }) => {
  const location = useLocation();
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  const [text, setText] = useState(''); // 현재 입력된 텍스트 상태
  const [rating, setRating] = useState(1); // rating 상태와 setRating 함수 정

  const handleTextChange = (e) => {
    setText(e.target.value); // 텍스트 업데이트
  };

  const { error, handleError } = useErrorHandling();

  const onOkClick = () => {
    onSubmit(rating, text); // Call the onSubmit handler from RankingPage
    RatingPopupSubmit(rating, text, location);
  };

  if (error) {
    throw error; // 렌더링 시 에러 발생
  }

  const handleClose = () => {
    setText('');
    setIsClosing(true); // 닫히는 애니메이션 시작
  };
  useClosePopupAnimation(isClosing, onClose);

  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <Title>리뷰 기록하기</Title>
          <Content>
            <div className="subTitle">별점</div>
            <StarRating
              rating={rating}
              setRating={setRating}
              location={location}
            />
            <div className="subTitle">내용</div>
            <textarea
              className="custom_textarea"
              placeholder="150자 이내에 작성하세요."
              maxLength={150}
              value={text}
              onChange={handleTextChange} // 글자 수 상태 업데이트
            ></textarea>
            <div
              style={{
                color: 'gray',
                fontSize: '12px',
                textAlign: 'right',
                marginTop: '5px',
              }}
            >
              {text.length}/150
            </div>
          </Content>
          <ButtonContainer>
            <ModalButtonCancel width="150px" onClick={handleClose} />
            <ModalButtonOk onClick={onOkClick} width="150px" />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
    </PopupContainer>
  );
};

export default RatingPopup;
