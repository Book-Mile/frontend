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
import Detail from './pages/Detail';

import SNSManage from './pages/SNSManage.jsx';
import MyPage from './pages/MyPage.jsx';
import RatingPopup from './components/popup/RatingPopup/RatingPopup.jsx';
import BookProgress from './pages/BookProgress.jsx'
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
                <Route path="/search" element={<SearchResults />} />
                <Route path="/" element={<Main />} />
                <Route path="/makingGroup" element={<MakingGroupPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/mypage" element={<MyPage />} />
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
                <Route path="/detail" element={<Detail />} />
                <Route path="/EditMyInfo" element={<EditMyInfo />} />
                <Route path="/SNSManage" element={<SNSManage />} />
                <Route path="/RatingPopup" element={<RatingPopup />} />
                <Route path='/bookprogress' element={<BookProgress/>}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
