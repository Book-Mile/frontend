import { useEffect } from 'react';

const useIntersectionObserver = (
  selector,
  className,
  options = { threshold: 0 },
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target); // 한번 나타나면 관찰 중지
        } else {
          entry.target.classList.remove(className);
        }
      });
    }, options);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, className, options]);
};

export default useIntersectionObserver;
