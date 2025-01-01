import { useEffect } from 'react';

const useClosePopupAnimation = (isClosing, onClose) => {
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose(); // 애니메이션 완료 후 onClose 호출
      }, 350); // 애니메이션 지속 시간
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);
};

export default useClosePopupAnimation;
