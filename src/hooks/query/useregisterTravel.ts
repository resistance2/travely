import registerTravel from '@/api/travelDetail/registerTravel';
import { ShowToast } from '@/components/Toast';
import { MY_JOINED_TRAVEL, TRAVEL_LIST } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useRegisterTravel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRAVEL_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [MY_JOINED_TRAVEL],
      });
      ShowToast('여행 신청 성공', 'success');
      navigate('/my-page/my-travel-list');
    },
    onError: () => {
      ShowToast('여행 팀이 신청이 마감되었거나 이미 신청이 완료된 여행입니다.', 'failed');
    },
  });
};

export default useRegisterTravel;
