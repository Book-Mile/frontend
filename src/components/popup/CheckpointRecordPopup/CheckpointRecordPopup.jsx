import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';
import Loding from '../../../animations/Loding';
import CompletePopup from '../RegisterCompletePopup/RegisterCompletePopup';

// eslint-disable-next-line react/prop-types
const FileInfo = ({
  uploadedInfo,
  setUploadedInfo,
  setUploadCount,
  uploadCount,
}) => {
  const handleDeleteButton = () => {
    setUploadedInfo(null);
    setUploadCount(uploadCount - 1);
  };

  return (
    <>
      <img
        src={uploadedInfo.imageUrl}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #D4D4D4',
          borderRadius: '8px',
          height: '70px',
          width: '70px',
        }}
        onClick={handleDeleteButton}
      />
    </>
  );
};

const CheckpointRecordPopup = ({ onClose = false }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [page, setPage] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false); 
  const [isCompleted, setIsCompleted] = useState(false); 
  const navigate = useNavigate();

  const handleClose = () => {
    setIsClosing(true);
  };

  const [uploadCount, setUploadCount] = useState(1);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (uploadCount === 5) {
      alert('더 이상 추가할 수 없어요.');
      return;
    }
    setUploadCount(uploadCount + 1);
    setFileInfo(file);
  };

  const [uploadedInfo1, setUploadedInfo1] = useState(null);
  const [uploadedInfo2, setUploadedInfo2] = useState(null);
  const [uploadedInfo3, setUploadedInfo3] = useState(null);
  const [uploadedInfo4, setUploadedInfo4] = useState(null);
  const slotList = [uploadedInfo1, uploadedInfo2, uploadedInfo3, uploadedInfo4];
  const setSlotList = [
    setUploadedInfo1,
    setUploadedInfo2,
    setUploadedInfo3,
    setUploadedInfo4,
  ];

  const setFileInfo = (file) => {
    const { name, type } = file;
    const isImage = type.includes('image');
    const size = (file.size / (1024 * 1024)).toFixed(2) + 'mb';
    const reader = new FileReader();
    reader.onload = () => {
      const emptySlot = findFirstEmptySlot() + 1;
      if (emptySlot === 1)
        setUploadedInfo1({ name, size, type, imageUrl: String(reader.result) });
      else if (emptySlot === 2)
        setUploadedInfo2({ name, size, type, imageUrl: String(reader.result) });
      else if (emptySlot === 3)
        setUploadedInfo3({ name, size, type, imageUrl: String(reader.result) });
      else if (emptySlot === 4)
        setUploadedInfo4({ name, size, type, imageUrl: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const findFirstEmptySlot = () => {
    for (let i = 0; i < slotList.length; i++) {
      if (slotList[i] === null) {
        return i; // 첫 번째 빈 슬롯의 인덱스를 반환
      }
    }
    return -1; // 빈 슬롯이 없을 경우
  };

  const handleSubmit = () => {
    if (!page || !content) {
      alert('페이지 수와 내용을 모두 작성해주세요.');
      return;
    }
  
    setLoading(true); 
  
    setTimeout(() => {
      setLoading(false); 
      setIsCompleted(true); 
    }, 1000); 
  };
  
  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        navigate('/checkpoints'); 
      }, 10000);
    }
  }, [isCompleted, navigate]);
  
  return (
    <PopupContainer isClosing={isClosing}>
      <PopupInner isClosing={isClosing}>
        <PopUpInnerBox1>
          <Title>체크포인트 기록하기</Title>
          <ContentFrame>
            <InputFrame>
              <InputTitle>현재 페이지수</InputTitle>
              <Rectangle
                type="input"
                id="page"
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
            </InputFrame>
            <InputFrame>
              <InputTitle>내용</InputTitle>
              <Rectangle
                as="textarea"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                height="100px"
                placeholder="130자 이내로 작성해주세요."
                style={{
                  textAlign: 'left',
                  verticalAlign: 'top',
                  resize: 'none', // 크기 조정 비활성화
                }}
              />
            </InputFrame>
            <InputFrame>
              <InputTitle>
                이미지 업로드 (선택사항) {uploadCount - 1}/4
              </InputTitle>
              {/* 드래그 앤 드롭 처리 */}
              <div
                onDrop={handleDrop}
                style={{ position: 'relative', zIndex: '10000' }}
              >
                <UploadRectangle>
                  {!(uploadCount > 1) && (
                    <>
                      <FirstLine>
                        <FirstLineLeft>Click to Upload</FirstLineLeft>
                        <FirstLineRight>or Drag and Drop</FirstLineRight>
                      </FirstLine>
                      <SecondLine> JPG, JPEG, PNG less than 1MB</SecondLine>
                    </>
                  )}
                  {uploadCount > 1 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100%',
                        width: '100%',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      {uploadedInfo1 && (
                        <FileInfo
                          uploadedInfo={uploadedInfo1}
                          setUploadedInfo={setUploadedInfo1}
                          setUploadCount={setUploadCount}
                          uploadCount={uploadCount}
                        />
                      )}
                      {uploadedInfo2 && (
                        <FileInfo
                          uploadedInfo={uploadedInfo2}
                          setUploadedInfo={setUploadedInfo2}
                          setUploadCount={setUploadCount}
                          uploadCount={uploadCount}
                        />
                      )}
                      {uploadedInfo3 && (
                        <FileInfo
                          uploadedInfo={uploadedInfo3}
                          setUploadedInfo={setUploadedInfo3}
                          setUploadCount={setUploadCount}
                          uploadCount={uploadCount}
                        />
                      )}
                      {uploadedInfo4 && (
                        <FileInfo
                          uploadedInfo={uploadedInfo4}
                          setUploadedInfo={setUploadedInfo4}
                          setUploadCount={setUploadCount}
                          uploadCount={uploadCount}
                        />
                      )}
                    </div>
                  )}
                </UploadRectangle>
              </div>
            </InputFrame>
          </ContentFrame>
          <ButtonContainer>
            <ModalButtonCancel width="150px" onClick={handleClose} />
            <ModalButtonOk width="150px" onClick={handleSubmit} />
          </ButtonContainer>
        </PopUpInnerBox1>
      </PopupInner>
  
      {loading && <Loding />} 
      {isCompleted && <CompletePopup />}
    </PopupContainer>
  );  
};

