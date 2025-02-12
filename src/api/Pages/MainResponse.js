import axios from 'axios';

export const fetchNewBooks = async (accessToken) => {
  const apiUrl = 'https://bookmile.site/api/v1/books/new-books'; // API 엔드포인트

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200 && response.data?.response) {
      return response.data.response; // 책 데이터 반환
    } else {
      console.warn('API Response Error:', response.data);
      return [];
    }
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return [];
  }
};
