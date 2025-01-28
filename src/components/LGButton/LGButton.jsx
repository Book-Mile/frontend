import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  --default-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', Helvetica, Arial, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft Yahei UI', 'Microsoft Yahei',
    'Source Han Sans CN', sans-serif;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 10px;
  position: relative;
  width: ${(props) => props.width || '148px'};
  height: ${(props) => props.height || '40px'};
  margin: 0 auto;
  padding: 10px 10px 10px 10px;
  background-color: ${(props) => props.bgColor || '#FFFFFF'};
  border: 2px solid ${(props) => props.borderColor || props.theme.colors.main};
  border-radius: ${(props) => props.radius || '30px'};
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }

  cursor: pointer;

  input,
  select,
  textarea,
  button {
    outline: 0;
  }
`;

const SignIn = styled.span`
  position: absolute;
  color: ${(props) => props.textColor || '#ab0909'};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${(props) => props.textSize || '20px'};
  font-weight: ${(props) => props.fontWeight || '400'};
`;

export default function Main({
  text,
  width,
  height,
  bgColor,
  fontWeight,
  func,
  textColor,
  borderColor,
  radius,
  fontSize,
}) {
  return (
    <div onClick={func}>
      <MainContainer
        width={width}
        height={height}
        bgColor={bgColor}
        borderColor={borderColor}
        radius={radius}
      >
        <SignIn
          textSize={fontSize}
          textColor={textColor}
          fontWeight={fontWeight}
        >
          {text}
        </SignIn>
      </MainContainer>
    </div>
  );
}
