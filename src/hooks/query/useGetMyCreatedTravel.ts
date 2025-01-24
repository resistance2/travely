import getMyCreatedTravel from '@/api/myCreatedTravel/getMycreatedTravel';
import { MY_CREATED_TRAVEL } from '@/constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

interface IUseGetTravelList {
  userId: string;
}

const useGetMyCreatedTravel = ({ userId }: IUseGetTravelList) => {
  const pageSize = 6;
  return useInfiniteQuery({
    queryKey: [MY_CREATED_TRAVEL, userId],
    queryFn: ({ pageParam }) => getMyCreatedTravel({ userId, page: pageParam, size: pageSize }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialPageParam: 1,
  });
};

export default useGetMyCreatedTravel;
