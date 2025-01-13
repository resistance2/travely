import { SERVER } from '@/constants/url';
import axios from 'axios';

const patchComment = async (
  commentId: string,
  userId: string,
  comment: string,
): Promise<boolean> => {
  try {
    const response = await axios.patch(`${SERVER}/api/v1/travels-guide/comments`, {
      commentId,
      userId,
      comment,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '댓글 수정 실패');
  }
};

export default patchComment;
