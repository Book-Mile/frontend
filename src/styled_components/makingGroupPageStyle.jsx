import styled from 'styled-components';
import Img1 from '../assets/images/makingGroup1.png';
import Img2 from '../assets/images/makingGroup2.png';
import Img3 from '../assets/images/makingGroup3.png';
import Img4 from '../assets/images/makingGroup4.png';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Background = styled.div`
  position: absolute; /* 배치 조정을 위해 사용 */

  width: 90%;
  height: 90%;
  filter: blur(80px); /* 블러 효과 추가 */
  background: radial-gradient(ellipse, red 0%, transparent 50%);
  z-index: -1; /* 뒤로 보내기 */
`;

const ListBigContainer = styled.div`
  width: 75%;
  height: 70%;
  display: grid;
  padding: 1rem;

  grid-gap: 4%;
  grid-template-columns: repeat(4, 1fr);
`;

const ListContainer = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  flex-direction: column;

  align-items: center;
  padding: 20px 10px 26px;
  gap: 15px;
  height: 90%;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);

  background: #ffffff;
  border-radius: 20px;

  &:hover {
    box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
    transform: scale(1.1, 1.1);
  }

  @media (max-width: 1200px) {
    justify-content: center;
  }
  .card__img {
    background-image: ${({ imgNum }) => {
      switch (imgNum) {
        case 1:
          return `url(${Img1})`;
        case 2:
          return `url('${Img2}')`;
        case 3:
          return `url('${Img3}')`;
        case 4:
          return `url('${Img4}')`;
        default:
          return 'none';
      }
    }};

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
  }
`;

const CardTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 35px;
  @media (max-width: 1200px) {
    font-weight: 700;
    font-size: 1rem;
    line-height: 20px;
  }
  color: #111111;
`;

const CardContent = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 140%;
  /* or 17px */
  text-align: center;

  color: #565656;
  margin-top: 15%;
  font-family: 'Inter';

  @media (max-width: 1200px) {
    font-weight: 300;
    font-size: 0.7rem;
    line-height: 140%;
  }
`;

export {
  PageContainer,
  Background,
  ListBigContainer,
  ListContainer,
  CardTitle,
  CardContent,
};
