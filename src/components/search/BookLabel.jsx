import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  border: 1px solid ${props => props.theme.colors.main};
  border-radius: 5px;
  padding: 4px 10px;
  background: #fff0f0;
  display: flex;
  align-items: center;
  width: auto;
`;

const Text = styled.span`
  font-size: ${({ fontSize }) => fontSize || '12px'};
  text-align: center;
  color: ${props => props.theme.colors.main};
`;

function BookLabel({ text, fontSize }) {
  return (
    <Container>
      <Text fontSize={fontSize}>{text}</Text>
    </Container>
  );
}

export default BookLabel;
