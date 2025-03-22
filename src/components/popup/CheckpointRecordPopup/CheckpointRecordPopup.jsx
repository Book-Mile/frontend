import { useState, useEffect } from 'react';
import {
  PopupContainer,
  PopupInner,
} from '../../../styled_components/popupStyle';
import { useNavigate } from 'react-router-dom';
import useClosePopupAnimation from '../../../hooks/useClosePopupAnimation';
import styled from 'styled-components';
import ModalButtonOk from '../../modalButton/ModalButtonOk';
import ModalButtonCancel from '../../modalButton/ModalButtonCancel';
import uploadRecord from '../../../api/Popup/CheckpointRecordPopupSubmit.jsx';
import Loading from '../../../animations/Loading.jsx';
import CompletePopup from '../RegisterCompletePopup/RegisterCompletePopup';

// 업로드 미리보기창에 보여지는 각 파일 컴포넌트
const FileInfo = ({ file, onDelete }) => {
  return (
    <img
      src={file.imageUrl}
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
      onClick={onDelete}
    />
  );
};

//팝업창 컴포넌트
const CheckpointRecordPopup = ({ groupId }) => {
  const [isClosing, setIsClosing] = useState(false); // 닫힘 상태 관리
  const [page, setPage] = useState('');
  const [content, setContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // 파일들을 배열로 관리
  const [isActive, setActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
  };

  const handleDragStart = (event) => {
    event.preventDefault();
    setActive(true);
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    setActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    // 파일 개수 제한
    if (uploadedFiles.length >= 4) {
      alert('더 이상 추가할 수 없어요.');
      return;
    }

    // 파일 크기 제한 (1MB 이하)
    if (file.size > 1024 * 1024) {
      alert('파일 크기는 1MB 이하만 업로드 가능합니다.');
      return;
    }

    // 파일 형식 제한 (JPG, JPEG, PNG)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('JPG, JPEG, PNG 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + 'mb',
        type: file.type,
        imageUrl: reader.result,
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    };
    reader.readAsDataURL(file);
    setActive(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const handleSubmit = async () => {
    if (!page || !content) {
      alert('페이지 수와 내용을 모두 작성해주세요.');
      return;
    }

    setLoading(true);

    try {
      if (content && page) {
        // 업로드 로직 구현
        await uploadRecord(groupId, content, page, uploadedFiles);
        alert('기록이 성공적으로 업로드되었습니다.');
        setPage('');
        setContent('');
        setUploadedFiles([]);
      } else {
        alert('페이지와 내용을 입력해주세요.');
      }
    } catch (error) {
      console.log(error.response.data);
      alert('기록 업로드에 실패했습니다.\n오류 내용 : ' + error.response.data);
    } finally {
      setLoading(false);
      setIsCompleted(true);
    }
  };

  // useClosePopupAnimation(isClosing, onClose);

  // useEffect(() => {
  //   if (isCompleted) {
  //     setTimeout(() => {
  //       navigate('/checkpoints');
  //     }, 10000);
  //   }
  // }, [isCompleted, navigate]);

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
                  resize: 'none',
                }}
              />
            </InputFrame>
            <InputFrame>
              <InputTitle>
                이미지 업로드 (선택사항) {uploadedFiles.length}/4
              </InputTitle>
              <div
                onDragEnter={handleDragStart}
                onDragLeave={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ position: 'relative', zIndex: '10000' }}
              >
                <UploadRectangle isActive={isActive}>
                  {uploadedFiles.length === 0 && (
                    <>
                      <FirstLine>
                        <FirstLineLeft>Click to Upload</FirstLineLeft>
                        <FirstLineRight>or Drag and Drop</FirstLineRight>
                      </FirstLine>
                      <SecondLine> JPG, JPEG, PNG less than 1MB</SecondLine>
                    </>
                  )}
                  {uploadedFiles.length > 0 && (
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
                      {uploadedFiles.map((file, index) => (
                        <FileInfo
                          key={index}
                          file={file}
                          onDelete={() => handleDeleteFile(index)}
                        />
                      ))}
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

      {loading && <Loading />}
      {isCompleted && <CompletePopup />}
    </PopupContainer>
  );
};

export default CheckpointRecordPopup;

//styled components (이하 동일)

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
