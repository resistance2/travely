import { SERVER } from '@/constants/url';
import axios from 'axios';

const deleteComment = async (commentId: string, userId: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${SERVER}/api/v1/travels-guide/comments`, {
      data: { commentId, userId },
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '댓글 삭제 실패');
  }
};

export default deleteComment;
