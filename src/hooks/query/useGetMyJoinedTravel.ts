import getMyJoinedTravel from '@/api/myJoinedTravel/getMyJoinedTravel';
import { MY_JOINED_TRAVEL } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetMyJoinedTravel = (userId: string) => {
  return useQuery({
    queryKey: [MY_JOINED_TRAVEL, userId],
    queryFn: () => getMyJoinedTravel(userId),
  });
};

export default useGetMyJoinedTravel;
