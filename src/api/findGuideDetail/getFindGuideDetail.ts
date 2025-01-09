import { SERVER } from '@/constants/url';
import { FindGuideDetailData } from '@/types/guideFindDataType';
import axios from 'axios';

const getFindGuideDetail = async (guidePostId: string): Promise<FindGuideDetailData> => {
  try {
    const response = await axios.get(`${SERVER}/api/v1/travels-guide/travel-detail/${guidePostId}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '가이드 구해요 상세 데이터 가져오기 실패');
  }
};

export default getFindGuideDetail;
