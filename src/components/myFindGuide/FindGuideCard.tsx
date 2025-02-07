import Team from '@/components/Team';
import styled from '@emotion/styled';
import { useState } from 'react';

interface IFindGuideCardProps {
  title: string;
  reviews: number;
  isDisabled?: boolean;
  onEnable?: () => void;
}

const FindGuideCard: React.FC<IFindGuideCardProps> = ({
  title,
  reviews,
  isDisabled = false,
  onEnable,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TripCardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TripInfo isDisabled={isDisabled}>
        <TitleContainer>
          <Title>{title}</Title>
          <Comment>댓글 수:{reviews}</Comment>
        </TitleContainer>
        <Team max={7} userList={[{ mbti: 'ENFP' }]} />
        <Buttons>
          <ManageButtonContainer>
            <ManageButton isDisabled={isDisabled}>수정</ManageButton>
          </ManageButtonContainer>
          <DeleteButton isDisabled={isDisabled}>삭제</DeleteButton>
        </Buttons>
      </TripInfo>
      {isDisabled && (
        <Overlay onClick={onEnable}>
          <DisabledText isHovered={isHovered}>{isHovered ? '활성화' : '비활성화'}</DisabledText>
        </Overlay>
      )}
    </TripCardContainer>
  );
};

// 스타일 정의
const TripCardContainer = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 18px;
  background-color: #fff;
  width: 344px;
  height: 190px;
`;

const TripInfo = styled.div<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
`;

const DisabledText = styled.p<{ isHovered: boolean }>`
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: ${(props) => (props.isHovered ? 'pointer' : 'default')};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const Comment = styled.span`
  font-size: 10px;
  color: #888888;
  padding-right: 6px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 22px;
  gap: 30px;
  width: 100%;
`;

const ManageButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ManageButton = styled.button<{ isDisabled: boolean }>`
  background-color: #4a95f2;
  color: white;
  border: none;
  padding: 8px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
`;

const DeleteButton = styled.button<{ isDisabled: boolean }>`
  color: #ff5757;
  border: 1px solid #ff5757;
  padding: 8px;
  border-radius: 8px;
  margin-left: 10px;
  height: 30px;
  cursor: pointer;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
`;

export default FindGuideCard;
