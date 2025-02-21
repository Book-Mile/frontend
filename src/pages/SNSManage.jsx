import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LGButton from '../components/LGButton/LGButton';

import googleLogo from '/src/assets/snslogo/google.svg';
import kakaoLogo from '/src/assets/snslogo/kakao.svg';
import naverLogo from '/src/assets/snslogo/naver.svg';
import ToggleOn from '/src/assets/Toggle/ToggleOn.svg';
import ToggleOff from '/src/assets/Toggle/ToggleOff.svg';

import {
  getLinkedSocialLogins,
  unlinkSocialLogin,
} from '/src/api/Pages/SNSManageRequest.jsx'; // API 호출 함수 import

export default function SNSManage() {
  const [toggle1, setToggle1] = useState(false); // Google
  const [toggle2, setToggle2] = useState(false); // Kakao
  const [toggle3, setToggle3] = useState(false); // Naver
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchLinkedSocialLogins = async () => {
      try {
        const data = await getLinkedSocialLogins(); // API 함수 호출
        if (data?.response) {
          setToggle1(data.response.includes('google'));
          setToggle2(data.response.includes('kakao'));
          setToggle3(data.response.includes('naver'));
        }
      } catch (error) {
        console.error('소셜 로그인 연동 조회 실패:', error);
      }
    };

    fetchLinkedSocialLogins();
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  const handleToggle = async (toggleNum, provider) => {
    const toggles = [toggle1, toggle2, toggle3];

    // 선택된 토글을 끌 경우, 연동된 계정이 최소 2개 이상이어야 함
    if (toggles.filter(Boolean).length <= 1 && toggles[toggleNum - 1]) {
      alert('최소 하나의 SNS 계정은 연동되어 있어야 해요.');
      return;
    }

    if (
      toggles[toggleNum - 1] &&
      window.confirm('해당 SNS 계정 연동을 해지하시겠어요?')
    ) {
      await unlinkSocialLogin(provider);

      // 해당 토글 상태 변경
      if (toggleNum === 1) setToggle1(false);
      else if (toggleNum === 2) setToggle2(false);
      else if (toggleNum === 3) setToggle3(false);

      setIsChanged(true);
    }
  };

  return (
    <MainContainer>
      <OuterFrame>
        <UpperFrame>
          <TitleFrame>
            <Title>SNS 로그인 관리</Title>
          </TitleFrame>
          이 페이지에서는 SNS 연동 해제만 가능합니다.
          <br />
          재연동을 원하시면 로그아웃 후,
          <br />
          현재 계정의 이메일 아이디와 동일한 이메일의 원하시는 SNS 계정으로
          로그인해주세요.
          <ContentFrame>
            <Box>
              <BoxLeft>
                <Frame9>
                  <img src={googleLogo} alt="Google Logo" />
                </Frame9>
              </BoxLeft>
              <BoxMiddle>Google 아이디로 로그인</BoxMiddle>
              <BoxRight>
                <div onClick={() => handleToggle(1, 'google')}>
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
                <div onClick={() => handleToggle(2, 'kakao')}>
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
                <div onClick={() => handleToggle(3, 'naver')}>
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
              bgColor="#EEEEEE"
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
  transition: transform 0.3s ease-in-out; /* 애니메이션 효과 추가 */
`;

const ToggleImage = styled.img`
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out; /* 애니메이션 효과 추가 */
  transform: ${({ toggleState }) =>
    toggleState ? 'rotate(0deg)' : 'rotate(180deg)'}; /* 회전 애니메이션 */
  opacity: ${({ toggleState }) => (toggleState ? 1 : 0.5)}; /* 불투명도 효과 */
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
