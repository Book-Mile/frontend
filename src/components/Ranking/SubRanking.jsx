/* eslint-disable react/prop-types */
import { useState } from 'react';
import { motion } from 'framer-motion';
import SubItem from './SubItem';
import styled from 'styled-components';

const SubRanking = ({ onSelectItem, remainingRanks }) => {
  const allData = [
    { rank: 4, name: '개발천재', percentage: 87, profileImage: '' },
    { rank: 5, name: '프론트마스터', percentage: 75, profileImage: '' },
    { rank: 6, name: '백엔드고수', percentage: 67, profileImage: '' },
    { rank: 7, name: 'AI전문가', percentage: 43, profileImage: '' },
    { rank: 8, name: 'UX디자이너', percentage: 27, profileImage: '' },
    { rank: 9, name: '시스템엔지니어', percentage: 20, profileImage: '' },
    { rank: 10, name: '데이터분석가', percentage: 19, profileImage: '' },
    { rank: 11, name: '시스템엔지니어', percentage: 20, profileImage: '' },
    { rank: 12, name: '데이터분석가', percentage: 19, profileImage: '' },
    { rank: 13, name: '시스템엔지니어', percentage: 20, profileImage: '' },
    { rank: 14, name: '데이터분석가', percentage: 19, profileImage: '' },
    { rank: 15, name: '데이터분석가', percentage: 19, profileImage: '' },
    { rank: 16, name: '데이터분석가', percentage: 19, profileImage: '' },
  ];
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handleLoadMore = () => {
    setStartIndex((prev) => prev + itemsPerPage);
  };

  const currentItems = remainingRanks.slice(startIndex, startIndex + itemsPerPage);
  if (currentItems.length === 0) return null;

  console.log("currentItiems",currentItems)
  
    return (
      <Container>
        {/* 위쪽 화살표 */}
        {startIndex > 0 && (
          <ArrowIcon
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setStartIndex((prev) => prev - itemsPerPage)}
          >
            <path d="M6 15L12 9L18 15" stroke="#4E202A" strokeWidth="2" />
          </ArrowIcon>
        )}
  
        <motion.div
          key={startIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {currentItems.map((item) => (
            <SubItem
              key={item.rank}
              rank={item.rank}
              profileImage={item.profileImage}
              name={item.name}
              percentage={item.progress}
              onClick={() => {
                console.log(`${item.name}이 선택되었습니다.`);
                onSelectItem(item); // onSelectItem을 전달
              }}
            />
          ))}
        </motion.div>
  
        {/* 아래쪽 화살표 */}
        {startIndex + itemsPerPage < remainingRanks.length && (
          <ArrowIcon
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleLoadMore}
          >
            <path d="M6 9L12 15L18 9" stroke="#4E202A" strokeWidth="2" />
          </ArrowIcon>
        )}
      </Container>
    );
  };
  
  export default SubRanking;
  

  const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 390px;
  height: 430px;
  position: relative;
  overflow: hidden;
  gap: 20px;
  padding: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-self: center;
`;