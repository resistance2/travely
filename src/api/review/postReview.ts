import { SERVER } from '@/constants/url';
import axios from 'axios';

export interface IPostReviewParams {
  userId: string;
  travelId: string;
  reviewImg?: string[];
  content: string;
  title: string;
  travelScore: number;
  userReview?: {
    toUserId: string;
    userScore: number;
  };
}

export const postReview = async ({
  userId,
  travelId,
  reviewImg,
  content,
  title,
  travelScore,
  userReview,
}: IPostReviewParams) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/reviews`, {
      userId,
      travelId,
      reviewImg,
      content,
      title,
      travelScore,
      userReview,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '   ');
  }
};
