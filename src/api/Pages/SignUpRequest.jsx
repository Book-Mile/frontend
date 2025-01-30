import axios from 'axios';

export const registerUser = async (
  email,
  password,
  passwordconfirm,
  navigate,
) => {
  const apiUrl = 'https://bookmile.site/api/v1/users/sign-up'; // API 엔드포인트
  const requestBody = {
    email: email,
    password: password,
    checkPassword: passwordconfirm,
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*', // 필요한 경우 유지
      },
    });

    if (response.status === 200) {
      alert('회원가입을 성공하였습니다!');
      navigate('/login'); // 성공 시 로그인 페이지로 이동
    } else {
      alert(`회원가입 실패: ${response.data.message || '알 수 없는 오류'}`);
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

export const emailRequest = async (email) => {
  const apiUrl = 'https://bookmile.site/api/v1/users/email'; // API 엔드포인트
  const requestBody = {
    email: email,
  };
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('이메일로 인증번호를 전송하였습니다.');
    } else {
      alert(
        `인증번호 전송 실패: ${response.data.message || '알 수 없는 오류'}`,
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

export const checkEmailVerification = async (email, authNum, setIsAuthed) => {
  const apiUrl = 'https://bookmile.site/api/v1/users/email/verify'; // API 엔드포인트
  const requestBody = {
    email: email,
    code: authNum,
  };
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('이메일 인증에 성공하였습니다!');
      setIsAuthed(true);
    } else {
      alert(`이메일 인증 실패: ${response.data.message || '알 수 없는 오류'}`);
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
