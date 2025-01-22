import getMyJoinedTravel from '@/api/myJoinedTravel/getMyJoinedTravel';
import { MY_JOINED_TRAVEL } from '@/constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

interface IUseGetTravelList {
  userId: string;
}

const useGetMyJoinedTravel = ({ userId }: IUseGetTravelList) => {
  const pageSize = 6;
  return useInfiniteQuery({
    queryKey: [MY_JOINED_TRAVEL, userId],
    queryFn: ({ pageParam }) => getMyJoinedTravel({ userId, page: pageParam, size: pageSize }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialPageParam: 1,
  });
};

export default useGetMyJoinedTravel;
