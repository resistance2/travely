import { SERVER } from '@/constants/url';
import { TravelData } from '@/types/travelDataType';
import axios from 'axios';

const getManageTravel = async (travelId: string): Promise<TravelData> => {
  try {
    const response = await axios.get(`${SERVER}/api/v1/travels/manage-my-travel-teams/${travelId}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '여행데이터 가져오기 실패');
  }
};

export default getManageTravel;
