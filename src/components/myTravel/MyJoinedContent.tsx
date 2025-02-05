import Team from '@/components/Team';
import GuideProfile from '@/components/GuideProfile';
import styled from '@emotion/styled';
import useUserStore from '@/stores/useUserStore';
import useGetMyJoinedTravel from '@/hooks/query/useGetMyJoinedTravel';
import { myJoinedTravel } from '@/types/myJoinedTravel';
import BorderBtn from '../BorderBtn';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';
import { IGetMyJoinedTravelReturn } from '@/api/myJoinedTravel/getMyJoinedTravel';
import { useCallback, useEffect } from 'react';
import scrollToTop from '@/utils/scrollToTop';
import { MY_JOINED_TRAVEL } from '@/constants/queryKey';
import ReviewWriteModal from '@/components/myReview/ReviewWriteModal';

interface InfiniteQueryData<TPageData> {
  pages: TPageData[];
  pageParams: number[];
}

type MyJoinedInfiniteQueryData = InfiniteQueryData<IGetMyJoinedTravelReturn>;

// 남은 일수 계산 함수
const calculateDaysRemaining = (endDateString: string) => {
  const today = new Date();
  const endDate = new Date(endDateString);
  const timeDiff = endDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // 날짜가 D-0이거나 그 이전이면 'D-DAY'로 처리
  return daysRemaining <= 0 ? 'D-day' : `D-${daysRemaining}`;
};

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate).toISOString().split('T')[0];
  const end = new Date(endDate).toISOString().split('T')[0];
  return `${start} ~ ${end}`;
};

const MyJoinedContent = () => {
  const { user } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const resetQueryData = useCallback(
    (key: string) => {
      queryClient.setQueryData<MyJoinedInfiniteQueryData>([MY_JOINED_TRAVEL, key], (data) => {
        if (data) {
          return {
            pages: data.pages.slice(0, 1),
            pageParams: data.pageParams.slice(0, 1),
          };
        }
        return undefined;
      });
    },
    [queryClient],
  );

  useEffect(() => {
    if (user?.userId) {
      resetQueryData(user.userId);
    }
  }, [user?.userId, resetQueryData]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMyJoinedTravel({
    userId: user?.userId || '',
  });

  const { ref } = useInView({
    threshold: 1,
    skip: !hasNextPage,
    onChange: useCallback(
      (inView: boolean) => {
        if (inView && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      [hasNextPage, isFetchingNextPage, fetchNextPage],
    ),
  });

  if (!data) {
    return <></>;
  }

  const travelDatas = data.pages.flatMap((page) => page.travelDatas);
  const currentPage = data.pages[data.pages.length - 1]?.currentPage;

  return (
    <>
      <GridContainer>
        {travelDatas?.length > 0 ? (
          travelDatas?.map((travelData: myJoinedTravel) => {
            const currentUser = travelData.currentUserStatus; // 현재 사용자 정보
            const guide = travelData.guideInfo; // 가이드 정보
            const daysRemaining = calculateDaysRemaining(travelData.travelTeam.travelEndDate); // 남은 일수 계산
            const isPast = daysRemaining === 'D-day'; // D-0이 지났는지 확인
            const reviewWritten = travelData.reviewWritten;

            return (
              <TripCardContainer key={travelData.id} isPast={isPast && reviewWritten}>
                <Header>
                  <Title>{travelData.travelTitle}</Title>
                  {/* 예약이 거절된 상태면 "취소됨"을 표시, 아닌 경우 D-DAY 표시 */}
                  {currentUser.status === 'rejected' ? (
                    <StatusCanceled>취소됨</StatusCanceled>
                  ) : (
                    <DaysRemaining>{daysRemaining}</DaysRemaining>
                  )}
                </Header>
                <UserInfoContainer>
                  <GuideProfile
                    name={guide.socialName}
                    userEmailId={guide.userEmail}
                    imgURL={guide.userProfileImg}
                    rating={guide.userRating}
                  />
                </UserInfoContainer>

                <DateInfo>
                  {formatDateRange(
                    travelData.travelTeam.travelStartDate,
                    travelData.travelTeam.travelEndDate,
                  )}
                </DateInfo>

                <Team
                  max={travelData.travelTeam.personLimit}
                  userList={travelData.travelTeam.approvedMembersMbti.mbti.map((mbti) => ({
                    mbti: mbti || null,
                  }))}
                />

                <CurrentUserStatus>
                  {/* D-DAY이면서 승인 상태고 후기가 작성되지 않은 경우 후기 작성 버튼 */}
                  {isPast &&
                    currentUser.status === 'approved' &&
                    !reviewWritten &&
                    user?.userId && (
                      <ReviewWriteModal
                        travelId={travelData.travelId}
                        userId={user.userId}
                        reviewTitle={travelData.travelTitle}
                        userName={travelData.guideInfo.socialName}
                        guideInfo={travelData.guideInfo}
                        travelThumbnail={travelData.thumbnail}
                      />
                    )}
                  {isPast ? (
                    <>
                      {reviewWritten && <CompletionMessage>여행 완료</CompletionMessage>}
                      {currentUser.status === 'rejected' && <p>예약 취소</p>}
                      {currentUser.status === 'waiting' && <p>예약 불가</p>}
                    </>
                  ) : (
                    <>
                      {currentUser.status === 'approved' && <p>예약 완료</p>}
                      {currentUser.status === 'waiting' && <p>예약 대기</p>}
                      {currentUser.status === 'rejected' && <p>예약 취소</p>}
                    </>
                  )}
                </CurrentUserStatus>
              </TripCardContainer>
            );
          })
        ) : (
          <EmptyMessage>
            여행에 참여해주세요
            <BorderBtn color="#4a95f2">
              <Link to="/travel-list">여행 참여하기</Link>
            </BorderBtn>
          </EmptyMessage>
        )}
      </GridContainer>
      {!hasNextPage && currentPage !== 1 && (
        <StyledBorderBtn color="#4a95f2" size="full" hover="filled" onClick={() => scrollToTop()}>
          처음으로
        </StyledBorderBtn>
      )}
      <InviewTarget ref={ref} />
    </>
  );
};

export default MyJoinedContent;

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

const CompletionMessage = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin: 20px 0;
`;

const InviewTarget = styled.div`
  height: 1px;
`;

const StyledBorderBtn = styled(BorderBtn)`
  margin-top: 30px;
`;
