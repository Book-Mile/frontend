import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청을 보낼 때 Access Token 자동 추가
apiClient.interceptors.request.use(
  (config) => {
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
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      }
    }
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken'); // 세션 쿠키에서 refreshToken 가져오기
    console.log('📌 현재 refreshToken:', refreshToken);

    if (!refreshToken) {
      console.error('🚨 No refresh token available → 로그아웃 실행!');
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

    // 새 토큰을 쿠키에 저장
    Cookies.set('accessToken', accessToken, {
      secure: true,
      sameSite: 'Strict',
    });
    Cookies.set('refreshToken', newRefreshToken, {
      secure: true,
      sameSite: 'Strict',
    });

    return accessToken;
  } catch (error) {
    console.error('🚨 토큰 갱신 실패:', error.response?.data || error.message);
    handleLogout();
    return null;
  }
};

const handleLogout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  window.location.href = '/login';
};

export default apiClient;
