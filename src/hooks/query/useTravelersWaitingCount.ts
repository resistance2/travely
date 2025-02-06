import getTravelersWaitingCount from '@/api/manageTravel/getTravelersWaitingCount';
import { TRAVELERS_WAITING_COUNT } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useTravelersWaitingCount = (userId: string) => {
  return useQuery({
    queryKey: [TRAVELERS_WAITING_COUNT, userId],
    queryFn: () => getTravelersWaitingCount(userId),
    select: (response) => response.data.waitings,
    enabled: !!userId,
    refetchInterval: 20000,
  });
};

export default useTravelersWaitingCount;
