import { useState } from 'react';

const makingGroupForm = () => {
  // 상태값 정의
  const [groupName, setGroupName] = useState(''); // 그룹명 상태
  const [maxMembers, setMaxMembers] = useState(2); // 최대 인원 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태

  // 상태값을 반환
  const groupData = {
    groupName,
    maxMembers: parseInt(maxMembers, 10), // 숫자로 변환
    password: password ? password : null, // 비밀번호 설정 시만 값 저장
  };

  // 초기화 함수
  const resetForm = () => {
    setGroupName(''); // 그룹명 초기화
    setMaxMembers(''); // 최대 인원 초기화
    setPassword(''); // 비밀번호 초기화
  };

  // 입력 핸들러 및 상태와 데이터 반환
  return {
    groupData,
    setGroupName,
    setMaxMembers,
    setPassword,
    resetForm, // 초기화 함수 반환
  };
};

export default makingGroupForm;
