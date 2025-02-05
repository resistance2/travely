import getGuideList from '@/api/guideList/getGuideList';
import { GUIDE_LIST } from '@/constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetGuideList = () => {
  const pageSize = 8;

  return useInfiniteQuery({
    queryKey: [GUIDE_LIST],
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
