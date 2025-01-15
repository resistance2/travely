import updateBookmark from '@/api/travelDetail/updateBookmark';
import { ShowToast } from '@/components/Toast';
import { TRAVEL_DETAIL } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationProps {
  userId: string;
  travelId: string;
  isBookmark: boolean;
}

const useUpdateBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, travelId, isBookmark }: MutationProps) =>
      updateBookmark(userId, travelId, isBookmark),
    onSuccess: (_, { travelId, isBookmark }) => {
      ShowToast(isBookmark ? '북마크 되었습니다.' : '북마크가 해제되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: [TRAVEL_DETAIL, travelId] });
    },
    onError: () => {
      ShowToast('북마크 업데이트가 실패되었습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default useUpdateBookmark;
