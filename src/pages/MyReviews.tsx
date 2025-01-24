import ReviewCard from '@/components/myReview/ReviewCard';
import { REVIEW_LIST } from '@/constants/queryKey';
import useGetReviews from '@/hooks/query/useGetReviews';
import useUserStore from '@/stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MyReviews = () => {
  const user = useUserStore((state) => state.user);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetReviews({
    userId: user?.userId ?? '',
  });

  const queryClient = useQueryClient();

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

  const reviews = data?.pages.flatMap((group) => group.data.data.reviews) || [];

  useEffect(() => {
    queryClient.resetQueries({ queryKey: [REVIEW_LIST, user?.userId] });
  }, [user?.userId, queryClient]);

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard
          key={review.reviewId}
          review={review}
          showTitle={true}
          showUser={false}
          showDate={true}
          showDelete={true}
        />
      ))}
      {hasNextPage && <div ref={ref}>{isFetchingNextPage ? 'Loading more...' : ''}</div>}
    </div>
  );
};

export default MyReviews;
