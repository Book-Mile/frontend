import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useUserStore from '../../src/store/store.js';
import { validatePassword } from '../utils/publicFunctions.js';

import LGButton from '../components/LGButton/LGButton';

import profileAsset from '/src/assets/EditMyInfoAssets/Profile.svg';
import emailAsset from '/src/assets/EditMyInfoAssets/email.svg';
import passwordAsset from '/src/assets/EditMyInfoAssets/password.svg';
import snsAsset from '/src/assets/EditMyInfoAssets/sns.svg';
import kakaoLogo from '/src/assets/snslogo/kakao.svg';
import { useNavigate } from 'react-router-dom';
import {
  getSocialInfo,
  getUserInfo,
  checkNicknameExists,
  emailRequest,
  checkEmailVerification,
  changePassword,
  changeNicknameEmail,
} from '/src/api/Pages/EditMyInfoRequest.jsx';
import SecessionUserPopup from '../components/popup/SecessionUserPopup/SecessionUserPopup.jsx';


export default function MyPage() {
  const { name, setName } = useUserStore();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [snsId, setSnsId] = useState('email@kakao.com');
  const [isLinkedSNS, setIsLinkedSNS] = useState(false);
  const [isSented, setIsSented] = useState(false);
  const [authNum, setAuthNum] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);

  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(setEmail, setNickname, setImage);
    getSocialInfo(); //일단은 정보 받아오기만 하고, 화면 연동은 나중에..
  }, []);

  const onClickCheckNickname = () => {
    if (nickname.length >= 2) {
      checkNicknameExists(nickname);
    } else {
      alert('닉네임은 최소 2글자 이상이어야 합니다.');
    }
  };

  function isValidEmail(email) {
    // 이메일 형식 검증을 위한 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSendAuthBtn = () => {
    if (isValidEmail(email)) {
      console.log('유효한 이메일 형식입니다.');
      emailRequest(email);
      setIsSented(true);
    } else {
      alert('유효하지 않은 이메일 형식입니다.');
    }
  };

  const checkAuthNum = () => {
    if (authNum.length === 6) {
      checkEmailVerification(email, authNum, setIsAuthed);
    } else {
      alert('인증번호는 6자리입니다.');
    }
  };

  const handleChangePassword = () => {
    if (originPassword && newPassword && checkPassword) {
      if (validatePassword(newPassword)) {
        changePassword(originPassword, newPassword, checkPassword);
      } else {
        alert(
          '비밀번호는 8~16자의 영문 대소문자, 숫자, 특수문자로 이루어져야 합니다.',
        );
      }
    } else {
      alert('비밀번호를 입력하세요.');
    }
  };

  //하단 완료 버튼 눌렀을 시 동작할 함수
  const handleSubmit = () => {
    changeNicknameEmail(nickname, email, setName, navigate);
  };
  
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <MainContainer>
      <OuterFrame>
        <UpperFrame>
          <BoxFrame>
            <BoxType1>
              <Type1Left>
                <img
                  src={image}
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
                    func={onClickCheckNickname}
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
                    text="인증번호 전송"
                    width="87px"
                    height="100%"
                    radius="10px"
                    fontSize="14px"
                    func={handleSendAuthBtn}
                  />
                </Type1RightSecondLine>
                {isSented && (
                  <Type1RightSecondLine>
                    인증번호 입력
                    <Rectangle
                      type="text"
                      id="authNum"
                      value={authNum}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <LGButton
                      text="인증하기"
                      width="87px"
                      height="100%"
                      radius="10px"
                      fontSize="14px"
                      func={checkAuthNum}
                    />
                  </Type1RightSecondLine>
                )}
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
                        id="originPassword"
                        value={originPassword}
                        onChange={(e) => setOriginPassword(e.target.value)}
                      />
                    </PasswordLineMiddle>
                    <PasswordLineRight></PasswordLineRight>
                  </PasswordLineBox>
                  <PasswordLineBox>
                    <PasswordLineLeft>변경 비밀번호</PasswordLineLeft>
                    <PasswordLineMiddle>
                      <Rectangle
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </PasswordLineMiddle>
                    <PasswordLineRight></PasswordLineRight>
                  </PasswordLineBox>
                  <PasswordLineBox>
                    <PasswordLineLeft>비밀번호 확인</PasswordLineLeft>
                    <PasswordLineMiddle>
                      <Rectangle
                        type="password"
                        id="checkPassword"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                      />
                    </PasswordLineMiddle>
                    <PasswordLineRight>
                      <LGButton
                        text="변경"
                        width="87px"
                        height="40px"
                        radius="10px"
                        fontSize="14px"
                        func={handleChangePassword}
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
                  navigate('/snsmanagement');
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
                onClick={openPopup}
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
            func={handleSubmit}
          />
        </DownFrame>
      </OuterFrame>
      {showPopup && (
        <SecessionUserPopup
          onClose={closePopup}
        />
      )}
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

  align-items: center;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 32px;
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
  flex: 1;
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
