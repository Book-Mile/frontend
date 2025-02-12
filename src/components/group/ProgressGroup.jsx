import styled from 'styled-components';

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 500px;
  position: relative;
  overflow: hidden;
  gap: 14px;
  padding: 24px 30px;
  border-radius: 10px;
  background-color: white;
  border: 2px solid #d9d9d9;
`;

const Title = styled.h2`
  margin: 0;
  width: 400px;
  font-size: 1.125rem;
  font-weight: 500;
  text-align: left;
  color: ${(props) => props.theme.colors.body};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  margin: 0;
  position: relative;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  text-align: left;
  color: ${(props) => props.theme.colors.body};
`;

const HighlightedText = styled.span`
  font-size: 0.875rem;
  text-align: left;
  color: ${(props) => props.theme.colors.main || '#ab0909'};
`;

// eslint-disable-next-line react/prop-types
const ProgressGroup = ({ groupName, pageInfo, membersCount }) => (
  <CardContainer>
    <Title>{groupName}</Title>
    <InfoContainer>
      <InfoText>
        <span>페이지: </span>
        <HighlightedText>{pageInfo}</HighlightedText>
      </InfoText>
      <InfoText>
        <span>인원 수: </span>
        <HighlightedText>{membersCount}</HighlightedText>
      </InfoText>
    </InfoContainer>
  </CardContainer>
);

export default ProgressGroup;
