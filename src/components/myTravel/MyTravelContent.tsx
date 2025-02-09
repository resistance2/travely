import styled from '@emotion/styled';
import TripCard from './MyTravelCard';
import useUserStore from '@/stores/useUserStore';
import useGetMyCreatedTravel from '@/hooks/query/useGetMyCreatedTravel';
import { myCreatedTravel } from '@/types/myCreatedTravelType';
import { Link } from 'react-router-dom';
import BorderBtn from '../BorderBtn';
import { IGetMyCreatedTravelReturn } from '@/api/myCreatedTravel/getMycreatedTravel';
import { MY_CREATED_TRAVEL } from '@/constants/queryKey';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';
import scrollToTop from '@/utils/scrollToTop';

interface InfiniteQueryData<TPageData> {
  pages: TPageData[];
  pageParams: number[];
}

type MyCreatedInfiniteQueryData = InfiniteQueryData<IGetMyCreatedTravelReturn>;

const MyCreatedContent = () => {
  const { user } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const resetQueryData = useCallback(
    (key: string) => {
      queryClient.setQueryData<MyCreatedInfiniteQueryData>([MY_CREATED_TRAVEL, key], (data) => {
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMyCreatedTravel({
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

  const createdTravelDatas = data.pages.flatMap((page) => page.createdTravelDatas);
  const currentPage = data.pages[data.pages.length - 1]?.currentPage;

  return (
    <ScrollableContainer>
      {createdTravelDatas.length > 0 ? (
        <MyMadeTripsContainer>
          {createdTravelDatas?.map((trip: myCreatedTravel) => (
            <TripCard
              travelId={trip.travelId}
              key={trip.travelId}
              title={trip.travelTitle}
              rating={trip.reviewAverage}
              reviews={trip.travelReviewCount}
              price={trip.travelPrice}
              badgeCount={trip.approveWaitingCount}
              updateDate={trip.updatedAt}
              isDisabled={!trip.travelActive}
            />
          ))}
        </MyMadeTripsContainer>
      ) : (
        <EmptyMessage>
          여행을 생성해주세요
          <BorderBtn color="#4a95f2">
            <Link to="/add-travel">여행 만들기 +</Link>
          </BorderBtn>
        </EmptyMessage>
      )}
      {!hasNextPage && currentPage !== 1 && (
        <StyledBorderBtn color="#4a95f2" size="full" hover="filled" onClick={() => scrollToTop()}>
          처음으로
        </StyledBorderBtn>
      )}
      <InviewTarget ref={ref} />
    </ScrollableContainer>
  );
};

// 스타일 정의
const ScrollableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const MyMadeTripsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
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

export default MyCreatedContent;
