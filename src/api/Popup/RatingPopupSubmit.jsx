import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기

export const RatingPopupSubmit = async (rating, text, bookId) => {

  try {
    const accessToken = JSON.parse(
      sessionStorage.getItem('userData'),
    )?.accessToken;
    console.log(rating, text, bookId);

    const response = await axios.post(
      `${BASE_URL}/api/v1/reviews`,
      { rating, text },
      {
        params: { bookId },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // 여기에 토큰값을 넣어줍니다.
        },
      },
    );
    if (response.status === 200) {
      alert(response.data.message); // 성공 메시지 알림
    }
    alert('성공'); // 성공 메시지 알림
  } catch (err) {
    alert('실패'); // 성공 메시지 알림
    console.error('실패:', err);
  }
};
