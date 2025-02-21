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

  uploadedFiles.forEach((file) => {
    // 이미지 URL을 실제 파일 객체로 변환하여 추가
    const byteString = atob(file.imageUrl.split(',')[1]); // Base64 데이터에서 실제 byte 데이터 추출
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const fileBlob = new Blob([ab], { type: 'image/jpeg' }); // 타입은 실제 이미지 타입에 맞게 설정
    formData.append('images', fileBlob, file.name);
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/records?groupId=${groupId}`,
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
    console.error('업로드 실패:', error);
    throw error; // 필요 시 사용자에게 더 명확한 에러 메시지를 전달할 수 있습니다.
  }
};

export default uploadRecord;
