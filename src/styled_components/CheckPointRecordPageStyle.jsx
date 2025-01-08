import styled from 'styled-components';
import { slideInLeft } from '../animations/animations';

const CheckPointRecordPageContainer = styled.div`
  height: 100vh; /* 전체 화면 높이 */

  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

const BoxInnerContainer = styled.div`
  flex: 1;
`;
const CheckpointDescription = styled.div`
  margin: 0;

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;

  color: #000000;
  .date {
    font-weight: 600;
    font-size: 18px;
  }
`;

const UserTitle = styled.div`
  width: auto;
  height: 32px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8%;
  color: black;
  .user {
    color: ${(props) => props.theme.colors.main};
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh; /* 화면 높이보다 약간 작게 설정 */
  gap: 5%;
  margin: 8% 10%;
`;

const ImgContainer = styled.div`
  width: 400px; /* 너비를 고정 */
  flex-shrink: 0; /* 고정 너비를 유지하여 줄어들지 않도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: start;
`;

const ImgContent = styled.img`
  width: 100%;
  height: 306px;
  z-index: 10;
  border-radius: 40px; /* 둥근 모서리 */
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.15),
    /* 부드러운 외부 그림자 */ inset 0px 4px 6px rgba(255, 255, 255, 0.25); /* 은은한 내부 광택 효과 */
`;

const RecordContainer = styled.div`
  height: 100vh;
  overflow-y: scroll; /* 스크롤 가능하도록 설정 */
  scroll-snap-type: y mandatory;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
  .appear {
    animation: ${slideInLeft} 0.8s ease forwards;
  }

  .animate-on-scroll {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .appear .animate-on-scroll {
    opacity: 1;
  }

  .checkpoint-date {
    /* p.50 */
    margin-top: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 160%;
    color: #4e202a;
    width: auto;
  }

  .scroll-area {
    scroll-snap-align: end; /* 스크롤 위치 맞춤 */
  }
`;

const Card = styled.img`
  position: relative;
  width: ${({ position }) => 400 - position * 10}px;
  min-height: 306px;
  max-height: 306px;
  object-fit: cover; /* 이미지를 잘리지 않고 비율 유지하며 채움 */
  top: ${({ position }) => -290 * position - 50}px;
  left: ${({ position }) => position * 3}px;
  z-index: ${({ position }) => 50 - position};
  border-radius: 40px; /* 둥근 모서리 */
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.15),
    inset 0px 4px 6px rgba(255, 255, 255, 0.25); /* 은은한 내부 광택 효과 */
`;

const Button = styled.a`
  position: relative;
  background: rgba(0, 0, 0, 0.46);
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 22px;
  text-decoration: none;
  font-size: 20px;
  z-index: 100;
  cursor: pointer;
  transition: all 0.2s ease;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  &:hover {
    transform: scale(1.3);
  }

  &.prev {
    left: 190px;
    top: 270px;
  }

  &.next {
    top: 10px;
    left: 160px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
`;

const CardsWrapper = styled.div`
  height: 100%;
`;

export {
  CheckPointRecordPageContainer,
  BoxInnerContainer,
  UserTitle,
  BoxContainer,
  ImgContainer,
  ImgContent,
  RecordContainer,
  Card,
  Button,
  ButtonContainer,
  CardsWrapper,
  CheckpointDescription,
};
