import deleteReview from '@/api/review/deleteReview';
import { ShowToast } from '@/components/Toast';
import { REVIEW_LIST } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId: reviewId }: { reviewId: string }) => deleteReview(reviewId),
    onSuccess: () => {
      ShowToast('리뷰 삭제 성공', 'success');
      queryClient.invalidateQueries({ queryKey: [REVIEW_LIST] });
    },
    onError: () => {
      ShowToast('리뷰 삭제 실패', 'failed');
    },
  });
};

export default useDeleteReview;
