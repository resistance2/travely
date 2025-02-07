import { SERVER } from '@/constants/url';
import { ITravelCard } from '@/types/travelCardType';
import axios from 'axios';

const getBookmarkList = async (userId: string): Promise<ITravelCard[]> => {
  try {
    const res = await axios.get(`${SERVER}/api/v1/travels/bookmark-list`, {
      params: {
        userId,
      },
    });
    return res.data.data.bookmarks;
  } catch (error) {
    console.error('북마크 목록을 조회하는데 실패했습니다: ' + error);
    throw error;
  }
};

export default getBookmarkList;
