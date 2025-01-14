import { SERVER } from '@/constants/url';
import axios from 'axios';

const updateTravelActiveStatus = async (travelId: string, isActive: boolean) => {
  try {
    const response = await axios.patch(`${SERVER}/api/v1/travels/update-active`, {
      travelId,
      isActive,
    });
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '여행 활성화/비활성화 실패');
  }
};

export default updateTravelActiveStatus;
