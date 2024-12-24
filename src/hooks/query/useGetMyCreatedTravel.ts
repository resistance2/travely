import getMyCreatedTravel from '@/api/myCreatedTravel/getMycreatedTravel';
import { useQuery } from '@tanstack/react-query';

const useGetMyCreatedTravel = (userId: string) => {
  return useQuery({
    queryKey: ['my-travel-created', userId],
    queryFn: () => getMyCreatedTravel(userId),
  });
};

export default useGetMyCreatedTravel;
