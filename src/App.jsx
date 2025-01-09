import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { theme } from './theme';
import ErrorFallback from './utils/ErrorFallback';

import NavBar from './components/NavBar';
import MakingGroupPage from './pages/MakingGroupPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CheckPointRecordPage from './pages/CheckPointRecordPage';
import JoinGroupPopup from './components/popup/JoinGroupPopup/JoinGroupPopup';
import SecessionUserPopup from './components/popup/SecessionUserPopup/SecessionUserPopup';
import EditMyInfo from './pages/EditMyInfo.jsx';
import EndGroupPopup from './components/popup/EndGroupPopup/EndGroupPopup';
import CheckpointRecordPopup from './components/popup/CheckpointRecordPopup/CheckpointRecordPopup';
import RegisterCompletePopup from './components/popup/RegisterCompletePopup/RegisterCompletePopup';
import SearchResults from './pages/SearchResults';
import Lobby from './pages/Lobby';
import SNSManage from './pages/SNSManage.jsx';
import MyPage from './pages/MyPage.jsx';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="app-container">
            <NavBar />
            <div className="main-content">
              <Routes>
                <Route path="/search" element={<SearchResults />} />
                <Route path="/" element={<Login />} />
                <Route path="/makingGroup" element={<MakingGroupPage />} />
                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<SignUp />} />
                <Route path="/editmyinfo" element={<EditMyInfo />} />
                <Route
                  path="/checkPointRecord"
                  element={<CheckPointRecordPage />}
                />
                {/*<Route*/}
                {/*  path="/anothercheckPointRecord"*/}
                {/*  element={<AnotherCheckPointRecordPage />}*/}
                {/*/>*/}
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
                  path="/registercompletepopup"
                  element={<RegisterCompletePopup />}
                />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/SNSManage" element={<SNSManage />} />
                <Route path="/mypage" element={<MyPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
