import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기
export const RatingPopupSubmit = async (rating, text) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get('isbn'); // URL에서 isbn13 가져와서 bookId로 사용
  try {
    const accessToken = JSON.parse(
      sessionStorage.getItem('userData'),
    )?.accessToken;

    console.log(rating, text);
    const response = await axios.post(
      `${BASE_URL}/api/v1/reviews?bookId=${bookId}`,
      { rating, text },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // 여기에 토큰값을 넣어줍니다.
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
