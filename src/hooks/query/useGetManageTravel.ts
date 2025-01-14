import getManageTravel from '@/api/manageTravel/getManageTravel';
import { MANAGE_TRAVEL } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetManageTravel = (travelId: string) => {
  return useQuery({
    queryKey: [MANAGE_TRAVEL, travelId],
    queryFn: () => getManageTravel(travelId),
  });
};

export default useGetManageTravel;
