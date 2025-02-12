import { useEffect } from 'react';

const useIntersectionObserver = (
  selector,
  className,
  options = { threshold: 0 },
  onIntersect = () => {}, // 관찰 대상 정보를 전달할 콜백 함수
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          onIntersect(entry.target); // 관찰된 요소 정보를 콜백으로 전달
        } else {
          entry.target.classList.remove(className);
        }
      });
    }, options);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.dataset.index = index; // 요소에 인덱스 속성 추가
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selector, className, options, onIntersect]);
};

export default useIntersectionObserver;
