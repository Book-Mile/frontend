import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

import NavBar from './components/NavBar';
import MakingGroupPage from './pages/MakingGroupPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CheckPointRecordPage from './Dispose/CheckPointRecordPage';
import AnotherCheckPointRecordPage from './Dispose/AnotherCheckPointRecordPage';
import JoinGroupPopup from './components/popup/JoinGroupPopup/JoinGroupPop';
import SecessionUserPopup from './components/popup/SecessionUserPopup/SecessionUserPopup';
import MyPage from './pages/MyPage';
import EndGroupPopup from './components/popup/EndGroupPopup/EndGroupPopup';
import CheckpointRecordPopup from './components/popup/CheckpointRecordPopup/CheckpointRecordPopup';
import Loding from './animations/Loding'

import SearchResults from './pages/SearchResults'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path='/search' element={<SearchResults/>}/>
            <Route path="/" element={<MakingGroupPage />} />
            <Route path="/makingGroup" element={<MakingGroupPage />} />
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route
              path="/checkPointRecord"
              element={<CheckPointRecordPage />}
            />
            <Route
              path="/anothercheckPointRecord"
              element={<AnotherCheckPointRecordPage />}
            />
            <Route path="/joinGroupPopup" element={<JoinGroupPopup />} />
            <Route
              path="/SecessionUserPopup"
              element={<SecessionUserPopup />}
            />
            <Route path="/endgroup" element={<EndGroupPopup />} />
            <Route
              path="/checkpointrecordpopup"
              element={<CheckpointRecordPopup />}
            />
            <Route
              path="/loding"
              element={<Loding />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
