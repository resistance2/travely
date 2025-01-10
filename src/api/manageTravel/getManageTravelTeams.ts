import { SERVER } from '@/constants/url';
import { TravelTeamData } from '@/types/travelDataType';
import axios from 'axios';

const getManageTravelTeams = async (
  travelId: string,
  page: number,
  size: number,
  teamId: string,
): Promise<TravelTeamData> => {
  try {
    const response = await axios.get(
      `${SERVER}/api/v1/travels/manage-my-travel/${travelId}?page=${page}&size=${size}&teamId=${teamId}`,
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '팀 데이터 가져오기 실패');
  }
};

export default getManageTravelTeams;
