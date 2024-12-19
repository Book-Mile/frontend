import React from 'react';
import GroupCards from '../components/makingGroupComponents/GroupCards';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  Background,
} from '../styled_components/makingGroupPageStyle';

const MakingGroupPage = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Background />
      <GroupCards />
    </PageContainer>
  );
};

export default MakingGroupPage;
