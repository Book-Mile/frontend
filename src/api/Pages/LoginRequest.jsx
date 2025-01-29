import axios from 'axios';

export const login = async (email, password, navigate, name, setName) => {
  const apiUrl = 'https://bookmile.site/api/v1/users/sign-in'; // API 엔드포인트
  const requestBody = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(response.data);

      const accessToken = response.data.response.accessToken;
      const refreshToken = response.data.response.refreshToken;
      getUserInfo(accessToken, refreshToken, setName, navigate);
    } else {
      alert('로그인 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('아이디 또는 비밀번호를 확인해주세요.');

    throw error;
  }
};

const getUserInfo = async (accessToken, refreshToken, setName, navigate) => {
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
      // 저장할 데이터 객체
      const userData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        nickName: response.data.response.nickName,
      };

      // 객체를 JSON 문자열로 변환하여 세션 스토리지에 저장
      sessionStorage.setItem('userData', JSON.stringify(userData));

      setName(response.data.response.nickName);
      alert(response.data.response.nickName + '님 안녕하세요!');
      navigate('/'); //홈화면으로 이동
    } else {
      alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');

    throw error;
  }
};
