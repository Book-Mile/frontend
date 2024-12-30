import React from 'react';
import useIntersectionObserver from '../hooks/useInterserctionObserver';
import {
  BookImgContainer,
  RecordContainer,
  CheckPointRecordPageContainer,
  FirstBox,
  AnotherBox,
  BoxInnerContainer,
  LastBox,
  UserTitle,
} from '../styled_components/CheckPointRecordPageStyle';
import { scrollToBottom } from '../utils/scrollUtils';
import { checkPoints } from '../data/checkPoint';

const CircleSvg = ({ color = '#982B1C' }) => (
  <svg
    className="circle"
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill={color} />
  </svg>
);

const AnotherCheckPointRecordPage = () => {
  useIntersectionObserver('.animate-on-scroll', 'appear');

  return (
    <>
      <CheckPointRecordPageContainer>
        <UserTitle>팀원 1의 성취도 기록</UserTitle>
        <RecordContainer>
          <FirstBox>
            <svg
              className="upper-img"
              width="50"
              height="50"
              viewBox="0 0 94 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_358_2608)">
                <path
                  d="M9.73124 44.7245C11.3655 49.8934 17.9939 52.8364 20.6949 53.8434C21.0592 57.2769 21.7552 60.6494 22.8141 63.9407C23.6219 66.4517 24.6435 68.9151 25.8782 71.3229C24.2107 75.006 23.2212 78.736 23.4969 82.3135C26.508 85.1081 29.1834 83.1586 31.8792 81.4879C30.1227 77.2496 30.2826 72.319 31.2405 67.1171C31.6617 65.9103 32.1126 64.7108 32.5928 63.5198C37.3386 60.601 42.242 58.3683 47.2647 56.583C49.0204 59.5658 53.122 65.1863 59.1753 65.3098L55.7482 58.3676L62.5654 64.8373C66.6381 63.7938 69.6935 62.0199 72.3541 60.0531L64.9546 56.8969L75.1725 57.8236C78.556 55.0121 81.6225 52.2074 85.9948 50.8133C83.113 49.4951 80.6631 48.1383 78.3805 46.9199L70.3194 50.7466L76.1896 45.7775C73.1248 44.2358 70.2185 43.0804 66.7629 42.8067L60.1958 49.9805L62.7667 42.8758C62.6202 42.8917 62.4712 42.9112 62.3224 42.9301C53.8883 43.9944 48.2135 51.8022 46.709 54.1052C42.4997 55.5842 38.3481 57.3698 34.2862 59.5994C37.3053 53.0465 41.3238 46.3695 46.2464 39.8915C50.677 39.667 54.2391 39.1965 57.114 38.5085L51.7719 35.7058L61.8275 36.93C65.1128 35.4054 66.946 33.3612 68.0426 30.895L60.4204 29.686L68.9144 28.322C69.5584 25.7638 69.7645 22.8583 70.1168 19.6909C67.7254 20.4605 65.9064 20.9611 63.1873 21.8092L70.4519 17.0641C70.8523 14.2746 71.4657 11.3111 72.6523 8.21914C68.47 9.17121 64.3744 10.4421 60.6182 12.0154L59.8211 19.8533L58.3678 13.0121C54.8349 14.6735 51.6801 16.6234 49.1468 18.8476L49.622 27.2266L46.5114 21.5377C43.1536 25.5848 41.7715 30.3768 43.4814 35.8493C43.7092 36.5778 43.9952 37.3179 44.3351 38.0704C37.3236 47.2086 32.0523 56.7536 28.7881 65.906C28.3269 66.6554 27.8841 67.4133 27.4599 68.1793C25.2607 63.3636 23.9409 58.3339 23.4209 53.1445C25.7123 51.4094 29.872 47.774 31.2586 43.3395L23.8643 46.5963L31.7078 39.9926C31.6872 39.5786 31.6414 39.1614 31.558 38.7404C29.9904 30.7974 21.0282 28.0817 19.6435 19.9821C19.1158 22.754 17.8298 24.94 16.34 27.0496L19.1431 35.7676L14.1422 30.0579C12.2645 32.6401 10.4671 35.4504 9.70298 39.3701L15.8814 44.3245L9.37343 42.6932C9.4041 43.3856 9.52419 44.0674 9.7312 44.7244L9.73124 44.7245Z"
                  fill="#ED6C30"
                />
              </g>
              <defs>
                <clipPath id="clip0_358_2608">
                  <rect
                    width="69.1067"
                    height="76.7418"
                    fill="white"
                    transform="translate(20.5469 88.7983) rotate(-107.297)"
                  />
                </clipPath>
              </defs>
            </svg>
            <CircleSvg />
            <span className="start">시작</span>
            <BookImgContainer></BookImgContainer>
          </FirstBox>
          {checkPoints.map((item, index) => {
            const isLastItem = index === checkPoints.length - 1;
            return isLastItem ? (
              <LastBox key={index}>
                <CircleSvg color="#ccc" />
                <BoxInnerContainer
                  className="animate-on-scroll"
                  backgroundColor="#FF9999"
                >
                  <p className="checkpoint-date">{item.date}</p>
                  <h3 className="checkpoint-title">{item.title}</h3>
                  <p className="checkpoint-description">{item.description}</p>
                </BoxInnerContainer>
              </LastBox>
            ) : (
              <AnotherBox key={index}>
                <CircleSvg />
                <BoxInnerContainer
                  className="animate-on-scroll"
                  backgroundColor="#F9D1BE"
                >
                  <p className="checkpoint-date">{item.date}</p>
                  <h3 className="checkpoint-title">{item.title}</h3>
                  <p className="checkpoint-description">{item.description}</p>
                </BoxInnerContainer>
              </AnotherBox>
            );
          })}
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
          onClick={scrollToBottom}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M97.6734 11.7356L92.8128 6.875L51.5628 48.125L10.3128 6.875L5.45215 11.7356L49.129 55.4194H53.9965L97.6734 11.7356ZM97.6734 52.9856L92.8128 48.125L51.5628 89.375L10.3128 48.125L5.45215 52.9856L49.129 96.6694H53.9965L97.6734 52.9856Z"
            fill="black"
          />
        </svg>
      </CheckPointRecordPageContainer>
      <div style={{ height: '50px' }}></div>
    </>
  );
};

export default AnotherCheckPointRecordPage;
