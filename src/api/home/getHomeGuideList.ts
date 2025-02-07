import { SERVER } from '@/constants/url';
import { IGuideCard } from '@/types/guideCardType';
import axios from 'axios';

const getHomeGuideList = async (userId: string | null): Promise<IGuideCard[]> => {
  try {
    const res = await axios.get(`${SERVER}/api/v1/travels-guide/travel-list`, {
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

export default getHomeGuideList;
