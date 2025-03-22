/* eslint-disable react/prop-types */
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 1116px;
  padding: 24px 20px;
  background-color: white;
  border-radius: 10px;
  gap: 30px;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  flex-grow: 0;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 948px;
  position: relative;
  gap: 14px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Title = styled.p`
  width: full;
  height: 30px;
  font-size: 18px;
  text-align: left;
  margin: 0;
`;

const PageNumber = styled.p`
  width: 117px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: ${(props) => props.theme.colors.main};
  margin: 0;
`;

const Description = styled.span`
  font-size: 14px;
  line-height: 1.6;
`;

const Memberstory = ({ imageSrc, nickname, page, text }) => {
  return (
    <Wrapper>
      <Image src={imageSrc} alt="Image" />
      <Content>
        <Header>
          <Title>{nickname}</Title>
          <PageNumber>{page} 페이지</PageNumber>
        </Header>
        <Description>{text}</Description>
      </Content>
    </Wrapper>
  );
};

export default Memberstory;
