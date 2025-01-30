import patchTravel, { TravelPatchRequestData } from '@/api/travelDetail/patchTravel';
import { ShowToast } from '@/components/Toast';
import { TRAVEL_DETAIL } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchTravel = (travelId: string, travelData: TravelPatchRequestData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchTravel(travelId, travelData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRAVEL_DETAIL, travelId] });
      ShowToast('여행 정보를 수정하었습니다.', 'success');
    },
    onError: () => {
      ShowToast('여행 정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default usePatchTravel;
