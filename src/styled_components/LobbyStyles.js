import styled from "styled-components";

export const MarginContainer = styled.div`
   display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
`;

export const BackgroundContainer = styled.div`
  background-color: #f5f5f5;
  width: 100%;
`;

export const ImageContainer = styled.div`
  background-image: ${({ cover }) => `url(${cover})`};
  display: flex;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 332px;
  background-position: center;
  background-size: cover;
`;


export const GradientOverlay = styled.div`
  width: 100%;
  height: 332px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(217, 217, 217, 0.5),
    rgba(0, 0, 0, 0.5)
  );
`;

export const ContentWrapper = styled.div`
  z-index: 2;
  color: white;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 1156px;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

export const SubTitle = styled.p`
  width: full;
  font-size: 1.25rem;
  margin: 5px 0;
`;

export const GroupInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Close = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  color: #d5d5d5;
  cursor: pointer;
  z-index: 3;
  display: flex;
  position: absolute;
  top: 40px;
  left: 40px;
  background: none;
  border: none;
  padding: 10px 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: none;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border: none;
  }
`;

export const GroupMembers = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.body};
`;

export const GroupSize = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.body};
`;

export const WaitMessage = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.body};
  width: 533px;
  height: 11px;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 1156px;
  margin: 60px auto;
`;

export const MemberInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const MemberImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 30px;
  object-fit: cover;
`;

export const MemberName = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.body};
`;

export const MemberDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailText = styled.span`
  font-size: ${(props) => (props.size === 'large' ? '1.7rem' : '1.125rem')};
  font-weight: ${(props) => (props.size === 'large' ? '700' : '400')};
  color: ${(props) =>
    props.size === 'large' ? props.theme.colors.body : '#565656'};
`;

export const MembersContainer = styled.div`
  position: relative;
  background-color: #f5f5f5;
  width: 1156px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 50px;
  padding-bottom: 100px;
`;

export const MemberSpan = styled.span`
  font-size: ${(props) => (props.type === 'current' ? '20px' : '16px')};
  font-weight: ${(props) => (props.type === 'current' ? '700' : '400')};
`;

export const MembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FlexRowWrapper = styled.div`
  display: flex;
  gap: 14px;
`;

export const GroupMembersText = styled(GroupMembers)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.body};
  margin: 0;
`;

export const GroupSizeWrapper = styled(GroupSize)`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const WaitMessageStyled = styled(WaitMessage)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.body};
  margin: 0;
`;