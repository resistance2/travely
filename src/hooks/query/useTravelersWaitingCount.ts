import getTravelersWaitingCount from '@/api/manageTravel/getTravelersWaitingCount';
import { useQuery } from '@tanstack/react-query';

const useTravelersWaitingCount = (userId: string) => {
  return useQuery({
    queryKey: ['travelersWaitingCount', userId],
    queryFn: () => getTravelersWaitingCount(userId),
    select: (response) => response.data.waitings,
    enabled: !!userId,
  });
};

export default useTravelersWaitingCount;
