import React from 'react';
import {
  Title,
  GroupContainer,
  GroupItem,
  GroupCircle,
  GroupName,
  GroupDetails_container,
} from '../../styled_components/popupStyle';
const RightPopup_two = ({ groups, handleGroupClick }) => {
  return (
    <>
      <Title>
        이 템플릿을 사용한
        <br /> 그룹은 이렇게 사용했어요
      </Title>
      {groups.map((group, index) => (
        <GroupContainer key={index}>
          <GroupItem
            onClick={() => {
              handleGroupClick(group); // 클릭 시 부모로 데이터 전달
            }}
          >
            <GroupCircle />
            <div className="GroupContent-container">
              <GroupName>{group.name}</GroupName>
              <GroupDetails_container>
                <span>{group.meetings}회</span>
                <span>{group.members}명</span>
              </GroupDetails_container>
            </div>
          </GroupItem>
        </GroupContainer>
      ))}
    </>
  );
};

export default RightPopup_two;