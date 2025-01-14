import { SERVER } from '@/constants/url';
import axios from 'axios';

const deleteComment = async (commentId: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${SERVER}/api/v1/travels-guide/comments/${commentId}`);
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '댓글 삭제 실패');
  }
};

export default deleteComment;
