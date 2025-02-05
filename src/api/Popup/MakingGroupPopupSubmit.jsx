import axios from 'axios';
import { sub } from 'framer-motion/client';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기

export const handleMakingGroupSubmit = async (
  inputValue,
  subject,
  groupName,
  maxMembers,
  password,
  text, //그룹 소개
  isIndividual,
  bookId,
) => {
  try {
    let goalContent = '';
    if (subject === 'CHAPTER') {
      goalContent = `하루에 ${inputValue}챕터 읽기`;
    } else if (subject === 'PAGE') {
      goalContent = `하루에 ${inputValue}페이지지 읽기`;
    } else if (subject === 'NUMBER') {
      goalContent = `하루에 ${inputValue}회회 읽기`;
    } else if (subject === 'CUSTOM') {
      goalContent = null;
    }
    const processedPassword = password ?? '';
    const groupType = isIndividual ? 'individual' : 'group';
    const processedMaxMembers = isIndividual ? 'null' : maxMembers;

    // 요청 데이터 객체 생성
    const data = {
      groupName: groupName,
      groupType: groupType,
      maxMembers: processedMaxMembers,
      password: processedPassword,
      isbn13: bookId, //책 api 아이디
      groupDescription: text,
      templateId: 1,
      goalType: subject,
      //inputValue가 null이면 나만의 속도
      goalContent: goalContent,
    };
    console.log(data);

    const accessToken = JSON.parse(
      sessionStorage.getItem('userData'),
    )?.accessToken;

    const response = await axios.post(`${BASE_URL}/api/v1/groups`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 여기에 토큰값을 넣어줍니다.
      },
    });

    if (response.status === 200) {
      alert('성공' + response.data.message);
    }
  } catch (err) {
    console.error('그룹 생성 실패:', err);
  }
};
