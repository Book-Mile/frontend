import axios from 'axios';

export const RightPopup_oneRequestList = async (
  setGroups,
  setErrorMessage,
  subject,
) => {
  try {
    const response = await axios.get('/api/groups', { params: { subject } }); // 예시 API 호출
    if (response.status === 200) {
      setGroups(response.data); // 그룹 데이터를 상태에 저장
    } else {
      console.log('sadjflsdjlf');
      setErrorMessage('그룹 정보를 불러오는 데 실패했습니다.');
    }
  } catch (error) {
    setErrorMessage('서버 오류가 발생했습니다.');
    console.log('sadjflsdjlf');
    throw error;
  }
};
