import getTravelDetail from '@/api/travelDetail/getTravelDetail';
import { TRAVEL_DETAIL } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetTravelDetail = (travelId: string) => {
  return useQuery({
    queryKey: [TRAVEL_DETAIL, travelId],
    queryFn: () => getTravelDetail(travelId),
  });
};

export default useGetTravelDetail;
