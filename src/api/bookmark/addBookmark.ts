import { SERVER } from '@/constants/url';
import axios from 'axios';

const addBookmark = async ({
  travelId,
  userId,
}: {
  travelId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/bookmarks`, {
      travelId,
      userId,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '북마크 추가 실패');
  }
};

export default addBookmark;
