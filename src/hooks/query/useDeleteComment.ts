import deleteComment from '@/api/findGuideDetail/deleteComment';
import { ShowToast } from '@/components/Toast';
import { FIND_GUIDE_DETAIL } from '@/constants/queyKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteComment = (guidePostId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) => deleteComment(commentId),
    onSuccess: () => {
      ShowToast('댓글이 삭제되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: [FIND_GUIDE_DETAIL, guidePostId] });
    },
    onError: () => {
      ShowToast('댓글 삭제가 실패했습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default useDeleteComment;
