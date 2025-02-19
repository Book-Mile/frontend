import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기
// usagecount: 등수
// 등수에 따른 방장 프로필 이미지
export const RightPopup_oneRequestList = async (
  setGroups,
  setErrorMessage,
  subject,
  bookId,
) => {
  try {
    const accessToken = JSON.parse(
      sessionStorage.getItem('userData'),
    )?.accessToken;

    const response = await axios.post(
      `${BASE_URL}/api/v1/templates/${bookId}`,
      {
        params: { subject },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // 여기에 토큰값을 넣어줍니다.
        },
      },
    );

    if (response.status === 200) {
      setGroups(response.data); // 그룹 데이터를 상태에 저장
    } else {
      setErrorMessage('그룹 정보를 불러오는 데 실패했습니다.');
    }
  } catch (error) {
    setErrorMessage('서버 오류가 발생했습니다.');
    console.log('sadjflsdjlf');
    throw error;
  }
};
