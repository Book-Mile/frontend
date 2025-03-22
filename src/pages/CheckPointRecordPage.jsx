/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useInterserctionObserver';
import {
  CheckPointRecordPageContainer,
  BoxInnerContainer,
  BoxContainer,
  ImgContainer,
  UserTitle,
  ImgContent,
  RecordContainer,
  CheckpointDescription,
} from '../styled_components/CheckPointRecordPageStyle';
import { scrollToBottom } from '../utils/scrollUtils';
import { checkPoints } from '../data/checkPoint';
import CheckPointCards from '../components/checkPointPageCards/CheckPointCards';
import ImagePopup from '../components/popup/ImgPopup/ImgPopup';
import { CheckPointRecordRequest } from '../api/Pages/CheckPointRecordRequest';
import { useErrorHandling } from '../hooks/useErrorHandling';
import ScrollBar from '../components/ScrollBar';
import { useLocation } from 'react-router-dom';

const CheckPointRecordPage = ({
  subject = 'CUSTOM',
  bookName = '젊은베르테르의 슬픔',
}) => {
  //api에서 받아올 것들
  const [user, setUser] = useState('무진장세일');
  const [bookTitle, setBookTitle] = useState('젊은 베르테르의 슬픔');
  const [popupImage, setPopupImage] = useState(null); // To manage the popup image
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [data, setData] = useState(checkPoints);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const groupID = params.get('groupId'); // URL에서 그룹ID 가져옴

  const { error, handleError } = useErrorHandling();
  useEffect(() => {
    CheckPointRecordRequest(setData, setApiErrorMsg, 1).catch((err) => {
      handleError(err);
    }); // 분리된 fetchGroups 함수 호출
    const nickName = JSON.parse(sessionStorage.getItem('userData'))?.nickName;
    setUser(nickName);
    setBookTitle(bookName);
  }, []);
  if (error) {
    throw apiErrorMsg; // 렌더링 시 에러 발생
  }

  const [activeTarget, setActiveTarget] = useState(null);

  const handleIntersect = (target) => {
    setActiveTarget(target); // 관찰된 요소를 상태로 저장
  };

  const containerRef = useRef(null);
  useIntersectionObserver(
    '.animate-on-scroll',
    'appear',
    { threshold: 0.5 },
    handleIntersect,
  );

  const handleScrollToBottom = () => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight; // 컨테이너의 전체 스크롤 높이
      const clientHeight = containerRef.current.clientHeight; // 컨테이너의 보이는 높이
      const scrollPosition = scrollHeight - clientHeight; // 맨 아래로 스크롤할 위치
      scrollToBottom(containerRef, scrollPosition);
    }
  };

  const handleClosePopup = () => {
    setPopupImage(null);
  };

  const handleCardClick = (img) => {
    setPopupImage(img);
  };

  return (
    <>
      <CheckPointRecordPageContainer>
        <RecordContainer ref={containerRef}>
          <UserTitle
            className="animate-on-scroll scroll-area"
            key={0}
            data-index={0}
          >
            <div>
              <span className="user">{user}</span> 님의{' '}
              <span className="user">{bookTitle}</span> 기록입니다.
            </div>
          </UserTitle>

          {data.map((item, index) => (
            <BoxContainer
              className="animate-on-scroll scroll-area"
              key={index + 1}
              data-index={index + 1}
            >
              <p className="checkpoint-date">{item.currentPage}</p>
              {item.imageUrls && item.imageUrls.length > 0 ? ( // Check if images exis
                <ImgContainer>
                  {item.imageUrls.length === 1 ? ( // If only one image
                    <ImgContent
                      src={item.imageUrls[0]}
                      alt="Checkpoint image"
                      onClick={() => handleCardClick(item.imageUrls[0])} // Open popup
                    />
                  ) : (
                    <CheckPointCards
                      images={item.imageUrls}
                      handleCardClick={handleCardClick}
                    />
                  )}
                </ImgContainer>
              ) : null}
              <BoxInnerContainer>
                <CheckpointDescription>
                  {subject != 'CUSTOM' && (
                    <>
                      <span className="date">
                        {new Date(item.createdAt).toISOString().slice(0, 10)}
                      </span>
                      <br />
                    </>
                  )}
                  {item.text}
                </CheckpointDescription>
              </BoxInnerContainer>
            </BoxContainer>
          ))}
        </RecordContainer>

        <svg
          width="30"
          height="30"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '50%',
            opacity: 0.5,
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.3)}
          onClick={handleScrollToBottom}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M97.6734 11.7356L92.8128 6.875L51.5628 48.125L10.3128 6.875L5.45215 11.7356L49.129 55.4194H53.9965L97.6734 11.7356ZM97.6734 52.9856L92.8128 48.125L51.5628 89.375L10.3128 48.125L5.45215 52.9856L49.129 96.6694H53.9965L97.6734 52.9856Z"
            fill="black"
          />
        </svg>
      </CheckPointRecordPageContainer>
      {popupImage && (
        <ImagePopup
          src={popupImage}
          alt="Expanded view"
          onClose={handleClosePopup}
        />
      )}
      <ScrollBar
        data={data?.map((item) => item.currentPage) || []}
        activeTarget={activeTarget}
        containerRef={containerRef}
      />
    </>
  );
};

export default CheckPointRecordPage;
