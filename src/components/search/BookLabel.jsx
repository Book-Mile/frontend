import React from 'react';
import styled from 'styled-components';

// 아이콘 넣을 컨테이너 스타일
const Container = styled.span`
  border: 1px solid ${props => props.theme.colors.main};
  border-radius: 5px;
  padding: 4px 10px;
  background: #fff0f0;
  display: flex;
  align-items: center;
  width: auto;
  display: flex;
  gap: 4px;
`;

// 텍스트 스타일
const Text = styled.span`
  font-size: ${({ fontSize }) => fontSize || '12px'};
  text-align: center;
  color: ${props => props.theme.colors.main};
`;

function BookLabel({ text, fontSize, icon }) {
  return (
    <Container>
      {icon}
      <Text fontSize={fontSize}>{text}</Text>
    </Container>
  );
}

export default BookLabel;
