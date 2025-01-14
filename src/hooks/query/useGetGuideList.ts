import getGuideList from '@/api/guideList/getGuideList';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetGuideList = () => {
  const pageSize = 8;

  return useInfiniteQuery({
    queryKey: ['guideList'],
    queryFn: ({ pageParam }) => {
      return getGuideList({ page: pageParam, size: pageSize });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialPageParam: 1,
  });
};

export default useGetGuideList;
