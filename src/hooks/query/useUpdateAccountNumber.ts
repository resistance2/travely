import updateAccountNumber from '@/api/myAccount/updateAccountNumber';
import { ShowToast } from '@/components/Toast';
import useUserStore from '@/stores/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateAccountNumber = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore((state) => state);

  return useMutation({
    mutationFn: ({
      userId,
      accountNumber,
      bankCode,
    }: {
      userId: string;
      accountNumber: string;
      bankCode: string;
    }) => updateAccountNumber(userId, accountNumber, bankCode),
    onSuccess: (_, variable) => {
      const userId = variable.userId;
      queryClient.invalidateQueries({ queryKey: ['myAccount', userId] });
      setUser((prevUser) => {
        if (!prevUser) return null;
        const updatedUser = {
          ...prevUser,
          accountNumber: variable.accountNumber,
          bankCode: variable.bankCode,
        };
        return updatedUser;
      });
      ShowToast('계좌정보가 수정되었습니다.', 'success');
    },
    onError: () => {
      ShowToast('계좌정보 수정에 실패했습니다.', 'failed');
    },
  });
};

export default useUpdateAccountNumber;
