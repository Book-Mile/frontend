import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { scrollToBottom } from '../utils/scrollUtils';

const ScrollBar = styled.div`
  position: fixed;
  left: 30px;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  &:hover::after {
    content: '${({ label }) => label.replace(/\n/g, ' ').replace(/\t/g, ' ')}';
    position: absolute;
    height: 110%;
    top: 50%;
    left: 180%;
    transform: translateY(-50%);
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: pre-wrap; /* 줄바꿈과 들여쓰기 지원 */
    font-size: 13px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    /* 텍스트에 따라 width 자동 조정 */
    display: block;
    min-width: 10px; /* 최소 너비 */
    max-width: 200px; /* 최대 너비 */
    width: auto; /* 텍스트 길이에 맞게 width 자동 조정 */
    text-align: center; /* 텍스트 정렬 */
  }
`;

const ScrollItem = styled.div`
  width: 20px;
  height: 5px;
  text-align: center;
  border-radius: 5px;
  transition:
    background-color 0.1s,
    color 0.1s;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.main : '#ccc'};
  position: relative;
  cursor: pointer;
`;

const ScrollBarComponent = ({ data, activeTarget, containerRef }) => {
  const formattedData = ['Title', ...data.map((item) => `${item}\t`)].join(
    '\n',
  );

  const handleScrollItemClick = (index) => {
    const targetElement = containerRef.current.querySelector(
      `[data-index="${index}"]`,
    );
    console.log(containerRef);

    if (targetElement) {
      // 해당 위치로 스크롤 이동
      scrollToBottom(containerRef, targetElement.offsetTop);
    }
  };
  console.log(activeTarget);
  return (
    <ScrollBar label={formattedData}>
      {formattedData.split('\n').map((item, index) => (
        <ScrollItem
          key={index}
          isActive={activeTarget?.dataset?.index == index}
          content={item} // 필요에 따라 ScrollItem에 전달할 데이터
          onClick={() => handleScrollItemClick(index)} // 클릭 시 해당 위치로 스크롤
        />
      ))}
    </ScrollBar>
  );
};

export default ScrollBarComponent;
