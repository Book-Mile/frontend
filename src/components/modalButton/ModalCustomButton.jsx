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
  children = '확인',
  fontSize = '18px',
  fontWeight = 'bold',
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
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </CustomButton>
  );
};

const CustomButton = styled.div`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize}; 
  font-weight: ${(props) => props.fontWeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background: ${(props) => props.backgroundColor};
  border: 2px solid ${(props) => props.borderColor};
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    background: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverColor};
    border-color: ${(props) => props.hoverBorderColor};
    transition: all 0.3s ease;
  }
`;

export default ModalCustomButton;
