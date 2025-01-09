import postComment from '@/api/findGuideDetail/postComment';
import { ShowToast } from '@/components/Toast';
import { FIND_GUIDE_DETAIL } from '@/constants/queyKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePostCommentProps {
  userId: string;
  guidePostId: string;
  comment: string;
}

const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, guidePostId, comment }: UsePostCommentProps) =>
      postComment(userId, guidePostId, comment),
    onSuccess: (_, { guidePostId }) => {
      ShowToast('댓글이 등록되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: [FIND_GUIDE_DETAIL, guidePostId] });
    },
    onError: () => {
      ShowToast('댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default usePostComment;
