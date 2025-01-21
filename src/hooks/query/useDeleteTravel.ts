import deleteTravel from '@/api/manageTravel/deleteTravel';
import { ShowToast } from '@/components/Toast';
import { MY_CREATED_TRAVEL } from '@/constants/queryKey';
import { useTabStore } from '@/stores/useTabStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteTravel = () => {
  const navigate = useNavigate();
  const setSelectedTab = useTabStore((state) => state.setSelectedTab);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ travelId }: { travelId: string }) => deleteTravel(travelId),

    onSuccess: () => {
      ShowToast('내 여행이 삭제되었습니다.', 'success');
      navigate('/my-page/my-created-travel');
      setSelectedTab('내가 만든 여행');
      queryClient.invalidateQueries({ queryKey: [MY_CREATED_TRAVEL] });
    },

    onError: () => {
      ShowToast('여행 삭제 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.', 'failed');
    },
  });
};

export default useDeleteTravel;
