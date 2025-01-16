import { IPostReviewParams, postReview } from '@/api/review/postReview';
import { ShowToast } from '@/components/Toast';
import { MY_JOINED_TRAVEL } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      travelId,
      reviewImg,
      content,
      title,
      travelScore,
      userReview,
    }: IPostReviewParams) =>
      postReview({ userId, travelId, reviewImg, content, title, travelScore, userReview }),
    onSuccess: (_, { travelId }) => {
      ShowToast('성공!', 'success');
      queryClient.invalidateQueries({ queryKey: [MY_JOINED_TRAVEL, travelId] });
    },
    onError: () => {
      ShowToast('실패!', 'failed');
    },
  });
};

export default usePostReview;
