import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useState, useEffect, Suspense } from 'react';

import { theme } from './theme';
import ErrorFallback from './utils/ErrorFallback';

import NavBar from './components/NavBar';
import JoinGroupPopup from './components/popup/JoinGroupPopup/JoinGroupPopup';
import SecessionUserPopup from './components/popup/SecessionUserPopup/SecessionUserPopup';
import EndGroupPopup from './components/popup/EndGroupPopup/EndGroupPopup';
import CheckpointRecordPopup from './components/popup/CheckpointRecordPopup/CheckpointRecordPopup';
import RegisterCompletePopup from './components/popup/RegisterCompletePopup/RegisterCompletePopup';

import RatingPopup from './components/popup/RatingPopup/RatingPopup.jsx';
import Loading from './animations/Loading.jsx';


const MakingGroupPage = React.lazy(() => import('./pages/MakingGroupPage'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const CheckPointRecordPage = React.lazy(() => import('./pages/CheckPointRecordPage'));
const EditMyInfo = React.lazy(() => import('./pages/EditMyInfo.jsx'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const Lobby = React.lazy(() => import('./pages/Lobby'));
const Detail = React.lazy(() => import('./pages/Detail'));
const SNSManage = React.lazy(() => import('./pages/SNSManage.jsx'));
const MyPage = React.lazy(() => import('./pages/MyPage.jsx'));
const BookProgress = React.lazy(() => import('./pages/BookProgress.jsx'));
const Main = React.lazy(() => import('./pages/Main.jsx'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 예시로 2초 후에 로딩 해제

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <Loading theme={theme}/>;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="app-container">
            <NavBar />
            <div className="main-content">
              <Suspense fallback={<Loading theme={theme}/>}>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/details/:isbn13" element={<Detail />} />
                  <Route path="/searchresults" element={<SearchResults />} />
                  <Route path="/creategroup" element={<MakingGroupPage />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/checkpoints" element={<CheckPointRecordPage />} />
                  <Route path="/lobby" element={<Lobby />} />
                  <Route path="/edit-profile" element={<EditMyInfo />} />
                  <Route path="/snsmanagement" element={<SNSManage />} />
                  <Route path='/bookprogress' element={<BookProgress />} />

                  {/* 팝업 URL 제거 */}
                  <Route path="/joingroup" element={<JoinGroupPopup />} />
                  <Route path="/leavegroup" element={<SecessionUserPopup />} />
                  <Route path="/endgroup" element={<EndGroupPopup />} />
                  <Route path="/checkpoint" element={<CheckpointRecordPopup />} />
                  <Route path="/complete" element={<RegisterCompletePopup />} />
                  <Route path="/rate" element={<RatingPopup />} />
                  <Route path="/EditMyInfo" element={<EditMyInfo />} />
                  <Route path="/SNSManage" element={<SNSManage />} />
                  <Route path="/RatingPopup" element={<RatingPopup />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
