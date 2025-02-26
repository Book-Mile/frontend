import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
  //background: rgba(239, 239, 239, 0.7);
`;

const LoadingIcon = styled.div`
  width: 80px;
  height: 80px;
  background: url('../../public/images/loding.png') no-repeat center center;
  background-size: contain;
`;

const LoadingText = styled.div`
  margin-top: 6px;
  font-size: 1rem;
  color: #ab0909;
  font-weight: 500;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingIcon />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
