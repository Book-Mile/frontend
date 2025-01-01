import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  border: 1px solid ${props => props.theme.colors.main}; 
  border-radius: 5px;
  padding: 2px 8px;
  background: #fff0f0;
  display: flex;
  align-items: center;
  width: auto;
`;

const Text = styled.span`
  font-size: 12px;
  text-align: center;
  color: ${props => props.theme.colors.main}; 
`;

function BookLabel(props) { 
  return (
    <Container>
      <Text>{props.text}</Text>
    </Container>
  );
}

export default BookLabel;
