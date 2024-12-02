import React from 'react';
import styled from 'styled-components';

const ModalButtonCancel = ({ width = '122px', height = '38px', onClick }) => {
  return (
    <CencelButton width={width} height={height} onClick={onClick}>
      취소
    </CencelButton>
  );
};

const CencelButton = styled.div`
  color: black; /* 가독성을 위해 텍스트 색상 수정 */
  border: 1px solid #d2d2d2;
  font-size: 18px;
  width: ${(props) => props.width}; /* props로 동적 스타일 적용 */
  height: ${(props) => props.height}; /* props로 동적 스타일 적용 */

  background: #fff;
  border-radius: 10px;

  display: flex; /* 중앙 정렬 */
  align-items: center;
  justify-content: center;

  cursor: pointer; /* 커서를 포인터로 변경 */

  /* 호버 효과 */
  &:hover {
    background: #d9d9d9; /* 더 어두운 색 */
    transition: background 0.3s ease; /* 부드러운 전환 효과 */
    color: black;
  }
`;

export default ModalButtonCancel;
