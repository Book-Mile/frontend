import React, { useState, useEffect } from 'react';
import {
  Rightpopup_oneTitle,
  Rightpopup_oneLabel,
  Rightpopup_oneInput,
  Rightpopup_oneButtonGroup,
  Rightpopup_oneToggleButton,
  Rightpopup_oneWarningIcon,
  Rightpopup_oneContinaer,
  FrameD,
  Button,
  Confirm,
  ButtonE,
  Cancel,
  FrameE,
  ErrorMessageEmpty,
  Content,
} from '../../../styled_components/popupStyle';
import makingGroupForm from '../../../hooks/makingGroupForm';
import { handleMakingGroupSubmit } from '../../../api/Popup/MakingGroupPopupSubmit';
import { useErrorHandling } from '../../../hooks/useErrorHandling';

const Rightpopup_one = ({
  handleBack,
  groupMemberNum,
  subject,
  inputValue,
  handleClose,
}) => {
  const [isIndividual, setIsIndividual] = useState(false); // 개인/단체 구분 상태
  const [isPasswordSet, setIsPasswordSet] = useState(true); // 비밀번호 설정 여부
  const [titleErrorMessage, setTitleErrorMessage] = useState(''); // 에러 메시지 상태
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // 에러 메시지 상태
  const [memberErrorMessage, setMemberErrorMessage] = useState('');
  const { error, handleError } = useErrorHandling();
  const [text, setText] = useState(''); // 현재 입력된 텍스트 상태

  const handleTextChange = (e) => {
    setText(e.target.value); // 텍스트 업데이트
  };

  const { groupData, setGroupName, setMaxMembers, setPassword } =
    makingGroupForm();

  // 그룹 데이터 확인 핸들러
  const handleConfirm = () => {
    let errorCheck = 0;
    if (!groupData.groupName) {
      setTitleErrorMessage('그룹명을 입력하세요.');
      errorCheck = 1;
    }

    if (isPasswordSet && !groupData.password) {
      setPasswordErrorMessage('비밀번호를 입력하세요.');
      errorCheck = 1;
    }

    if (!isIndividual && !groupData.maxMembers) {
      setMemberErrorMessage('인원 수를 입력하세요.');
      errorCheck = 1;
    }

    if (
      !isIndividual &&
      (groupData.maxMembers < 2 || groupData.maxMembers > 30)
    ) {
      setMemberErrorMessage('인원 수를 2~30명 사이로 해주세요.');
      errorCheck = 1;
    }

    if (errorCheck == 1) {
      return;
    }

    setTitleErrorMessage(''); // 에러 메시지 초기화
    setPasswordErrorMessage('');
    setMemberErrorMessage('');
    handleMakingGroupSubmit(
      inputValue,
      subject,
      groupData.groupName,
      groupData.maxMembers,
      groupData.password,
      text,
      isIndividual,
    ).catch((err) => {
      handleError(err);
    });
    handleClose();
  };

  if (error) {
    throw error; // 렌더링 시 에러 발생
  }

  // useEffect로 초기값 설정
  useEffect(() => {
    if (groupMemberNum) {
      setMaxMembers(groupMemberNum); // groupMemberNum으로 초기값 설정
      console.log(groupMemberNum);
    }
  }, [groupMemberNum, setMaxMembers]);

  return (
    <>
      <Rightpopup_oneTitle>그룹 생성하기</Rightpopup_oneTitle>

      <Rightpopup_oneContinaer>
        <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
          {/* 그룹명 */}
          <Rightpopup_oneLabel>그룹명</Rightpopup_oneLabel>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Rightpopup_oneInput
              type="text"
              placeholder="그룹명을 입력하세요"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          {/* 에러 메시지 출력 */}
          {titleErrorMessage && (
            <ErrorMessageEmpty>{titleErrorMessage}</ErrorMessageEmpty>
          )}

          {/* 구분 */}
          <Rightpopup_oneLabel>구분</Rightpopup_oneLabel>
          <Rightpopup_oneButtonGroup>
            <Rightpopup_oneToggleButton
              isActive={isIndividual}
              onClick={() => {
                setIsIndividual(true);
                setMaxMembers('');
              }}
            >
              개인
            </Rightpopup_oneToggleButton>
            <Rightpopup_oneToggleButton
              isActive={!isIndividual}
              onClick={
                () => setIsIndividual(false) // '단체'로 상태 설정
              }
            >
              단체
            </Rightpopup_oneToggleButton>
          </Rightpopup_oneButtonGroup>

          {/* 최대 인원 */}
          {!isIndividual && (
            <>
              <Rightpopup_oneLabel>
                최대 인원{' '}
                <Rightpopup_oneWarningIcon
                  onClick={() =>
                    setMemberErrorMessage('인원 수를 2~30명 사이로 해주세요.')
                  }
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="7.5" stroke="#FF2525" />
                    <path d="M10 5V11" stroke="#FF2525" />
                    <circle cx="10" cy="14" r="1" fill="#FF2525" />
                  </svg>
                </Rightpopup_oneWarningIcon>
              </Rightpopup_oneLabel>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Rightpopup_oneInput
                  type="number"
                  placeholder="최대 인원을 입력하세요"
                  value={groupData.maxMembers || ''} // 상태값을 표시
                  min="2" // 최소값
                  max="30" // 최대값
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10); // 숫자로 변환
                    setMaxMembers(isNaN(value) ? 0 : value); // 숫자가 아니면 0으로 설정
                  }}
                />
              </div>
              {/* 에러 메시지 출력 */}
              <ErrorMessageEmpty>{memberErrorMessage}</ErrorMessageEmpty>
            </>
          )}

          {/* 비밀번호 */}
          <Rightpopup_oneLabel>비밀번호</Rightpopup_oneLabel>
          <Rightpopup_oneButtonGroup>
            <Rightpopup_oneToggleButton
              isActive={isPasswordSet}
              onClick={() => setIsPasswordSet(true)}
            >
              설정
            </Rightpopup_oneToggleButton>
            <Rightpopup_oneToggleButton
              isActive={!isPasswordSet}
              onClick={() => {
                setIsPasswordSet(false);
                setPassword('');
              }}
            >
              안함
            </Rightpopup_oneToggleButton>
          </Rightpopup_oneButtonGroup>

          {/* 비밀번호 설정 */}
          {isPasswordSet && (
            <>
              <Rightpopup_oneLabel>비밀번호 설정</Rightpopup_oneLabel>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Rightpopup_oneInput
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* 에러 메시지 출력 */}
              <ErrorMessageEmpty>{passwordErrorMessage}</ErrorMessageEmpty>
            </>
          )}
          <Content>
            <Rightpopup_oneLabel>그룹 소개</Rightpopup_oneLabel>
            <textarea
              className="custom_textarea"
              placeholder="50자 이내에 작성하세요."
              maxLength={50}
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
              {text.length}/50
            </div>
          </Content>
        </div>
      </Rightpopup_oneContinaer>
      {/* 버튼 영역 */}
      <FrameD>
        <FrameE>
          <ButtonE
            onClick={() => {
              handleBack(); // 클릭 시 부모로 데이터 전달
            }}
          >
            <Cancel>뒤로가기</Cancel>
          </ButtonE>

          <Button onClick={handleConfirm}>
            <Confirm>확인</Confirm>
          </Button>
        </FrameE>
      </FrameD>
    </>
  );
};

export default Rightpopup_one;