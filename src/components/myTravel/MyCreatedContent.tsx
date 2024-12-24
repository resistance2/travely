import Team from '@/components/Team';
import UserProfile from '@/components/UserProfile';
import { travelMyJoinedData } from '@/data/travelMyJoinedMockData';
import styled from '@emotion/styled';

// 남은 일수 계산 함수
const calculateDaysRemaining = (endDateString: string) => {
  const today = new Date();
  const endDate = new Date(endDateString);
  const timeDiff = endDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // 날짜가 D-0이거나 그 이전이면 'D-DAY'로 처리
  return daysRemaining <= 0 ? 'D-day' : `D-${daysRemaining}`;
};

const MyCreatedContent = () => {
  return (
    <GridContainer>
      {travelMyJoinedData.map((travelData, index) => {
        const currentUser = travelData.currentUserStatus; // 현재 사용자 정보
        const guide = travelData.guideInfo; // 가이드 정보
        const daysRemaining = calculateDaysRemaining(travelData.travelTeam.travelEndDate); // 남은 일수 계산
        const isPast = daysRemaining === 'D-day'; // D-0이 지났는지 확인
        const reviewWritten = travelData.reviewWritten;

        return (
          <TripCardContainer key={index} isPast={isPast && reviewWritten}>
            <Header>
              <Title>{travelData.travelTitle}</Title>
              {/* 예약이 거절된 상태면 "취소됨"을 표시, 아닌 경우 D-DAY 표시 */}
              {currentUser.status === 'refused' ? (
                <StatusCanceled>취소됨</StatusCanceled>
              ) : (
                <DaysRemaining>{daysRemaining}</DaysRemaining>
              )}
            </Header>
            <UserInfoContainer>
              <UserProfile
                name={guide.userName}
                userEmailId={guide.userEmail}
                imgURL={guide.userProfileImg}
                rating={guide.userRating}
                showSocialName={true}
                showDate={false}
              />
            </UserInfoContainer>

            <DateInfo>
              {`${travelData.travelTeam.travelStartDate} ~ ${travelData.travelTeam.travelEndDate}`}
            </DateInfo>

            <Team
              max={travelData.travelTeam.personLimit}
              mbtiList={travelData.travelTeam.approvedMembersMbti.mbti}
            />

            {/* 상태 표시 */}
            <CurrentUserStatus>
              {/* D-DAY이면서 승인 상태고 후기가 작성되지 않은 경우 후기 작성 버튼 */}
              {isPast && currentUser.status === 'approved' && !reviewWritten && (
                <ReviewButton>후기 작성</ReviewButton>
              )}

              {/* D-DAY이면서 후기가 작성된 경우 여행 완료 메시지 */}
              {isPast && reviewWritten && <CompletionMessage>여행 완료</CompletionMessage>}
              {isPast && currentUser.status === 'refused' && <p>예약 취소</p>}
              {/* 아직 D-DAY가 지나지 않은 경우 예약 상태 표시 */}
              {!isPast && (
                <>
                  {currentUser.status === 'approved' && <p>예약 완료</p>}
                  {currentUser.status === 'waiting' && <p>예약 대기</p>}
                  {currentUser.status === 'refused' && <p>예약 취소</p>}
                </>
              )}
            </CurrentUserStatus>
          </TripCardContainer>
        );
      })}
    </GridContainer>
  );
};

export default MyCreatedContent;

// 스타일 정의는 그대로 유지
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

const TripCardContainer = styled.div<{ isPast: boolean }>`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 18px;
  background-color: #fff;
  width: 344px;
  height: 250px;
  opacity: ${(props) => (props.isPast ? 0.5 : 1)}; // D-DAY이면 흐리게 처리
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const DaysRemaining = styled.span`
  font-size: 16px;
  color: #888;
`;

const StatusCanceled = styled.span`
  font-size: 14px;
  color: #ff5252;
  font-weight: bold;
`;

const UserInfoContainer = styled.div`
  margin-bottom: 18px;
`;

const DateInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #555555;
  margin-bottom: 10px;
`;

const CurrentUserStatus = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

const ReviewButton = styled.button`
  background-color: #4a95f2;
  width: 100%;
  color: white;
  padding: 4px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;

const CompletionMessage = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
