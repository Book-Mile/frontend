import React from 'react';
import styled from 'styled-components';

const ModalButtonOk = ({ width = '122px', height = '38px', onClick }) => {
  return (
    <OkButton width={width} height={height} onClick={onClick}>
      확인
    </OkButton>
  );
};

const OkButton = styled.div`
  color: white; /* 가독성을 위해 텍스트 색상 수정 */
  font-size: 18px;
  font-weight: bold;
  width: ${(props) => props.width}; /* props로 동적 스타일 적용 */
  height: ${(props) => props.height}; /* props로 동적 스타일 적용 */

  background: #ab0909;
  border-radius: 10px;

  display: flex; /* 중앙 정렬 */
  align-items: center;
  justify-content: center;

  cursor: pointer; /* 커서를 포인터로 변경 */

  /* 호버 효과 */
  &:hover {
    background: #7b0606; /* 더 어두운 색 */
    transition: background 0.3s ease; /* 부드러운 전환 효과 */
    color: #d9d9d9;
  }
`;

export default ModalButtonOk;
