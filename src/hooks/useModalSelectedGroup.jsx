import { useState } from 'react';

const useModalSelectedGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNext, setIsNext] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGroupClick = (group, setInputValue) => {
    console.log('Clicked group:', group);
    handleTransition();
    setSelectedGroup(group);
    setInputValue(group.meetings || null); // inputValue는 훅 외부에서 관리
    setErrorMessage();
  };

  const handleBack = (setInputValue) => {
    handleTransition();
    setSelectedGroup(null);
    setInputValue(''); // inputValue는 훅 외부에서 관리
  };

  const handleCompleteClick = (inputValue) => {
    if (!inputValue.trim()) {
      setErrorMessage('페이지를 입력해주세요!');
    } else if (isNaN(inputValue) || !/^\d+$/.test(inputValue.trim())) {
      setErrorMessage('숫자만 입력해주세요!');
    } else {
      setErrorMessage('');
      handleTransition();
    }
  };

  const handleTransition = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsNext(!isNext);
      setIsAnimating(false);
    }, 300);
  };

  return {
    selectedGroup,
    errorMessage,
    isNext,
    isAnimating,
    setSelectedGroup,
    setErrorMessage,
    handleGroupClick,
    handleBack,
    handleCompleteClick,
    handleTransition,
  };
};

export default useModalSelectedGroup;
