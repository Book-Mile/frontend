import styled from 'styled-components';
import { slideInLeft } from '../animations/animations';

const CheckPointRecordPageContainer = styled.div`
  height: auto;
  overflow: auto; /* 가로 스크롤바를 활성화 */
  display: flex;
  justify-content: center;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
`;
const BookImgContainer = styled.div`
  /* image */

  position: relative;
  width: 10rem;
  height: 13rem;
  top: -100px;
  left: 69%;
  border: 1px solid black;
  background: #ccc;
  filter: drop-shadow(19px 179px 72px rgba(0, 0, 0, 0.01))
    drop-shadow(10px 101px 61px rgba(0, 0, 0, 0.05))
    drop-shadow(5px 45px 45px rgba(0, 0, 0, 0.09))
    drop-shadow(1px 11px 25px rgba(0, 0, 0, 0.1));

  @media (max-width: 1000px) {
    display: none;
  }
  z-index: 10;
`;

const RecordContainer = styled.div`
  display: flex;
  width: 65%;
  margin-left: 5%;
  margin-top: 15%;
  flex-direction: column;
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
`;

const FirstBox = styled.div`
  width: 100%;
  height: 200px;
  //background-color: red;
  .upper-img {
    position: relative;
    bottom: 54px;
    right: 15px;
  }
  .circle {
    position: relative;
    top: -35px;
    right: 61px;
  }
  .start {
    position: relative;
    right: 125px;
    top: -35px;

    font-family: ${(props) => props.theme.font.main};
    font-weight: 400;
    font-size: 20px;
    line-height: 39px;

    color: #000000;
  }
  border-left: 3px dotted #982b1c; /* 점선 */
`;

const AnotherBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 4% 5% 5% 0;
  .circle {
    top: -46px;
    position: relative;
    right: 11px;
  }
  .checkpoint-date {
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    right: 165px;
    top: -27px;
  }
  border-left: 3px dotted #982b1c; /* 점선 */
`;

const BoxInnerContainer = styled.div`
  width: 80%;
  margin-left: 40px;
  height: auto;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 2% 2% 2%;
  border-radius: 20px;
  filter: drop-shadow(6px 7px 4px rgba(0, 0, 0, 0.18));
  position: relative;
  top: -40px;
  right: 15px;

  .checkpoint-title {
    margin-top: 0;
    margin-bottom: 1%;

    font-family: ${(props) => props.theme.font.main};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 39px;

    color: #000000;
  }
  .checkpoint-description {
    margin-top: 0;

    font-family: ${(props) => props.theme.font.main};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 27px;

    color: #000000;
  }
`;

const LastBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 4% 5% 5% 0;
  .circle {
    top: -42px;
    position: relative;
    right: 8px;
  }
  .checkpoint-date {
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    right: 165px;
    top: -27px;
  }
  .last {
    background-color: ${(props) => props.backgroundColor};
  }
`;

const UserTitle = styled.div`
  position: absolute;
  position: absolute;
  width: 551px;
  height: 51px;
  left: 30%;
  top: 20%;

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 39px;

  color: #000000;
`;

export {
  CheckPointRecordPageContainer,
  BookImgContainer,
  RecordContainer,
  FirstBox,
  AnotherBox,
  BoxInnerContainer,
  LastBox,
  UserTitle,
};
