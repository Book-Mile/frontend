import axios from 'axios';

const API_BASE_URL = 'https://bookmile.site/api/v1/groups';

/**
 * 그룹 상태 변경 API 요청 함수
 * @param {number} groupId - 변경할 그룹의 ID
 * @param {string} status - 변경할 상태 (RECRUITING, IN_PROGRESS, COMPLETED)
 * @param {string} accessToken - 사용자 액세스 토큰
 * @returns {Promise} - API 응답 Promise
 */
export const updateGroupStatus = async (groupId, status, accessToken) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${groupId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '그룹 상태 변경에 실패했습니다.';
  }
};
