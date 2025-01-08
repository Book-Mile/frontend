import React from 'react';
import styled from 'styled-components';

const ModalCustomButton = ({
  width = '122px',
  height = '38px',
  backgroundColor = '#ab0909',
  hoverBackgroundColor = '#7b0606',
  color = 'white',
  hoverColor = '#d9d9d9',
  borderColor = 'transparent',
  hoverBorderColor = '#5a0505',
  onClick,
  children = '확인', // 기본 텍스트
}) => {
  return (
    <CustomButton
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      color={color}
      hoverColor={hoverColor}
      borderColor={borderColor}
      hoverBorderColor={hoverBorderColor}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

const CustomButton = styled.div`
  color: ${(props) => props.color};
  font-size: 18px;
  font-weight: bold;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background: ${(props) => props.backgroundColor};
  border: 2px solid ${(props) => props.borderColor}; /* 테두리 색 */
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  /* 호버 효과 */
  &:hover {
    background: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverColor};
    border-color: ${(props) => props.hoverBorderColor}; /* 호버 시 테두리 색 */
    transition: all 0.3s ease; /* 부드러운 전환 효과 */
  }
`;

export default ModalCustomButton;
