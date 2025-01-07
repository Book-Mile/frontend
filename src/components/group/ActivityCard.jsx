import React from 'react';
import styled from 'styled-components';
import ModalButton from '../modalButton/ModalButtonOk';

// 기본 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  flex-grow: 0;
  flex-shrink: 0;
  height: 350px;
  width: 330px;
  position: relative;
  overflow: hidden;
  gap: 5px;
  padding: 30px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.sub}; // 서브 색상
  border: 1px solid ${(props) => props.theme.colors.main}; // 메인 색상
`;

// 상단 섹션
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
`;

// 이미지
const Image = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
`;

// 진행 상태 표시 바
const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 4px 16px;
  border-radius: 5px;
  border: 1px solid #565656;
`;

// 텍스트
const ProgressText = styled.p`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  text-align: left;
`;

const MainText = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.body}; // 본문 색상
`;

const AuthorText = styled.p`
  flex-grow: 0;
  flex-shrink: 0;
  text-align: left;
  font-size: 12px;
  color: ${(props) => props.theme.colors.body}; // 본문 색상
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  position: relative;
  width: 140px;
  height: 40px;
`;

function MyComponent() {
  return (
    <Container>
      <TopSection>
        <Image src="image.png" alt="image" />
        <ProgressBar>
          <ProgressText>
            <span style={{ fontSize: '12px', color: '#4E202A' }}>12</span>
            <span style={{ fontSize: '10px', color: '#565656' }}>/30</span>
          </ProgressText>
        </ProgressBar>
      </TopSection>
      <div>
        <AuthorText>박영인</AuthorText>
        <MainText>베르테르 뮤지컬 예습</MainText>
      </div>
      <ButtonContainer>
      <ModalButton/>
      </ButtonContainer>
    </Container>
  );
}

export default MyComponent;
