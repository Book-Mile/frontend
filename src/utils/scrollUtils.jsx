export const scrollToBottom = (containerRef, scrollPosition) => {
  containerRef.current.scrollTo({
    top: scrollPosition,
    behavior: 'smooth', // 부드러운 스크롤
  });
};
