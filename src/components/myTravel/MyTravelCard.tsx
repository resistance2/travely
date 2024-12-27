import { useState } from 'react';
import styled from '@emotion/styled';
import Rating from '@/components/Rating';

interface ITripCardProps {
  title: string;
  rating: string;
  reviews: number;
  price: number;
  badgeCount: number;
  updateDate: string;
  isDisabled?: boolean;
  onEnable?: () => void;
}

const TripCard: React.FC<ITripCardProps> = ({
  title,
  rating,
  reviews,
  price,
  badgeCount,
  updateDate,
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
          <Rating rating={Number(rating)} reviewCount={Number(reviews)} />
        </TitleContainer>
        <Price>
          {price} <PricePerPerson>/ 1인</PricePerPerson>
        </Price>
        <Buttons>
          <ManageButtonContainer>
            <ManageButton isDisabled={isDisabled}>관리</ManageButton>
            <ManageBadge>{badgeCount}</ManageBadge>
          </ManageButtonContainer>
          <EditButton isDisabled={isDisabled}>수정</EditButton>
        </Buttons>
        <UpdateDate>업데이트: {updateDate}</UpdateDate>
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
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 26px;
`;

const PricePerPerson = styled.span`
  font-size: 20px;
  color: #888;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
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

const ManageBadge = styled.span`
  background-color: #ff5757;
  color: white;
  padding: 2px 8px;
  border-radius: 24px;
  font-size: 12px;
  position: absolute;
  top: -8px;
  right: -10px;
`;

const EditButton = styled.button<{ isDisabled: boolean }>`
  background-color: #e0e0e0;
  color: #888;
  border: none;
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

const UpdateDate = styled.p`
  font-size: 12px;
  color: #999;
  margin-left: auto;
  text-align: right;
`;

export default TripCard;
