import { useState, useEffect } from 'react';
import styled from 'styled-components';
import apiClient from '../../api/apiClient';

const GOAL_TYPES = ['NUMBER', 'PAGE', 'CHAPTER', 'CUSTOM'];

const GroupRankPreview = () => {
  const [groups, setGroups] = useState([]);
  
  const storedBookId = Number(sessionStorage.getItem('bookId')) || 2;
  const storedGoalIndex = Number(sessionStorage.getItem('goalIndex')) || 0;

  const [bookId, setBookId] = useState(storedBookId);
  const [goalIndex, setGoalIndex] = useState(storedGoalIndex);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await apiClient.get(`/templates/${bookId}`, {
          params: { 
            goalType: GOAL_TYPES[goalIndex],
            bookId:bookId
           },
        });

        if (response.status === 200 && response.data?.response?.length >= 4) {
          const sortedGroups = response.data.response
            .sort((a, b) => b.usageCount - a.usageCount)
            .sort((a, b) => (a.usageCount === b.usageCount ? Math.random() - 0.5 : 0))
            .slice(0, 4);

          setGroups(sortedGroups);
        } else {
          let newBookId = bookId;
          let newGoalIndex = goalIndex;

          if (goalIndex < GOAL_TYPES.length - 1) {
            newGoalIndex += 1;
          } else {
            newGoalIndex = 0;
            newBookId += 1;
          }

          sessionStorage.setItem('bookId', newBookId);
          sessionStorage.setItem('goalIndex', newGoalIndex);

          setBookId(newBookId);
          setGoalIndex(newGoalIndex);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchTemplates();
  }, [bookId, goalIndex]);

  if (groups.length < 4) return null;

  return (
    <Container>
      <Title>가장 많은 성취도 달성한 그룹</Title>
      <GroupList>
        {groups.map((group,index) => (
          <GroupItem key={group.templateId}>
            <RankNumber>{index + 1}</RankNumber>
            <GroupImage>
              <GroupImageContent src={group.masterProfileImage} alt={group.groupName} />
            </GroupImage>
            <GroupInfo>
              <GroupName>{group.groupName}</GroupName>
              <GroupDescription>{group.goalContent}</GroupDescription>
            </GroupInfo>
          </GroupItem>
        ))}
      </GroupList>
    </Container>
  );
};

export default GroupRankPreview;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 1156px;
  margin: 0 auto;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  color: ${(props) => props.theme.colors.body};
`;

const GroupList = styled.div`
  display: flex;
  gap: 20px;
  padding: 3px 0;
`;

const GroupItem = styled.article`
  width: 274px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RankNumber = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.body};
`;

const GroupImage = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50px;
  overflow: hidden;
`;

const GroupImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupName = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GroupDescription = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #565656;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
