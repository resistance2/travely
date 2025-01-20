import { SERVER } from '@/constants/url';
import axios from 'axios';

const deleteTravel = async (travelId: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${SERVER}/api/v1/travels/${travelId}`);
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '여행 삭제 실패');
  }
};

export default deleteTravel;
