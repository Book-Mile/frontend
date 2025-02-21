import axios from 'axios';

const accessToken = JSON.parse(sessionStorage.getItem('userData'))?.accessToken;

// API 호출 함수
export const getLinkedSocialLogins = async () => {
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await axios.get('https://bookmile.site/api/v1/oauth2', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: '*/*',
      },
    });

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error; // 오류를 다시 던져서 처리
  }
};

// SNS 연동 해제
export const unlinkSocialLogin = async (provider) => {
  try {
    const response = await axios.post(
      `https://bookmile.site/api/v1/oauth2/unlink/${provider}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: '*/*',
        },
      },
    );
    const data = response.data;
    if (response.status === 200) {
      console.log(`Successfully unlinked ${provider}`);
    } else {
      console.error(`Failed to unlink ${provider}: ${data.message}`);
    }
  } catch (error) {
    console.error(`Error unlinking ${provider}:`, error);
  }
};
