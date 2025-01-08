import axios from 'axios';

export const handleMakingGroupSubmit = async (
  subject,
  groupName,
  maxMembers,
  password,
) => {
  try {
    const response = await axios.post('/api/making-group', {
      subject,
      groupName,
      maxMembers,
      password,
    });
    if (response.status === 200) {
      alert(response.data.message); // 성공 메시지 알림
    }
  } catch (err) {
    throw err; // 에러를 상태로 저장
  }
};
