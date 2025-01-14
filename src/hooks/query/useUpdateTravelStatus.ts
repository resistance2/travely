import updateTravelActiveStatus from '@/api/myCreatedTravel/updateTravelActiveStatus';
import { MANAGE_TRAVEL, MY_CREATED_TRAVEL } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateTravelStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ travelId, isActive }: { travelId: string; isActive: boolean }) =>
      updateTravelActiveStatus(travelId, isActive),
    onSuccess: (_, variable) => {
      const travelId = variable.travelId;
      queryClient.invalidateQueries({ queryKey: [MY_CREATED_TRAVEL] });
      queryClient.invalidateQueries({ queryKey: [MANAGE_TRAVEL, travelId] });
    },
  });
};

export default useUpdateTravelStatus;
