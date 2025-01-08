import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import LGButton from '../components/LGButton/LGButton';

import googleLogo from '/src/assets/snslogo/google.svg';
import kakaoLogo from '/src/assets/snslogo/kakao.svg';
import naverLogo from '/src/assets/snslogo/naver.svg';
import ToggleOn from '/src/assets/Toggle/ToggleOn.svg';
import ToggleOff from '/src/assets/Toggle/ToggleOff.svg';

export default function SNSManage() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  const [isChanged, setIsChanged] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleToggle = (toggleNum) => {
    if (toggleNum === 1) {
      setToggle1(!toggle1);
      setIsChanged(true);
    } else if (toggleNum === 2) {
      setToggle2(!toggle2);
      setIsChanged(true);
    } else if (toggleNum === 3) {
      setToggle3(!toggle3);
      setIsChanged(true);
    }
  };

  return (
    <MainContainer>
      <OuterFrame>
        <UpperFrame>
          <TitleFrame>
            <Title>SNS 로그인 연동</Title>
          </TitleFrame>
          <ContentFrame>
            <Box>
              <BoxLeft>
                <Frame9>
                  <img src={googleLogo} alt="Google Logo" />
                </Frame9>
              </BoxLeft>
              <BoxMiddle>Google 아이디로 로그인</BoxMiddle>
              <BoxRight>
                <div
                  onClick={() => {
                    handleToggle(1);
                  }}
                >
                  {toggle1 ? (
                    <img src={ToggleOn} alt="Toggle On" />
                  ) : (
                    <img src={ToggleOff} alt="Toggle Off" />
                  )}
                </div>
              </BoxRight>
            </Box>
            <Box>
              <BoxLeft>
                <FrameA>
                  <img src={kakaoLogo} alt="Kakao Logo" />
                </FrameA>
              </BoxLeft>
              <BoxMiddle>KaKao 아이디로 로그인</BoxMiddle>
              <BoxRight>
                <div
                  onClick={() => {
                    handleToggle(2);
                  }}
                >
                  {toggle2 ? (
                    <img src={ToggleOn} alt="Toggle On" />
                  ) : (
                    <img src={ToggleOff} alt="Toggle Off" />
                  )}
                </div>
              </BoxRight>
            </Box>
            <Box>
              <BoxLeft>
                <FrameB>
                  <img src={naverLogo} alt="Naver Logo" />
                </FrameB>
              </BoxLeft>
              <BoxMiddle>Naver 아이디로 로그인</BoxMiddle>
              <BoxRight>
                <div
                  onClick={() => {
                    handleToggle(3);
                  }}
                >
                  {toggle3 ? (
                    <img src={ToggleOn} alt="Toggle On" />
                  ) : (
                    <img src={ToggleOff} alt="Toggle Off" />
                  )}
                </div>
              </BoxRight>
            </Box>
          </ContentFrame>
        </UpperFrame>
        <DownFrame>
          {!isChanged ? (
            <LGButton
              text="취소"
              bgColor="#EEEEEE;"
              fontSize="16px"
              height="40px"
              radius="30px"
              textColor="#565656"
              borderColor="#565656"
            />
          ) : (
            <LGButton
              text="확인"
              bgColor="#FFF0F0"
              fontSize="16px"
              height="40px"
              radius="30px"
            />
          )}
        </DownFrame>
      </OuterFrame>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fafafa;
  box-sizing: border-box;
  overflow-y: auto;
`;

const OuterFrame = styled.div`
  width: 630px;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding-top: 100px;

  gap: 50px;
`;

const UpperFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  gap: 30px;
`;

const DownFrame = styled.div`
  width: 100%;
  height: 40px;
`;

const TitleFrame = styled.div`
  width: 100%;
  display: flex;
`;
const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.main};
`;
const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Box = styled.div`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  width: 540px;
  height: 100px;

  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
`;

const BoxLeft = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoxMiddle = styled.div`
  flex-grow: 2;
  height: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height, or 200% */
  display: flex;
  align-items: center;

  color: #4e202a;
`;
const BoxRight = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Frame9 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 14px;
  border: 2px solid #d9d9d9;
  border-radius: 50px;
`;
const FrameA = styled(Frame9)`
  background: #f7e600;
`;

const FrameB = styled(FrameA)`
  background: #2db400;
`;
