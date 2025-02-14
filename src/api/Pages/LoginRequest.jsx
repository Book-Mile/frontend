import apiClient from '../apiClient'
import Cookies from 'js-cookie'; 

export const login = async (email, password, navigate, setName) => {
  const apiUrl = '/users/sign-in'; 

  const requestBody = {
    email: email,
    password: password,
  };

  try {
    const response = await apiClient.post(apiUrl, requestBody);  

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data.response;

      // 쿠키에 토큰 저장
      Cookies.set('accessToken', accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

      // 사용자 정보 가져오기
      await getUserInfo(accessToken, refreshToken, setName, navigate);
    } else {
      alert('로그인 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('아이디 또는 비밀번호를 확인해주세요.');
    console.error(error);
  }
};

// 사용자 정보 가져오기
const getUserInfo = async (accessToken, refreshToken, setName, navigate) => {
  const apiUrl = '/users';  

  try {
    const response = await apiClient.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('유저 정보 불러오기 성공!', response.data);
      const { nickName } = response.data.response;

      // 세션 스토리지에 사용자 정보 저장
      sessionStorage.setItem(
        'userData',
        JSON.stringify({ accessToken, refreshToken, nickName })
      );

      if (typeof setName === 'function') {
        setName(nickName);
        alert(`${nickName}님 안녕하세요!`);
      } else {
        console.error('setName이 함수가 아닙니다:', setName);
      }

      navigate('/');
    } else {
      alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    console.error(error);
  }
};
