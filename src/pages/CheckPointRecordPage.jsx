import React from 'react';
import {
  BookImgContainer,
  BottomPresentContainer,
  RecordContainer,
  CheckPointRecordPageContainer,
} from '../styled_components/CheckPointRecordPageStyle';

const CheckPointRecordPage = () => {
  return (
    <CheckPointRecordPageContainer>
      <BookImgContainer></BookImgContainer>
      <RecordContainer></RecordContainer>
      <BottomPresentContainer></BottomPresentContainer>
    </CheckPointRecordPageContainer>
  );
};

export default CheckPointRecordPage;
