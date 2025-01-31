import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import { theme } from './theme';
import ErrorFallback from './utils/ErrorFallback';

import NavBar from './components/NavBar';
import JoinGroupPopup from './components/popup/JoinGroupPopup/JoinGroupPopup';
import SecessionUserPopup from './components/popup/SecessionUserPopup/SecessionUserPopup';
import EndGroupPopup from './components/popup/EndGroupPopup/EndGroupPopup';
import CheckpointRecordPopup from './components/popup/CheckpointRecordPopup/CheckpointRecordPopup';
import RegisterCompletePopup from './components/popup/RegisterCompletePopup/RegisterCompletePopup';
import RatingPopup from './components/popup/RatingPopup/RatingPopup.jsx';

import MakingGroupPage from './pages/MakingGroupPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CheckPointRecordPage from './pages/CheckPointRecordPage';
import EditMyInfo from './pages/EditMyInfo.jsx';
import SearchResults from './pages/SearchResults';
import Lobby from './pages/Lobby';
import Detail from './pages/Detail';
import SNSManage from './pages/SNSManage.jsx';
import MyPage from './pages/MyPage.jsx';
import Main from './pages/Main.jsx';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="app-container">
            <NavBar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/details" element={<Detail />} />
                <Route path="/searchresults" element={<SearchResults />} />
                <Route path="/creategroup" element={<MakingGroupPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/checkpoints" element={<CheckPointRecordPage />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/edit-profile" element={<EditMyInfo />} />
                <Route path="/snsmanagement" element={<SNSManage />} />

                {/* 추후 팝업 URL 제거 할 예정 */}
                <Route path="/joingroup" element={<JoinGroupPopup />} />
                <Route path="/leavegroup" element={<SecessionUserPopup />} />
                <Route path="/endgroup" element={<EndGroupPopup />} />
                <Route path="/checkpoint" element={<CheckpointRecordPopup />} />
                <Route path="/complete" element={<RegisterCompletePopup />} />
                <Route path="/rate" element={<RatingPopup />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
