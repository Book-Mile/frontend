export const scrollToBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const innerHeight = window.innerHeight;
  const scrollPosition = scrollHeight - innerHeight;
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth', // 이 부분을 제거하고 테스트해보세요.
  });
};
