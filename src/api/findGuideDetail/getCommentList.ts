import { COMMENT_COUNT_PER_PAGE } from '@/constants/countPerPage';
import { SERVER } from '@/constants/url';
import { CommentData } from '@/types/guideFindDataType';
import axios from 'axios';

const getCommentList = async (guidePostId: string, page: number): Promise<CommentData> => {
  try {
    const response = await axios.get(`${SERVER}/api/v1/travels-guide/comments/${guidePostId}`, {
      params: {
        guidePostId,
        page,
        size: COMMENT_COUNT_PER_PAGE,
      },
    });
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '댓글 목록 가져오기 실패');
  }
};

export default getCommentList;
