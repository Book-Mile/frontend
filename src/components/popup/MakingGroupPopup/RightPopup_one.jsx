import React, { useState, useEffect } from 'react';
import {
  Rightpopup_oneTitle,
  Rightpopup_oneLabel,
  Rightpopup_oneInput,
  Rightpopup_oneButtonGroup,
  Rightpopup_oneToggleButton,
  Rightpopup_oneWarningIcon,
  Rightpopup_onePasswordInputWrapper,
  Rightpopup_oneContinaer,
  FrameD,
  Button,
  Confirm,
  ButtonE,
  Cancel,
  FrameE,
} from '../../../styled_components/popupStyle';
import makingGroupForm from '../../../hooks/makingGroupForm';

const Rightpopup_one = ({ handleBack, groupMemberNum }) => {
  const [isIndividual, setIsIndividual] = useState(false); // 개인/단체 구분 상태
  const [isPasswordSet, setIsPasswordSet] = useState(true); // 비밀번호 설정 여부

  const { groupData, setGroupName, setMaxMembers, setPassword } =
    makingGroupForm();

  // 그룹 데이터 확인 핸들러
  const handleConfirm = () => {
    console.log('그룹 데이터:', groupData);
  };

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
        {/* 그룹명 */}
        <Rightpopup_oneLabel>그룹명</Rightpopup_oneLabel>
        <Rightpopup_oneInput
          type="text"
          placeholder="그룹명을 입력하세요"
          onChange={(e) => setGroupName(e.target.value)}
        />

        {/* 구분 */}
        <Rightpopup_oneLabel>구분</Rightpopup_oneLabel>
        <Rightpopup_oneButtonGroup>
          <Rightpopup_oneToggleButton
            isActive={isIndividual}
            onClick={() => setIsIndividual(true)}
          >
            개인
          </Rightpopup_oneToggleButton>
          <Rightpopup_oneToggleButton
            isActive={!isIndividual}
            onClick={() => setIsIndividual(false)}
          >
            단체
          </Rightpopup_oneToggleButton>
        </Rightpopup_oneButtonGroup>

        {/* 최대 인원 */}
        {!isIndividual && (
          <>
            <Rightpopup_oneLabel>
              최대 인원{' '}
              <Rightpopup_oneWarningIcon>
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
            <Rightpopup_oneInput
              type="number"
              placeholder="최대 인원을 입력하세요"
              value={groupData.maxMembers || ''} // 상태값을 표시
              onChange={(e) => {
                const value = parseInt(e.target.value, 10); // 숫자로 변환
                setMaxMembers(isNaN(value) ? 0 : value); // 숫자가 아니면 0으로 설정
              }}
            />
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
            onClick={() => setIsPasswordSet(false)}
          >
            안함
          </Rightpopup_oneToggleButton>
        </Rightpopup_oneButtonGroup>

        {/* 비밀번호 설정 */}
        {isPasswordSet && (
          <>
            <Rightpopup_oneLabel>비밀번호 설정</Rightpopup_oneLabel>
            <Rightpopup_onePasswordInputWrapper>
              <Rightpopup_oneInput
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Rightpopup_onePasswordInputWrapper>
          </>
        )}
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
