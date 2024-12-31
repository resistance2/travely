import updateBookmark from '@/api/travelDetail/updateBookmark';
import { TRAVEL_DETAIL } from '@/constants/queyKey';
import { QueryClient, useMutation } from '@tanstack/react-query';

interface MutationProps {
  userId: string;
  travelId: string;
  isBookmark: boolean;
}

const useUpdateBookmark = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ userId, travelId, isBookmark }: MutationProps) =>
      updateBookmark(userId, travelId, isBookmark),
    onSuccess: (_, variables) => {
      const travelId = variables.travelId;
      queryClient.invalidateQueries({ queryKey: [TRAVEL_DETAIL, travelId] });
    },
  });
};

export default useUpdateBookmark;
