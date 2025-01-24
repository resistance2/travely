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
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('travelId', travelId);
  formData.append('travelScore', travelScore.toString());
  formData.append('content', content);
  formData.append('title', title);
  if (guideScore) {
    formData.append('guideScore', guideScore.toString());
  }

  reviewImgs.forEach((img) => {
    formData.append('reviewImg', img);
  });

  const response = await axios.post('http://3.37.101.147:3000/api/v1/reviews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
