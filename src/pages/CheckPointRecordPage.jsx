import React, { useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useInterserctionObserver';
import {
  CheckPointRecordPageContainer,
  BoxInnerContainer,
  BoxContainer,
  ImgContainer,
  UserTitle,
  ImgContent,
  RecordContainer,
} from '../styled_components/CheckPointRecordPageStyle';
import { scrollToBottom } from '../utils/scrollUtils';
import { checkPoints } from '../data/checkPoint';
import CheckPointCards from '../components/checkPointPageCards/CheckPointCards';
import ImagePopup from '../components/popup/ImgPopup/ImgPopup';

const CheckPointRecordPage = () => {
  const [user, setUser] = useState('무진장세일');
  const [bookTitle, setBookTitle] = useState('젊은 베르테르의 슬픔');
  const [popupImage, setPopupImage] = useState(null); // To manage the popup image

  const containerRef = useRef(null);
  useIntersectionObserver('.animate-on-scroll', 'appear');

  const handleScrollToBottom = () => {
    scrollToBottom(containerRef);
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
          <UserTitle className="scroll-area">
            <div>
              <span className="user">{user}</span> 님의{' '}
              <span className="user">{bookTitle}</span> 기록입니다.
            </div>
          </UserTitle>

          {checkPoints.map((item, index) => (
            <BoxContainer className="animate-on-scroll scroll-area" key={index}>
              <p className="checkpoint-date">{item.date}</p>
              {item.images && item.images.length > 0 ? ( // Check if images exis
                <ImgContainer>
                  {item.images.length === 1 ? ( // If only one image
                    <ImgContent
                      src={item.images[0]}
                      alt="Checkpoint image"
                      onClick={() => handleCardClick(item.images[0])} // Open popup
                    />
                  ) : (
                    <CheckPointCards
                      images={item.images}
                      handleCardClick={handleCardClick}
                    />
                  )}
                </ImgContainer>
              ) : null}
              <BoxInnerContainer>
                <p className="checkpoint-description">{item.description}</p>
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
    </>
  );
};

export default CheckPointRecordPage;
