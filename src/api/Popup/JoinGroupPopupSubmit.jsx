import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기
export const handleOkClick = async (id, password) => {
  try {
    const processedPassword = password ?? '';
    // 요청 데이터 객체 생성
    const data = {
      id,
      password: processedPassword,
    };
    console.log(data);

    //추후 수정
    const token = 123456465798;

    const response = await axios.post(`${BASE_URL}/api/v1/groups/${id}`, data, {
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
