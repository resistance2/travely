import patchComment from '@/api/findGuideDetail/patchComment';
import { ShowToast } from '@/components/Toast';
import { FIND_GUIDE_DETAIL } from '@/constants/queyKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePatchCommentProps {
  commentId: string;
  userId: string;
  comment: string;
}

const usePatchComment = (guidePostId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, userId, comment }: UsePatchCommentProps) =>
      patchComment(commentId, userId, comment),
    onSuccess: () => {
      ShowToast('댓글이 수정되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: [FIND_GUIDE_DETAIL, guidePostId] });
    },
    onError: () => {
      ShowToast('댓글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default usePatchComment;
