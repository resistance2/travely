import { SERVER } from '@/constants/url';
import axios from 'axios';

const postComment = async (
  userId: string,
  guidePostId: string,
  comment: string,
): Promise<boolean> => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/travels-guide/comments`, {
      userId,
      guidePostId,
      comment,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '댓글 업로드 실패');
  }
};

export default postComment;
