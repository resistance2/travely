import FindGuideCard from '@/components/myFindGuide/FindGuideCard';
import useGetMyCreatedGuideTravel from '@/hooks/query/useGetMyCreatedGuideTravel';
import useUserStore from '@/stores/useUserStore';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const FindGuideContent = () => {
  const user = useUserStore((state) => state.user);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMyCreatedGuideTravel({
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

  const tripsData = data?.pages.flatMap((page) => page.data.travels) || [];

  return (
    <ScrollableContainer>
      <MyMadeTripsContainer>
        {tripsData.map((travel, index) => (
          <FindGuideCard
            key={index}
            title={travel.travelTitle}
            comments={travel.commentCount}
            userList={travel.appliedUsers}
            personLimit={travel.personLimit}
            onEnable={() => {}}
          />
        ))}
      </MyMadeTripsContainer>
      <InviewTarget ref={ref} />
    </ScrollableContainer>
  );
};

const InviewTarget = styled.div`
  height: 1px;
`;

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

export default FindGuideContent;
