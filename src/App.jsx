import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MakingGroupPage from './pages/MakingGroupPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import CheckPointRecordPage from './pages/CheckPointRecordPage';
import AnotherCheckPointRecordPage from './pages/AnotherCheckPointRecordPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MakingGroupPage />} />
          <Route path="/makingGroup" element={<MakingGroupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/checkPointRecord" element={<CheckPointRecordPage />} />
          <Route
            path="/anothercheckPointRecord"
            element={<AnotherCheckPointRecordPage />}
          />
        </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
