import styled from 'styled-components';


const WhiteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 110px;
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 2.5px 15px;
  text-align: center;
  color: white;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    background-color: rgba(168, 168, 168, 0.2);
    border-radius: 10px;
    
  }

  &:active {
    background-color: rgba(168, 168, 168, 0.2);
    border-radius: 10px;
  }
`;

export default WhiteButton;
