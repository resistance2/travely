import getTravelDetail from '@/api/travelDetail/getTravelDetail';
import { TRAVEL_DETAIL } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetTravelDetail = (travelId: string, userId: string | null) => {
  return useQuery({
    queryKey: [TRAVEL_DETAIL, travelId],
    queryFn: () => getTravelDetail(travelId, userId),
  });
};

export default useGetTravelDetail;
