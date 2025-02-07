import { SERVER } from '@/constants/url';
import { ITravelCard } from '@/types/travelCardType';
import axios from 'axios';

const getHomeTravelList = async (userId: string | null): Promise<ITravelCard[]> => {
  try {
    const res = await axios.get(`${SERVER}/api/v1/travels/travel-list`, {
      params: {
        userId,
        page: 1,
        size: 8,
      },
    });
    return res.data.data.travels;
  } catch (error) {
    console.error('여행 목록을 조회하는데 실패했습니다: ' + error);
    throw error;
  }
};

export default getHomeTravelList;
