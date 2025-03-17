import axios from 'axios';
import Cookies from 'js-cookie'; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Access Token 갱신 API
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('📌 현재 refreshToken:', refreshToken);

    if (!refreshToken) {
      console.error('시간초과로 자동 로그아웃되었습니다.');
      handleLogout();
      return null;
    }

    const response = await axios.post(`${BASE_URL}/users/reissue`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    console.log('✅ 토큰 갱신 성공!', response.data);

    const { accessToken, refreshToken: newRefreshToken } = response.data.response;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('🚨 토큰 갱신 실패:', error.response?.data || error.message);
    handleLogout();
    return null;
  }
};


// 요청을 보낼 때 Access Token 자동 추가
apiClient.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답을 받을 때 Access Token 갱신 로직 추가
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      // Access Token이 만료된 경우
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      }
    }
    return Promise.reject(error);
  },
);



export default apiClient;
