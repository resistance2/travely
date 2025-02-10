import { useInfiniteQuery } from '@tanstack/react-query';
import getCreatedGuideTravel from '@/api/myCreatedTravel/getCreatedGuideTravel';

interface IUseGetTravelList {
  userId: string;
}
const MY_CREATED_TRAVEL = 'my-created-travel';

const useGetMyCreatedTravel = ({ userId }: IUseGetTravelList) => {
  const pageSize = 10;
  return useInfiniteQuery({
    queryKey: [MY_CREATED_TRAVEL, userId],
    queryFn: ({ pageParam }) => getCreatedGuideTravel({ userId, page: pageParam, size: pageSize }),
    getNextPageParam: (lastPage) => {
      const lastPageInfo = lastPage?.data?.pageInfo ?? {};
      return lastPageInfo?.hasNext ? lastPageInfo?.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default useGetMyCreatedTravel;
