import ConfirmModal from '../ConfirmModal';
import FiledBtn from '../FiledBtn';
import useModalStore from '@/stores/useModalStore';
import usePatchUserStatus from '@/hooks/query/usePatchUserStatus';
import { modalId } from '@/constants/modalId';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import usePageStore from '@/stores/usePageStore';

interface UserStatusWaitingProps {
  teamId: string;
  userId: string;
  userName: string;
  hasAccount: boolean;
}

const UserStatusWaiting = ({ teamId, userId, userName, hasAccount }: UserStatusWaitingProps) => {
  const pageContainer = usePageStore((state) => state.pageContainer);
  const currentPage = pageContainer.find((page) => page.paginationId === teamId)?.currentPage || 1;
  const navigate = useNavigate();
  const setModalName = useModalStore((state) => state.setModalName);
  const { mutate } = usePatchUserStatus(teamId, currentPage, userName);

  const handleApproveConfirm = () => {
    if (!hasAccount) {
      setModalName(null);
      navigate('/my-page/my-account');
    } else {
      handleUserStatus(userId, 'approved');
    }
  };

  const handleUserStatus = (userId: string, newStatus: string) => {
    mutate({ userId: userId, status: newStatus });
  };

  return (
    <div css={{ display: 'flex', gap: '5px' }}>
      <ConfirmModal
        modalId={`${modalId.my.manageUserStatusApprove}-${userId}`}
        message={
          hasAccount ? (
            `정말 ${userName}님을 승인 하시겠습니까?`
          ) : (
            <>
              <p>등록된 계좌가 없습니다. </p>
              <p>마이페이지에서 등록하시겠습니까?</p>
            </>
          )
        }
        onConfirm={handleApproveConfirm}
        trigger={
          <FiledBtn
            onClick={() => setModalName(`${modalId.my.manageUserStatusApprove}-${userId}`)}
            color={theme.colors.primary}
            size={'sm'}
          >
            승인
          </FiledBtn>
        }
      />

      <ConfirmModal
        modalId={`${modalId.my.manageUserStatusReject}-${userId}`}
        message={`정말 ${userName}님을 거절 하시겠습니까?`}
        onConfirm={() => handleUserStatus(userId, 'rejected')}
        trigger={
          <FiledBtn
            onClick={() => setModalName(`${modalId.my.manageUserStatusReject}-${userId}`)}
            color={'#d7d7d7'}
            size="sm"
          >
            거절
          </FiledBtn>
        }
      />
    </div>
  );
};

export default UserStatusWaiting;
