import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기

export const handleMakingGroupSubmit = async (
  inputValue,
  subject,
  groupName,
  maxMembers,
  password,
  text, //그룹 소개
  isIndividual,
) => {
  try {
    const processedPassword = password ?? '';
    const groupType = isIndividual ? 'individual' : 'group';
    const processedMaxMembers = isIndividual ? 'null' : maxMembers;
    // 요청 데이터 객체 생성
    const data = {
      groupName: groupName,
      groupType: groupType,
      maxMembers: processedMaxMembers,
      password: processedPassword,
      isbn13: '9788936434595', //책 api 아이디디
      groupDescription: text,
      templateId: 1,
      goalType: subject,
      //inputValue가 null이면 나만의 속도
      goalContent: `하루에 ${inputValue}페이지 읽기`,
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
