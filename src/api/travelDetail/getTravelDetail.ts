import { SERVER } from '@/constants/url';
import { TravelDetailData } from '@/types/travelDataType';
import axios from 'axios';

const getTravelDetail = async (travelId: string): Promise<TravelDetailData | null> => {
  try {
    const response = await axios.get(`${SERVER}/api/v1/travels/travel-detail/${travelId}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '여행 상세 데이터 가져오기 실패');
  }
};

export default getTravelDetail;
