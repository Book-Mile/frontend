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

    const response = await axios.get(
      `${BASE_URL}/api/v1/templates/${bookId}`, // bookId를 path parameter로 전달
      {
        params: { bookId, goalType: subject }, // 쿼리 파라미터 추가
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // 토큰 추가
        },
      },
    );

    if (response.status === 200) {
      setGroups(response.data.response); // 그룹 데이터를 상태에 저장
    } else {
      setGroups(response.data.response); // 그룹 데이터를 상태에 저장
    }
  } catch (error) {
    setErrorMessage('서버 오류가 발생했습니다.');
    console.log('오류오류');
    throw error;
  }
};
