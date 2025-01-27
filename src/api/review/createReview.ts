import { SERVER } from '@/constants/url';
import axios from 'axios';

interface CreateReviewParams {
  userId: string;
  travelId: string;
  reviewImgs: File[];
  travelScore: number;
  content: string;
  title: string;
  guideScore?: number;
}

export const createReview = async ({
  userId,
  travelId,
  reviewImgs,
  travelScore,
  content,
  title,
  guideScore,
}: CreateReviewParams) => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('travelId', travelId);
    formData.append('travelScore', travelScore.toString());
    formData.append('content', content);
    formData.append('title', title);
    if (guideScore !== undefined && guideScore !== null && guideScore !== 0) {
      formData.append('guideScore', guideScore.toString());
    }

    reviewImgs.forEach((img) => {
      formData.append('reviewImg', img);
    });

    const response = await axios.post(`${SERVER}/api/v1/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '리뷰 생성 실패');
  }
};
