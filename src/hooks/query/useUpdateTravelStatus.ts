import updateTravelActiveStatus from '@/api/myCreatedTravel/updateTravelActiveStatus';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateTravelStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ travelId, isActive }: { travelId: string; isActive: boolean }) =>
      updateTravelActiveStatus(travelId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-travel-created'] });
    },
  });
};

export default useUpdateTravelStatus;
