import { useState } from 'react';

const AlarmIcon = () => {
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  const toggleAlarm = () => {
    setIsAlarmActive(!isAlarmActive);
  };

  return (
    <div
      onClick={toggleAlarm}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isAlarmActive ? (
          // 알람이 온 상태
          <>
            <path
              d="M10 5.36658V8.14158"
              stroke="#444750"
              strokeWidth="1.25"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M10.0171 1.66663C6.9504 1.66663 4.46707 4.14996 4.46707 7.21663V8.96663C4.46707 9.53329 4.23374 10.3833 3.94207 10.8666L2.88374 12.6333C2.23374 13.725 2.68374 14.9416 3.88374 15.3416C7.86707 16.6666 12.1754 16.6666 16.1587 15.3416C17.2837 14.9666 17.7671 13.65 17.1587 12.6333L16.1004 10.8666C15.8087 10.3833 15.5754 9.52496 15.5754 8.96663V7.21663C15.5671 4.16663 13.0671 1.66663 10.0171 1.66663Z"
              stroke="#444750"
              strokeWidth="1.25"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M12.7746 15.6833C12.7746 17.2083 11.5246 18.4583 9.99961 18.4583C9.24128 18.4583 8.54128 18.1417 8.04128 17.6417C7.54128 17.1417 7.22461 16.4417 7.22461 15.6833"
              stroke="#444750"
              strokeWidth="1.25"
              strokeMiterlimit="10"
            />
            <rect
              x="11.6663"
              y="0.833333"
              width="7.5"
              height="7.5"
              rx="3.75"
              fill="#F57600"
            />
            <rect
              x="11.6663"
              y="0.833333"
              width="7.5"
              height="7.5"
              rx="3.75"
              stroke="white"
              strokeWidth="1.66667"
            />
          </>
        ) : (
          // 알람이 안 온 상태
          <>
            <path
              d="M10 5.36658V8.14158"
              stroke="#444750"
              strokeWidth="1.25"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M10.0171 1.66663C6.9504 1.66663 4.46707 4.14996 4.46707 7.21663V8.96663C4.46707 9.53329 4.23374 10.3833 3.94207 10.8666L2.88374 12.6333C2.23374 13.725 2.68374 14.9416 3.88374 15.3416C7.86707 16.6666 12.1754 16.6666 16.1587 15.3416C17.2837 14.9666 17.7671 13.65 17.1587 12.6333L16.1004 10.8666C15.8087 10.3833 15.5754 9.52496 15.5754 8.96663V7.21663C15.5671 4.16663 13.0671 1.66663 10.0171 1.66663Z"
              stroke="#444750"
              strokeWidth="1.25"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M12.7746 15.6833C12.7746 17.2083 11.5246 18.4583 9.99961 18.4583C9.24128 18.4583 8.54128 18.1417 8.04128 17.6417C7.54128 17.1417 7.22461 16.4417 7.22461 15.6833"
              stroke="#444750"
              strokeWidth="1.25"
              strokeMiterlimit="10"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default AlarmIcon;
