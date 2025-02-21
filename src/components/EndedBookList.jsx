import { useEffect, useState } from 'react';
import styled from 'styled-components';
/* eslint-disable react/prop-types */
import ModeTag from '/src/components/modeTag/ModeTag.jsx';
import { getUserGroups } from '../api/Pages/MyPageRequest.jsx';

function Override({ groupName, groupKing, mode }) {
  return (
    <OverrideFrame>
      <GroupTitle>{groupName}</GroupTitle>
      <GroupKing>{groupKing}</GroupKing>
      <ModeLine>
        <ModeTag mode={mode} />
      </ModeLine>
      <UserLine>
        <UserImg index={0}>
          <img src={'/src/assets/profile.png'} style={{ width: '100%' }} />
        </UserImg>
        <UserImg index={1}>
          <img
            src={'/src/assets/EditMyInfoAssets/ProfileModal.svg'}
            style={{ width: '100%' }}
          />
        </UserImg>
        <UserImg index={2}>+10</UserImg>
      </UserLine>
    </OverrideFrame>
  );
}

const GroupTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  /* identical to box height */

  color: #ffffff;
`;
const GroupKing = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  color: #ffffff;
`;
const ModeLine = styled.div``;
const UserLine = styled.div`
  display: flex;
  flex-direction: row;
  position: relative; /* 부모 요소에 relative 설정 */
`;

const UserImg = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid #d5d5d5;
  border-radius: 50%;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 140%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4e202a;
  background: #ffffff;

  /* 절대 위치 설정으로 겹치게 하기 */
  position: absolute;

  /* index에 따라 각각 다른 위치로 설정 */
  left: ${(props) =>
    props.index === 1
      ? '18px'
      : props.index === 2
        ? '36px'
        : '0'}; /* 첫 번째는 0, 두 번째는 18px, 세 번째는 36px */
`;

function Book({ img, bookname, writer, groupMode, groupKing, groupName }) {
  const [ishover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!ishover);
  };
  return (
    <ColFrame>
      <BookImgFrame onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <img
          src={img}
          style={{ width: '100%', height: '100%', filter: 'grayscale(100%)' }}
        />
        {ishover && (
          <Override
            mode={groupMode}
            groupName={groupName}
            groupKing={groupKing}
          />
        )}
      </BookImgFrame>
      <BookTitleFrame>{bookname}</BookTitleFrame>
      <WriterFrame>{writer} 저</WriterFrame>
    </ColFrame>
  );
}

// const books = [
//   {
//     img: '/src/assets/bookImg4.png',
//     bookname: '채식주의자',
//     writer: '한강',
//     groupMode: 'speed',
//     groupName: '베르테르 뮤지컬 예습',
//     groupKing: '배현준',
//   },
//   {
//     img: '/src/assets/bookImg2.png',
//     bookname: '도둑 맞은 집중력',
//     writer: '요한 하리',
//     groupMode: 'speed',
//     groupName: '최강컴공모임',
//     groupKing: '김기수',
//   },
//   {
//     img: '/src/assets/bookImg3.png',
//     bookname: '영어로 문장 만들기 훈련',
//     writer: '유은하',
//     groupMode: 'page',
//     groupName: '스프링이 뭔데요',
//     groupKing: '한준서',
//   },
//   {
//     img: '/src/assets/bookImg4.png',
//     bookname: '채식주의자',
//     writer: '한강',
//     groupMode: 'speed',
//     groupName: '문장의 정원',
//     groupKing: '배현준',
//   },
//   {
//     img: '/src/assets/bookImg4.png',
//     bookname: '채식주의자',
//     writer: '한강',
//     groupMode: 'speed',
//     groupName: '책모임 온누리',
//     groupKing: '배현준',
//   },
//   {
//     img: '/src/assets/bookImg.png',
//     bookname: '좋은 사람 되려다 쉬운...',
//     writer: '이남훈',
//     groupMode: 'page',
//     groupName: '같이 어휘력을 쌓읍시다',
//     groupKing: '박영인',
//   },
//   {
//     img: '/src/assets/bookImg4.png',
//     bookname: '채식주의자',
//     writer: '한강',
//     groupMode: 'page',
//     groupName: '책숲 동행',
//     groupKing: '배현준',
//   },
//   {
//     img: '/src/assets/bookImg4.png',
//     bookname: '채식주의자',
//     writer: '한강',
//     groupMode: 'speed',
//     groupName: '한 페이지 이야기',
//     groupKing: '배현준',
//   },
// ];

export default function EndedBookList() {
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    getUserGroups('COMPLETED').then((data) => {
      console.log('받아온 그룹 데이터:', data);
      setResponseData(data);
    });
  }, []);
  return (
    <>
      <MainFrame>
        <InfoFrame>
          총 <span style={{ color: '#ab0909' }}>{responseData.length}권</span>의
          책을 읽었어요.
        </InfoFrame>
        <ListRowFrame>
          {responseData.map((data, index) => (
            <Book
              key={index}
              img={data.img}
              bookname={data.bookname}
              writer={data.writer}
              groupMode={data.groupMode}
              groupName={data.groupName}
              groupKing={data.groupKing}
            />
          ))}
        </ListRowFrame>
      </MainFrame>
    </>
  );
}

const MainFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const InfoFrame = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #4e202a;
  height: fit-content;
  width: 100%;
`;

const ListRowFrame = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 40px;
  width: 100%;
  overflow: auto;
`;

const ColFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;
const BookImgFrame = styled.div`
  height: 300px;
  width: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  z-index: 1;
  position: relative; /* 부모 요소를 기준으로 자식 요소 위치 설정 */
  box-sizing: border-box;
`;

const OverrideFrame = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10; /* 위로 쌓이게 설정 */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  position: absolute; /* BookImgFrame 내부에 겹치도록 설정 */
  top: 0; /* 위쪽 기준으로 위치 설정 */
  left: 0; /* 왼쪽 기준으로 위치 설정 */

  justify-content: center;
  align-items: start;
  padding: 20px;
  box-sizing: border-box;
  gap: 10px;
`;

const BookTitleFrame = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  /* or 25px */
  display: flex;
  align-items: center;

  color: #4e202a;
  width: 100%;
  overflow-x: hidden;
`;
const WriterFrame = styled.div`
  font-style: normal;
  font-weight: 350;
  font-size: 14px;
  line-height: 140%;
  /* identical to box height, or 20px */
  display: flex;
  align-items: center;

  color: #909090;
`;
