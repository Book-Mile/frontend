import axios from 'axios';
import useUserStore from '../store/store';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Access Token이 만료되면 자동 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log('🔄 Access Token 만료, 갱신 시도 중...');
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/reissue`,
          {},
          { withCredentials: true } 
        );

        const newAccessToken = res.data.accessToken;
        useUserStore.getState().setAccessToken(newAccessToken);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient.request(error.config);
      } catch (reissueError) {
        console.error('🚨 토큰 갱신 실패:', reissueError);
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
