import React from 'react';
import styled from 'styled-components';
import Rating from '../search/Rating';

const Detail = ({ username, date, comment, rating }) => (
  <Article>
    <Content>
      <Header>
          <Rating rating={rating} totalStars={5} starSize="20px" fontSize="16px" />
      </Header>
      <MetaInfo>
        <Username>{username}</Username>
        <Date>{date}</Date>
      </MetaInfo>
      <Comment>{comment}</Comment>
    </Content>
  </Article>
);

export default Detail;

const Article = styled.article`
  display: flex;
  align-items: center;
  gap: 33px;
  margin: 20px 0;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 241.56px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 3px;
`;

const Username = styled.span`
  color: #565656;
  font-size: 0.875rem;
`;

const Date = styled.span`
  color: #565656;
  font-size: 0.875rem;
`;

const Comment = styled.p`
  margin: 0;
  width: 241.56px;
  color: ${(props) => props.theme.colors.body};
  font-size: 1rem;
  font-weight: 600;
`;
