import patchUserStatus from '@/api/manageTravel/patchUserStatus';
import { ShowToast } from '@/components/Toast';
import { MANAGE_TRAVEL_TEAMS } from '@/constants/queyKey';
import useModalStore from '@/stores/useModalStore';
import { TravelTeamData } from '@/types/travelDataType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePatchUserStatusProps {
  userId: string;
  status: string;
}

const usePatchUserStatus = (teamId: string, page: number, userName: string) => {
  const setModalName = useModalStore((state) => state.setModalName);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, status }: UsePatchUserStatusProps) =>
      patchUserStatus(teamId, userId, status),
    onMutate: ({ userId, status }) => {
      const prevData: TravelTeamData | undefined = queryClient.getQueryData([
        MANAGE_TRAVEL_TEAMS,
        page,
        teamId,
      ]);
      queryClient.setQueryData([MANAGE_TRAVEL_TEAMS, page, teamId], (oldData: TravelTeamData) => ({
        ...oldData,
        appliedUsers: prevData?.appliedUsers?.map((user) =>
          user.userId === userId ? { ...user, status } : user,
        ),
      }));
      return { prevData };
    },
    onSuccess: (_, { status }) => {
      setModalName(null);
      ShowToast(`${userName}님이 ${status === 'approved' ? '승인' : '거절'}되었습니다.`, 'success');
    },
    onError: (_err, _, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([MANAGE_TRAVEL_TEAMS, page, teamId], context.prevData);
      }
      setModalName(null);
      ShowToast('상태 변경이 실패되었습니다. 다시 시도해주세요', 'failed');
    },
  });
};

export default usePatchUserStatus;
