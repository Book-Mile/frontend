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
  height: 48px;
  margin: 0 auto;
  padding: 10px 10px 10px 10px;
  background: #ffffff;
  border: 2px solid #ab0909;
  border-radius: 30px;
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }

  input,
  select,
  textarea,
  button {
    outline: 0;
  }
`;

const SignIn = styled.span`
  position: absolute;
  color: #ab0909;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: 400;
`;

export default function Main({ text, width }) {
  return (
    <div>
      <MainContainer style={{ width }}>
        <SignIn>{text}</SignIn>
      </MainContainer>
    </div>
  );
}
