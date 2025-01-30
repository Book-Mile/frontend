import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기

export const SecessionUserPopupDelete = async () => {
  try {
    //추후 수정
    const token = 123456465798;
    const response = await axios.delete(`${BASE_URL}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // 여기에 토큰값을 넣어줍니다.
      },
    });
    if (response.status === 200) {
      alert(response.data.message); // 성공 메시지 알림
    }
  } catch (err) {
    console.error('실패:', err);
  }
};
