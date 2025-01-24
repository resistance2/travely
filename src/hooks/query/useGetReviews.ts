import { getReviewsByUserId } from '@/api/review/getReviewsByUserId';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetReviews = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: ['reviews', userId],
    queryFn: ({ pageParam }) => {
      return getReviewsByUserId({ userId, page: pageParam, pageSize: 10 });
    },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage.data;
      return pageInfo.hasNext ? pageInfo.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });
};

export default useGetReviews;
