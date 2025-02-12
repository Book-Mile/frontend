import React from 'react';
import styled from 'styled-components';

import Speed from '/src/assets/ModeTagAssets/Speed.svg';
import Page from '/src/assets/ModeTagAssets/Page.svg';

const ModeTag = ({ mode }) => {
  return (
    <>
      <MainContainer>
        {mode === 'SPEED' ? (
          <>
            <img src={Speed} /> 속도
          </>
        ) : mode === 'PAGE' ? (
          <>
            <img src={Page} /> 페이지
          </>
        ) : (
          <></>
        )}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  gap: 6px;

  width: fit-content;
  height: 20px;

  background: #ffffff;
  border: 1px solid #4e202a;
  border-radius: 5px;

  font-style: normal;
  font-weight: 350;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #4e202a;
`;

export default ModeTag;
