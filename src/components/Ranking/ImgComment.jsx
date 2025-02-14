import styled from 'styled-components';
/* eslint-disable react/prop-types */
const Container = styled.div`
  width: 568px;
  height: 371px;
  position: relative;
`;

const Image = styled.img`
  width: 568px;
  height: 371px;
  position: absolute;
  left: -1px;
  top: -1px;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  width: 568px;
  height: 371px;
  position: absolute;
  left: -1px;
  top: -1px;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0.5),
    rgba(0, 0, 0, 0.5)
  );
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-end;
  width: 400px;
  position: absolute;
  left: 50px;
  top: 240px;
`;

const Nickname = styled.span`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: white;
`;

const Comment = styled.span`
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  color: white;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImgComment = ({ nickname, comment, imageSrc }) => {
  return (
    <Container>
      <Image src={imageSrc} alt="Image" />
      <GradientOverlay />
      <TextContainer>
        <Nickname>{nickname}</Nickname>
        <Comment>{comment}</Comment>
      </TextContainer>
    </Container>
  );
};

export default ImgComment;
