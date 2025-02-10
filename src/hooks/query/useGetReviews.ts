import { getReviewsByUserId } from '@/api/review/getReviewsByUserId';
import { REVIEW_LIST } from '@/constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetReviews = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [REVIEW_LIST, userId],
    queryFn: ({ pageParam }) => {
      return getReviewsByUserId({ userId, page: pageParam, pageSize: 10 });
    },
    getNextPageParam: (lastPage) => {
      const lastPageInfo = lastPage?.data?.pageInfo ?? {};
      return lastPageInfo?.hasNext ? lastPageInfo?.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });
};

export default useGetReviews;
