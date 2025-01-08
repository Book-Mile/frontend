import React from 'react';

// 에러 발생 시 보여줄 Fallback UI
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" style={styles.container}>
    <h1 style={styles.heading}>Something went wrong!</h1>
    <p style={styles.message}>{error.message}</p>
    {/*버튼 클릭하면 onrest함수 실행 */}
    <button onClick={() => resetErrorBoundary()}>reset</button>
  </div>
);

// 스타일 객체
const styles = {
  container: {
    textAlign: 'center',
    margin: '2rem',
    padding: '2rem',
    border: '1px solid red',
    borderRadius: '8px',
    backgroundColor: '#ffe6e6',
  },
  heading: { fontSize: '1.5rem', color: '#b30000' },
  message: { margin: '1rem 0', fontSize: '1rem' },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#b30000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ErrorFallback;
