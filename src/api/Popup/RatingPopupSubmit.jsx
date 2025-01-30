import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기
export const RatingPopupSubmit = async (rating, text, id) => {
  try {
    //추후 수정
    const token = 123456465798;
    console.log(rating, text);
    const response = await axios.post(
      `${BASE_URL}/api/v1/reviews`,
      { rating, text },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 여기에 토큰값을 넣어줍니다.
        },
      },
    );
    if (response.status === 200) {
      alert(response.data.message); // 성공 메시지 알림
    }
  } catch (err) {
    console.error('실패:', err);
  }
};
