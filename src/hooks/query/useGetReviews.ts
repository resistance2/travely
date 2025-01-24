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
    staleTime: 0, // 항상 새로운 데이터를 가져오도록 설정
    // refetchOnWindowFocus: true, // 창이 포커스될 때 자동 새로고침
    initialPageParam: 1,
    enabled: !!userId,
  });
};

export default useGetReviews;
