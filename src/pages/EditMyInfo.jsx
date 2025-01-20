import React, { useState } from 'react';
import styled from 'styled-components';

import LGButton from '../components/LGButton/LGButton';

import profileAsset from '/src/assets/EditMyInfoAssets/Profile.svg';
import emailAsset from '/src/assets/EditMyInfoAssets/email.svg';
import passwordAsset from '/src/assets/EditMyInfoAssets/password.svg';
import snsAsset from '/src/assets/EditMyInfoAssets/sns.svg';
import kakaoLogo from '/src/assets/snslogo/kakao.svg';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [snsId, setSnsId] = useState('email@kakao.com');
  const [isLinkedSNS, setIsLinkedSNS] = useState(false);

  const [curpassword, setCurpassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [changePasswordConfirm, setChangePasswordConfirm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <OuterFrame>
        <UpperFrame>
          <BoxFrame>
            <BoxType1>
              <Type1Left>
                <img
                  src={profileAsset}
                  alt="profileAsset"
                  width="66px"
                  height="66px"
                />
              </Type1Left>
              <Type1Right>
                <Type1RightFirstLine>닉네임</Type1RightFirstLine>
                <Type1RightSecondLine>
                  <Rectangle
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                  />
                  <LGButton
                    text="중복확인"
                    width="87px"
                    height="100%"
                    radius="10px"
                    fontSize="14px"
                  />
                </Type1RightSecondLine>
              </Type1Right>
            </BoxType1>
          </BoxFrame>
          <BoxFrame>
            <BoxType1>
              <Type1Left>
                <img
                  src={emailAsset}
                  alt="emailasset"
                  width="50px"
                  height="50px"
                />
              </Type1Left>
              <Type1Right>
                <Type1RightFirstLine>이메일 아이디</Type1RightFirstLine>
                <Type1RightSecondLine>
                  <Rectangle
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exmple@gmail.com"
                  />
                  <LGButton
                    text="인증하기"
                    width="87px"
                    height="100%"
                    radius="10px"
                    fontSize="14px"
                  />
                </Type1RightSecondLine>
              </Type1Right>
            </BoxType1>
          </BoxFrame>

          <BoxFrame>
            <BoxType3>
              <BoxType1>
                <Type1Left>
                  <img
                    src={passwordAsset}
                    alt="passwordAsset"
                    width="50px"
                    height="50px"
                  />
                </Type1Left>
                <Type1Right>
                  <Type1RightFirstLine>비밀번호 변경</Type1RightFirstLine>
                </Type1Right>
              </BoxType1>
              {isLinkedSNS ? (
                <div>SNS가 연동된 경우 비밀번호를 설정할 수 없습니다.</div>
              ) : (
                <Type3SecondLine>
                  <PasswordLineBox>
                    <PasswordLineLeft>현재 비밀번호</PasswordLineLeft>
                    <PasswordLineMiddle>
                      <Rectangle
                        type="password"
                        id="curpassword"
                        value={curpassword}
                        onChange={(e) => setCurpassword(e.target.value)}
                      />
                    </PasswordLineMiddle>
                    <PasswordLineRight></PasswordLineRight>
                  </PasswordLineBox>
                  <PasswordLineBox>
                    <PasswordLineLeft>변경 비밀번호</PasswordLineLeft>
                    <PasswordLineMiddle>
                      <Rectangle
                        type="password"
                        id="changePassword"
                        value={changePassword}
                        onChange={(e) => setChangePassword(e.target.value)}
                      />
                    </PasswordLineMiddle>
                    <PasswordLineRight></PasswordLineRight>
                  </PasswordLineBox>
                  <PasswordLineBox>
                    <PasswordLineLeft>비밀번호 확인</PasswordLineLeft>
                    <PasswordLineMiddle>
                      <Rectangle
                        type="password"
                        id="changePasswordConfirm"
                        value={changePasswordConfirm}
                        onChange={(e) =>
                          setChangePasswordConfirm(e.target.value)
                        }
                      />
                    </PasswordLineMiddle>
                    <PasswordLineRight>
                      <LGButton
                        text="변경"
                        width="87px"
                        height="40px"
                        radius="10px"
                        fontSize="14px"
                      />
                    </PasswordLineRight>
                  </PasswordLineBox>
                </Type3SecondLine>
              )}
            </BoxType3>
          </BoxFrame>
          <BoxFrame>
            <BoxType2>
              <Type2Left>
                <img src={snsAsset} alt="snsAsset" width="50px" height="50px" />
              </Type2Left>
              <Type2Middle>
                <Type2RightFirstLine>SNS 연동</Type2RightFirstLine>
                <Type2RightSecondLine>
                  <SNSFrame>
                    <img
                      src={kakaoLogo}
                      alt="Kakao Logo"
                      width="100%"
                      height="100%"
                    />
                  </SNSFrame>
                  <SNSidFrame>{snsId}</SNSidFrame>
                </Type2RightSecondLine>
              </Type2Middle>
              <Type2Right
                onClick={() => {
                  navigate('/snsmanage');
                }}
              >
                연동하기 &gt;
              </Type2Right>
            </BoxType2>
          </BoxFrame>
          <BoxFrame>
            <BoxType2>
              <Type2Left>
                {' '}
                <img src={snsAsset} alt="snsAsset" width="50px" height="50px" />
              </Type2Left>
              <Type2Middle>
                <Type2RightFirstLine>회원탈퇴</Type2RightFirstLine>
              </Type2Middle>
              <Type2Right
                onClick={() => {
                  navigate('/SecessionUserPopup');
                }}
              >
                탈퇴하기 &gt;
              </Type2Right>
            </BoxType2>
          </BoxFrame>
        </UpperFrame>
        <DownFrame>
          <LGButton
            text="완료"
            bgColor="#FFF0F0"
            fontSize="16px"
            height="40px"
            radius="30px"
          />
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
`;

const DownFrame = styled.div`
  width: 100%;
  height: 40px;
`;

const BoxFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 40px 20px 32px;
  gap: 22px;

  width: 100%;
  height: fit-content;

  background: #ffffff;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
`;

const BoxType1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 22px;
`;
const Type1Left = styled.div`
  width: 66px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Type1Right = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Type1RightFirstLine = styled.div`
  width: 100%;
  flex-grow: 1;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height, or 200% */
  display: flex;
  align-items: center;

  color: #4e202a;
`;
const Type1RightSecondLine = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const BoxType2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 22px;
`;
const Type2Left = styled.div`
  width: 66px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Type2Middle = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Type2Right = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height, or 200% */
  display: flex;
  align-items: center;

  color: #4e202a;

  cursor: pointer;
`;

const Type2RightFirstLine = styled.div`
  width: 100%;
  flex-grow: 1;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height, or 200% */
  display: flex;
  align-items: center;

  color: #4e202a;
`;
const Type2RightSecondLine = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const SNSFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  width: 30px;
  height: 30px;

  background: #f7e600;
  border: 2px solid #f4f4f4;
  border-radius: 50px;
`;

const SNSidFrame = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  /* identical to box height, or 229% */
  display: flex;
  align-items: center;

  color: #4e202a;
`;
const Rectangle = styled.input`
  width: 100%;
  height: 40px;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

const BoxType3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const Type3SecondLine = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 30px;
`;

const PasswordLineBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  padding-left: 75px;

  box-sizing: border-box;
`;
const PasswordLineLeft = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 32px;
  /* identical to box height, or 267% */
  display: flex;
  align-self: center;
  justify-content: center;

  color: #4e202a;
  width: 69px;
  height: 100%;
  padding-right: 45px;
`;
const PasswordLineMiddle = styled.div`
  flex-grow: 1;
  padding-right: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const PasswordLineRight = styled.div`
  height: 100%;
  width: 87px;
  display: flex;
  justify-content: center;
  align-self: center;
`;
