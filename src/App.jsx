import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MakingGroupPage from './pages/MakingGroupPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import CheckPointRecordPage from './pages/CheckPointRecordPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MakingGroupPage />} />
          <Route path="/makingGroup" element={<MakingGroupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/checkPointRecord" element={<CheckPointRecordPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
