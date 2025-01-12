import { SERVER } from '@/constants/url';
import axios from 'axios';

const getMyCreatedTravel = async (userId: string) => {
  try {
    const response = await axios.get(
      `${SERVER}/api/v1/travels/my-created-travels?userId=${userId}`,
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '내가만든 여행 데이터 가져오기 실패');
  }
};

export default getMyCreatedTravel;
