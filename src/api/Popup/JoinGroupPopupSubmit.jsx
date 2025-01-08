import axios from 'axios';

export const handleOkClick = async (title, subject) => {
  try {
    const response = await axios.post('/api/join-group', { title, subject });
    if (response.status === 200) {
      alert(response.data.message); // 성공 메시지 알림
    }
  } catch (err) {
    throw err; // 에러를 상태로 저장
  }
};
