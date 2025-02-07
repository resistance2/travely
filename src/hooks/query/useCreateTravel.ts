import createTravel from '@/api/addTravel/createTravel';
import { ShowToast } from '@/components/Toast';
import { TRAVEL_LIST } from '@/constants/queryKey';
import useResetAddTravel from '@/hooks/custom/useResetAddTravel';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateTravel = () => {
  const navigate = useNavigate();
  const resetAddTravel = useResetAddTravel().resetAddTravel;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTravel,
    onSuccess: (data) => {
      if (data) {
        ShowToast('글 작성 완료', 'success');
        resetAddTravel();
        queryClient.invalidateQueries({ queryKey: [TRAVEL_LIST] });
        navigate('/travel-list');
      }
    },
    onError: () => {
      ShowToast('글 작성에 실패했습니다.', 'failed');
    },
  });
};

export default useCreateTravel;
