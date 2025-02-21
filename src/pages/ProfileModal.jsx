// ProfileModal.js

import { useState } from 'react';
import styled from 'styled-components';
import { updateProfileImage } from '/src/api/Pages/EditMyInfoRequest.jsx'; // api.js에서 함수 임포트

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const Input = styled.input`
  margin: 10px 0;
`;

const PreviewImage = styled.img`
  max-width: 100%; /* 가로 크기를 부모 요소에 맞게 조정 */
  max-height: 300px; /* 세로 크기를 최대 300px로 제한 (원하는 값으로 조정 가능) */
  object-fit: contain; /* 이미지 비율을 유지하면서 크기를 맞춤 */
  margin-top: 10px;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CloseButton = styled(Button)`
  background-color: #f44336;
`;

// eslint-disable-next-line react/prop-types
const ProfileModal = ({ isOpen, onClose, onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accessToken = JSON.parse(
    sessionStorage.getItem('userData'),
  )?.accessToken;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValidFileType = /\.(png|jpeg|jpg)$/.test(file.name);
      if (isValidFileType) {
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
        setError('');
      } else {
        setError('지원되지 않는 파일 형식입니다. PNG, JPEG만 가능합니다.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      await updateProfileImage(selectedImage, accessToken);
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <h2>프로필 사진 변경</h2>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <br />
        {preview && <PreviewImage src={preview} alt="미리보기" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <CloseButton
          onClick={() => {
            setPreview(null);

            onClose();
          }}
        >
          닫기
        </CloseButton>
        <Button onClick={handleUpdate} disabled={loading || !selectedImage}>
          {loading ? '업로드 중...' : '변경하기'}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
