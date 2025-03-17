import apiClient from '../apiClient';
import Cookies from 'js-cookie';

function setUserInfo(accessToken, refreshToken) {
  // 쿠키에 토큰 저장
  Cookies.set('accessToken', accessToken, {
    expires: 7,
    secure: true,
    sameSite: 'Strict',
  });
  Cookies.set('refreshToken', refreshToken, {
    expires: 7,
    secure: true,
    sameSite: 'Strict',
  });
}

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
      setUserInfo(accessToken, refreshToken);

      // 사용자 정보 가져오기
      await getUserInfo(accessToken, refreshToken, setName, navigate);
    } else {
      alert('로그인 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert(error.response.data.message);
    console.error(error);
  }
};

// 사용자 정보 가져오기
const getUserInfo = async (accessToken, refreshToken, setName) => {
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
        JSON.stringify({ accessToken, refreshToken, nickName }),
      );

      if (typeof setName === 'function') {
        setName(nickName);
        alert(`${nickName}님 안녕하세요!`);
      } else {
        console.error('setName이 함수가 아닙니다:', setName);
      }

      // navigate('/');
      window.location.href = '/';
    } else {
      alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    console.error(error);
  }
};

// 소셜로그인
export const socialLogin = async (platform) => {
  const baseUrl = 'https://bookmile.site/oauth2/authorize'; // 기본 URL
  const redirectUri = encodeURIComponent('http://localhost:3000/'); // 리디렉션 URI (변경 필요)

  // 선택한 플랫폼에 따른 로그인 URL 생성
  const loginUrl = `${baseUrl}/${platform}?redirect_uri=${redirectUri}`;

  // 새로운 창에서 소셜 로그인 페이지로 리다이렉트
  window.location.href = loginUrl;
};

// 리다이렉트 후, URL에서 파라미터를 추출하고 로그인 처리하는 함수
export function handleRedirect(setName) {
  const accessToken = getQueryParam('accessToken');
  const refreshToken = getQueryParam('refreshToken');

  if (accessToken && refreshToken) {
    // 토큰을 활용한 로그인 처리
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    setUserInfo(accessToken, refreshToken, setName);

    getUserInfo(accessToken, refreshToken, setName);
  } else {
    console.error('Tokens are missing or invalid');
  }
}

// URL에서 파라미터를 추출하는 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search); // URL의 쿼리 스트링 파라미터를 가져옴
  return urlParams.get(param); // 해당 파라미터 값 반환
}
