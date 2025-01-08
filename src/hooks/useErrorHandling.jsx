import { useState, useCallback } from 'react';

// 커스텀 Hook으로 에러 처리 로직 분리
export const useErrorHandling = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    setError(error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};
