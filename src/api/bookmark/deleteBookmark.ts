import { SERVER } from '@/constants/url';
import axios from 'axios';

const deleteBookmark = async ({
  travelId,
  userId,
}: {
  travelId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const response = await axios.delete(`${SERVER}/api/v1/bookmarks`, {
      params: {
        travelId,
        userId,
      },
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '오타 삭제 실패');
  }
};

export default deleteBookmark;
