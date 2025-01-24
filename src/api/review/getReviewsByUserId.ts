import { SERVER } from '@/constants/url';
import axios from 'axios';

export interface Review {
  id: string;
  travelId: string;
  reviewImg: string[];
  content: string;
  travelScore: number;
  createdDate: string;
  travelTitle: string;
  socialName: string;
  userProfileImage: string;
  userEmail: string;
  isVerifiedUser: boolean;
}

interface PageInfo {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
}

interface ReviewsResponse {
  success: boolean;
  data: {
    data: {
      reviews: Review[];
    };
    pageInfo: PageInfo;
  };
}

export const getReviewsByUserId = async ({
  userId,
  page = 1,
  pageSize = 10,
}: {
  userId: string;
  page?: number;
  pageSize?: number;
}): Promise<ReviewsResponse> => {
  try {
    const response = await axios.get<ReviewsResponse>(`${SERVER}/api/v1/reviews`, {
      params: {
        userId,
        page,
        pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
