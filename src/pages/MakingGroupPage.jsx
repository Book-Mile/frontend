import React from 'react';
import styled from 'styled-components';
import GroupCards from '../components/makingGroupComponents/GroupCards';

const MakingGroupPage = () => {
  return (
    <PageContainer>
      <Background />
      <GroupCards />
    </PageContainer>
  );
};

//css

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Background = styled.div`
  position: absolute; /* 배치 조정을 위해 사용 */
  width: 100%;
  height: 100%;
  filter: blur(80px); /* 블러 효과 추가 */
  background: radial-gradient(ellipse, red 0%, transparent 50%);
  z-index: -1; /* 뒤로 보내기 */
`;

export default MakingGroupPage;
