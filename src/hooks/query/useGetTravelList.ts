import getTravelList from '@/api/travelList/getTravelList';
import { TagPath } from '@/types/tagType';
import { useInfiniteQuery } from '@tanstack/react-query';
interface IUseGetTravelList {
  tag: TagPath | '전체';
}

const useGetTravelList = ({ tag }: IUseGetTravelList) => {
  const pageSize = 8;

  return useInfiniteQuery({
    queryKey: ['travelList', tag],
    queryFn: ({ pageParam }) => {
      return getTravelList({ page: pageParam, size: pageSize, tag });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialPageParam: 1,
  });
};

export default useGetTravelList;
