import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 환경 변수에서 주소 불러오기

const uploadRecord = async (groupId, content, page, uploadedFiles) => {
  const accessToken = JSON.parse(
    sessionStorage.getItem('userData'),
  )?.accessToken;

  const formData = new FormData();
  formData.append(
    'jsonData',
    JSON.stringify({
      text: content,
      currentPage: page,
    }),
  );
  // 이미지 파일을 FormData에 추가
  // 어케하노진짜 별짓을해도 업로드가 안되네
  uploadedFiles.forEach((file) => {
    console.log(file);
    formData.append('images', file);
  });

  console.log('폼데이터');
  console.log(formData);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/records?groupId=${groupId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`, // 여기에 토큰값을 넣어줍니다.
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default uploadRecord;
