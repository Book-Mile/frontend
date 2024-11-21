import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  --default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", 
    "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
    "Source Han Sans CN", sans-serif;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 10px;
  position: relative;
  width: 148px;
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

export default function Main() {
  return <MainContainer />;
}
