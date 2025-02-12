import GroupCards from '../components/makingGroupComponents/GroupCards';
import {
  PageContainer,
  Background,
} from '../styled_components/makingGroupPageStyle';

const MakingGroupPage = () => {
  return (
    <PageContainer>
      <Background />
      <GroupCards />
    </PageContainer>
  );
};

export default MakingGroupPage;
