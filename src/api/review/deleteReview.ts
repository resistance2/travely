import { SERVER } from '@/constants/url';
import axios from 'axios';

interface DeleteReviewResponse {
  success: boolean;
  message: string;
  data: {
    deletedId: string;
    message: string;
  };
}

const deleteReview = async (reviewId: string): Promise<DeleteReviewResponse> => {
  try {
    const response = await axios.delete<DeleteReviewResponse>(
      `${SERVER}/api/v1/reviews/${reviewId}`,
    );
    if (!response.data.success) {
      throw new Error('리뷰 삭제 실패');
    }
    return response.data;
  } catch (err) {
    console.error('리뷰 삭제오류', err);
    throw new Error(err instanceof Error ? err.message : '리뷰 삭제 오류');
  }
};

export default deleteReview;
