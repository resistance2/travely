import getMyCreatedTravel from '@/api/myCreatedTravel/getMycreatedTravel';
import { MY_CREATED_TRAVEL } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetMyCreatedTravel = (userId: string) => {
  return useQuery({
    queryKey: [MY_CREATED_TRAVEL, userId],
    queryFn: () => getMyCreatedTravel(userId),
  });
};

export default useGetMyCreatedTravel;