export default CheckpointRecordPopup;

//styled components
const PopUpInnerBox1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 60px 40px 60px;
  gap: 40px;

  width: auto;
  height: auto;

  background: #ffffff;
  border-radius: 20px;
`;
const Title = styled.div`
  display: flex;
  width: 100%;

  font-family: ${(props) => props.theme.font.main};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  color: ${(props) => props.theme.colors.main};
  font-style: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 345px;
`;

const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputTitle = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;

  color: #4e202a;
`;

const Rectangle = styled.input`
  width: ${(props) => props.width || '345px'};
  height: ${(props) => props.height || '40px'};
  background: rgba(217, 217, 217, 0);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  flex-grow: 1;
  box-sizing: border-box;

  font-style: normal;
  font-weight: 350;
  line-height: 14px;

  color: #565656;
  padding: 10px;
`;

const UploadRectangle = styled.div`
  width: ${(props) => props.width || '345px'};
  height: ${(props) => props.height || '100px'};
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;

  /* Neutral/25 */
  background: #fafafa;
  /* Neutral/100 */
  border: 1px dashed #e5e5e5;
  border-radius: 10px;

  background-color: ${(props) => (props.isActive ? '#fafafa' : 'transparent')};
  border-color: ${(props) => (props.isActive ? '#e5e5e5' : '#ccc')};

  position: relative;
  z-index: 999;
`;

const FirstLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  position: relative;
  z-index: 999;
`;

const FirstLineLeft = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 18px;
  /* identical to box height, or 180% */

  color: #ab0909;
  position: relative;
  z-index: 999;
`;
const FirstLineRight = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 18px;
  /* identical to box height, or 180% */

  color: #4e202a;
  position: relative;
  z-index: 999;
`;

const SecondLine = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 16px;
  /* identical to box height, or 200% */

  /* Neutral/300 */
  color: #a3a3a3;
  position: relative;
  z-index: 999;
`;
