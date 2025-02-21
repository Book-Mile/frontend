import axios from 'axios';

export { emailRequest, checkEmailVerification } from './SignUpRequest.jsx';
import { handleLogout } from '/src/utils/publicFunctions.js';

export { getLinkedSocialLogins } from '/src/api/Pages/SNSManageRequest.jsx';

const accessToken = JSON.parse(sessionStorage.getItem('userData'))?.accessToken;

export const getUserInfo = async (setEmail, setNickname, setImage) => {
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
      setEmail(response.data.response.email);
      setNickname(response.data.response.nickName);
      setImage(response.data.response.image);
    } else {
      alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');

    throw error;
  }
};

//소셜 로그인 정보를 받아오는 함수
export const getSocialInfo = async () => {
  const apiUrl = 'https://bookmile.site/api/v1/oauth2'; // API 엔드포인트

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('소셜 정보 불러오기 성공!');
      console.log(response.data);
    } else {
      alert('소셜 정보를 불러오는 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('소셜 정보를 불러오는 중 오류가 발생하였습니다.');

    throw error;
  }
};

//닉네임 중복 확인 함수
export const checkNicknameExists = async (nickname) => {
  const apiUrl = `https://bookmile.site/api/v1/users/exists?nickname=${encodeURIComponent(nickname)}`; // URL에 nickname을 쿼리 파라미터로 포함

  const requestBody = {
    nickname: nickname,
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      if (!response.data) {
        //true인 경우(이미 존재)
        alert('사용할 수 있는 닉네임입니다.');
        return true;
      } else {
        alert('이미 존재하는 닉네임입니다.');
        return false;
      }
      console.log('닉네임 중복 검사 성공!');
      console.log(response.data);
    } else {
      alert('닉네임 중복 검사 중 오류가 발생하였습니다.');
    }
  } catch (error) {
    alert('닉네임 중복 검사 중 오류가 발생하였습니다.');

    throw error;
  }
};

export const changePassword = async (
  originPassword,
  newPassword,
  checkPassword,
) => {
  const apiUrl = 'https://bookmile.site/api/v1/users/password'; // API 엔드포인트

  const requestBody = {
    originPassword: originPassword,
    newPassword: newPassword,
    checkPassword: checkPassword,
  };

  try {
    const response = await axios.put(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      alert('비밀번호가 변경되었습니다!');
    } else {
      alert(
        `비밀번호 변경 실패: ${response.data.message || '알 수 없는 오류'}`,
      );
    }
  } catch (error) {
    if (error.response) {
      // 서버에서 반환한 에러가 있는 경우
      alert(`오류 발생: ${error.response.data.message || '서버 오류'}`);
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못한 경우
      alert('서버로부터 응답이 없습니다. 네트워크 상태를 확인하세요.');
    } else {
      // 그 외의 오류 처리
      alert(`요청 처리 중 오류 발생: ${error.message}`);
    }

    throw error;
  }
};

export const changeNicknameEmail = async (
  nickname,
  email,
  setName,
  navigate,
) => {
  const apiUrl = 'https://bookmile.site/api/v1/users'; // API 엔드포인트

  const requestBody = {
    nickname: nickname,
    email: email,
  };

  try {
    const response = await axios.put(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      handleLogout(setName);
      alert('변경되었습니다. 다시 로그인해주세요.');
      navigate('/');
    } else {
      alert(`변경 실패: ${response.data.message || '알 수 없는 오류'}`);
    }
  } catch (error) {
    if (error.response) {
      // 서버에서 반환한 에러가 있는 경우
      alert(`오류 발생: ${error.response.data.message || '서버 오류'}`);
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못한 경우
      alert('서버로부터 응답이 없습니다. 네트워크 상태를 확인하세요.');
    } else {
      // 그 외의 오류 처리
      alert(`요청 처리 중 오류 발생: ${error.message}`);
    }

    throw error;
  }
};

// 프로필 이미지 변경 API 호출 함수
export const updateProfileImage = async (file, accessToken) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.put(
      'https://bookmile.site/api/v1/users/profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('프로필 사진 변경에 실패했습니다. 다시 시도해주세요.');
  }
};
