import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기

export const SecessionUserPopupDelete = async () => {
  try {
    const accessToken = JSON.parse(
      sessionStorage.getItem('userData'),
    )?.accessToken;
    console.log(`${BASE_URL}/api/v1/users`);

    const response = await axios.delete(`${BASE_URL}/api/v1/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 여기에 토큰값을 넣어줍니다.
      },
    });
    console.log(response);
    if (response.status === 204) {
      alert(response.data.message); // 성공 메시지 알림
    } else {
      alert('실패');
    }
  } catch (err) {
    console.error('실패:', err);
  }
};
