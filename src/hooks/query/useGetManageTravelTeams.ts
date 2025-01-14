import getManageTravelTeams from '@/api/manageTravel/getManageTravelTeams';
import { MANAGE_TRAVEL_TEAMS } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetManageTravelTeams = (travelId: string, page: number, size: number, teamId: string) => {
  return useQuery({
    queryKey: [MANAGE_TRAVEL_TEAMS, page, teamId],
    queryFn: () => getManageTravelTeams(travelId, page, size, teamId),
  });
};

export default useGetManageTravelTeams;
