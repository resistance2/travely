import { SERVER } from '@/constants/url';
import axios from 'axios';

const updateBookmark = async (
  userId: string,
  travelId: string,
  isBookmark: boolean,
): Promise<boolean | null> => {
  try {
    const response = await axios.patch(`${SERVER}/api/v1/travels/bookmark`, {
      userId,
      travelId,
      isBookmark,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '북마크 변경 실패');
  }
};

export default updateBookmark;
