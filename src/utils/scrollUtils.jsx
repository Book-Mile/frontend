export const scrollToBottom = (containerRef) => {
  if (containerRef.current) {
    const scrollHeight = containerRef.current.scrollHeight; // 컨테이너의 전체 스크롤 높이
    const clientHeight = containerRef.current.clientHeight; // 컨테이너의 보이는 높이
    const scrollPosition = scrollHeight - clientHeight; // 맨 아래로 스크롤할 위치

    containerRef.current.scrollTo({
      top: scrollPosition,
      behavior: 'smooth', // 부드러운 스크롤
    });
  }
};
