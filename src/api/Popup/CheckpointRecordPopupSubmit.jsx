import axios from 'axios';

/**
 * 체크포인트 기록 업로드 API
 * @param {number} groupId - 그룹 ID
 * @param {string} text - 기록 내용
 * @param {number} currentPage - 현재 페이지 번호
 * @param {File[]} images - 업로드할 이미지 파일 목록
 * @returns {Promise<Object>}
 */
const uploadRecord = async ({ groupId, text, currentPage, images }) => {
  try {
    const accessToken = JSON.parse(
      sessionStorage.getItem('userData'),
    )?.accessToken;
    if (!accessToken) throw new Error('로그인이 필요합니다.');

    const formData = new FormData();
    formData.append(
      'jsonData',
      new Blob([JSON.stringify({ text, currentPage })], {
        type: 'application/json',
      }),
    );

    if (images?.length) {
      images.forEach((image) => formData.append('images', image));
    }

    const apiUrl = 'https://bookmile.site/api/v1/records'; // API 엔드포인트

    const response = await axios.post(
      `${apiUrl}?groupId=${groupId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('기록 업로드 실패:', error);
    throw error;
  }
};

export default uploadRecord;
