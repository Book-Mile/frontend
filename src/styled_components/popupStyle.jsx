import styled, { css } from 'styled-components';
import {
  slideIn,
  slideOut,
  slideInLeft,
  slideInRight,
  slideOutLeft,
  slideOutRight,
} from '../animations/animations';

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 900px;
  min-width: 1200px;
  bottom: 0;
  background-color: rgba(46, 46, 46, 0.8);
  /* 블러 효과 추가 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* 사파리 호환성 */

  z-index: 1000;
`;

export const PopupInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
  width: 900px;
  height: 60%;
  transform: translateY(100%);
  animation: ${(props) =>
    props.isClosing
      ? css`
          ${slideOut} 0.4s ease forwards
        `
      : css`
          ${slideIn} 0.4s ease forwards
        `};
`;

export const PopUpInnerBox1 = styled.div`
  padding: 1rem;
  padding-bottom: 3%;
  width: 400px;
  flex-direction: column;
  align-items: center;
  gap: 1%;
  display: flex;
  height: 550px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 20px;

  .card__img {
    background-image: url(${(props) => props.imgPath});
    width: 95%;
    height: 30%;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .card__info {
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 24px 24px 24px;
    margin-bottom: auto;
  }
`;
export const PopUPInput = styled.div`
  width: 80%;
  height: 6%;

  .page-input {
    padding: 0 5% 0 0;
    width: 100%;
    height: 100%;
    border: 1px solid #565656;
    border-radius: 5px;
  }

  margin-bottom: 20%;
`;

export const CardTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 35px;
  color: #111111;
  font-family: 'Noto Sans KR';
`;
export const CardContent = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 140%;
  /* or 17px */
  text-align: center;

  color: #565656;
  margin-top: 15%;
  font-family: 'Inter';
`;

export const PopUpInnerBox2 = styled.div`
  padding: 1rem;
  padding-bottom: 3%;
  width: 800px;
  height: 550px;
  flex-direction: column;
  align-items: start;
  gap: 3%;
  display: flex;
  overflow: hidden;
  background: #ffffff;
  border-radius: 20px;

  .popup_close {
    position: absolute;
    right: -0.8rem;
    top: -2.2rem;
    width: 3rem;
    height: 3rem;
    font-size: 0.875rem;
    font-weight: 300;
    border-radius: 100%;
    background-color: #0a0a0a;
    z-index: 4;
    color: #fff;
    line-height: 3rem;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
  }
`;

// Rightpopup 2 스크린
export const Title = styled.div`
  margin-top: 5%;
  margin-left: 10%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  /* or 34px */

  color: #000000;
  margin-bottom: 3%;
`;

export const GroupContainer = styled.div`
  margin-left: 10%;
  width: 75%;
  height: 15%;
  margin-bottom: 2%;
  cursor: pointer;
`;

export const GroupItem = styled.div`
  /* Frame 52879 */

  width: 100%;
  background: ${(props) => props.theme.colors.sub};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;

  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);

  &:hover {
    transform: scale(1.1, 1.1);
  }

  .GroupContent-container {
    width: 80%;
  }
`;

export const GroupCircle = styled.div`
  width: 50px;
  height: 50px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

export const GroupName = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-right: 15px;
`;

export const GroupDetails_container = styled.div`
  display: flex;
  gap: 50%;

  .span {
    font-size: 16px;
    color: #333;
  }
`;
export const GroupOverflowContainer = styled.div`
  overflow: auto;
  height: 100%;
`;

//rightpopup one 스타일

export const Rightpopup_oneContinaer = styled.div`
  margin-top: 3%; /* 하단 여백을 버튼 높이만큼 확보 */
  height: 80%;
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
`;
// 타이틀 스타일
export const Rightpopup_oneTitle = styled.div`
  margin-top: 1%;
  margin-left: 10%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  //margin-bottom: 1%;
  color: ${(props) => props.theme.colors.main};
`;

// 라벨 스타일
export const Rightpopup_oneLabel = styled.label`
  /* 그룹명 */
  width: 120px;
  height: 23px;
  margin-top: 3%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 2%;
  color: #000000;

  display: flex;
`;

// 입력 필드 스타일
export const Rightpopup_oneInput = styled.input`
  width: 90%;
  height: 40px;
  font-size: 14px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;

  &:focus {
    border-color: ${(props) => props.theme.colors.main};
    outline: none;
  }
`;

// 버튼 그룹 스타일
export const Rightpopup_oneButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// 버튼 스타일
export const Rightpopup_oneToggleButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? props.theme.colors.main : '#333')};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.sub : '#fff'};
  border: 1px solid
    ${(props) => (props.isActive ? props.theme.colors.main : '#ccc')};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.main};
  }

  &:first-child {
    margin-right: 10px;
  }
`;

// 경고 아이콘 스타일
export const Rightpopup_oneWarningIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 2%;
  :hover {
    cursor: pointer;
  }
`;

export const FrameD = styled.div`
  position: fixed; /* 부모 컨테이너를 기준으로 위치 고정 */
  bottom: 10px; /* 하단에서 10px */
  width: 100%; /* 버튼 그룹이 컨테이너의 너비를 가득 채움 */
  display: flex;
  justify-content: center; /* 뒤로가기와 확인 버튼 양쪽 배치 */
`;
export const FrameE = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  background: ${(props) => props.theme.colors.sub};
  border: 1px solid ${(props) => props.theme.colors.main};
  overflow: hidden;
  border-radius: 30px;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.main};
  }

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const Confirm = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 2%;
  color: #000000;
`;

export const ButtonE = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-right: 20%;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.main};
  }

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const Cancel = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 2%;
  color: #000000;
`;

export const ErrorMessageEmpty = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.main};
  font-family: ${(props) => props.theme.font.main};
  font-size: small;
  justify-content: start;
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${({ isNext }) => (isNext ? slideInRight : slideInLeft)} 0.3s
    ease-in-out forwards;

  &.animating {
    animation: ${({ isNext }) => (isNext ? slideOutLeft : slideOutRight)} 0.3s
      ease-in-out forwards;
  }
  //overflow: auto;
`;

// 컨테이너 스타일
export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Content = styled.div`
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
    height: 50px;

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
