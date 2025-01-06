import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

import NavBar from './components/NavBar';
import MakingGroupPage from './pages/MakingGroupPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CheckPointRecordPage from './pages/CheckPointRecordPage';
//import AnotherCheckPointRecordPage from './Dispose/AnotherCheckPointRecordPage';
import JoinGroupPopup from './components/popup/JoinGroupPopup/JoinGroupPop';
import SecessionUserPopup from './components/popup/SecessionUserPopup/SecessionUserPopup';

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
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/checkPointRecord"
              element={<CheckPointRecordPage />}
            />
            <Route path="/joinGroupPopup" element={<JoinGroupPopup />} />
            <Route
              path="/SecessionUserPopup"
              element={<SecessionUserPopup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
