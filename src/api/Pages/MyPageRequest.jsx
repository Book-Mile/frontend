import axios from 'axios';

const accessToken = JSON.parse(sessionStorage.getItem('userData'))?.accessToken;

export const getUserGroups = async (status) => {
  try {
    const apiUrl = `https://bookmile.site/api/v1/user-groups/my-groups?status=${status}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(apiUrl);
    console.log('조회 결과:', response.data);
    return response.data.response;
  } catch (error) {
    console.error('그룹 조회 오류:', error);
    throw error;
  }
};

export const getUserInfo = async () => {
  const apiUrl = 'https://bookmile.site/api/v1/users'; // API 엔드포인트

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('유저 정보 불러오기 성공!');
      console.log(response.data);
      return response.data.response;
    } else {
      alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');

    throw error;
  }
};
