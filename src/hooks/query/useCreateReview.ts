import { createReview } from '@/api/review/createReview';
import { ShowToast } from '@/components/Toast';
import { MY_JOINED_TRAVEL, REVIEW_LIST } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseCreateReviewProps {
  userId: string;
  travelId: string;
  reviewImgs: File[];
  travelScore: number;
  content: string;
  title: string;
  guideScore?: number;
}

const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      travelId,
      reviewImgs,
      travelScore,
      content,
      title,
      guideScore,
    }: UseCreateReviewProps) =>
      createReview({
        userId,
        travelId,
        reviewImgs,
        travelScore,
        content,
        title,
        guideScore,
      }),
    onSuccess: (_, { userId }) => {
      ShowToast('리뷰가 성공적으로 등록되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: [MY_JOINED_TRAVEL, userId] });
      queryClient.invalidateQueries({ queryKey: [REVIEW_LIST, userId] });
    },
    onError: () => {
      ShowToast('리뷰 등록에 실패했습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default useCreateReview;
