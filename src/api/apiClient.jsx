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
    const refreshToken = Cookies.get('refreshToken');  
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${BASE_URL}/users/reissue`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = response.data.accessToken;
    Cookies.set('accessToken', newAccessToken, { expires: 7, secure: true, sameSite: 'Strict' });  
    return newAccessToken;
  } catch (error) {
    console.error('Refresh token expired or invalid:', error.response?.data || error.message);
    Cookies.remove('accessToken');  
    Cookies.remove('refreshToken');
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
