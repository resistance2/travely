import { css } from '@emotion/react';
import { TravelData } from '@/types/travelDataType';
import { formatDate } from '@/utils/format';
import { theme } from '@/styles/theme';
import useUpdateTravelStatus from '@/hooks/query/useUpdateTravelStatus';
import ConfirmModal from '../ConfirmModal';
import useModalStore from '@/stores/useModalStore';
import { modalId } from '@/constants/modalId';
import BorderBtn from '../BorderBtn';

interface ManageHeaderProps {
  travelData: TravelData;
  isOngoingTab: boolean;
  setIsOngoingTab: (tab: boolean) => void;
}

const TravelManageHeader = ({ travelData, isOngoingTab, setIsOngoingTab }: ManageHeaderProps) => {
  const setModalName = useModalStore((state) => state.setModalName);
  const { mutate } = useUpdateTravelStatus();

  const isActive = travelData.travelActive;

  const handleActiveStatus = () => {
    mutate(
      { travelId: travelData.travelId, isActive: !isActive },
      {
        onSuccess: () => setModalName(null),
      },
    );
  };

  const handleDelete = () => {};

  return (
    <div>
      <div css={titleWrapper}>
        <h1>{travelData.travelTitle}</h1>
        <div css={btnWrapper}>
          <ConfirmModal
            modalId={modalId.my.manageActiveStatus}
            message={`정말 ${isActive ? '비활성화' : '활성화'} 하시겠습니까?`}
            onConfirm={handleActiveStatus}
            trigger={
              <BorderBtn
                color={travelData.travelActive ? '#ababab' : theme.colors.primary}
                onClick={() => setModalName(modalId.my.manageActiveStatus)}
              >
                {isActive ? '비활성화하기' : '활성화하기'}
              </BorderBtn>
            }
          />

          <ConfirmModal
            modalId={modalId.my.travelDelete}
            message="정말 삭제 하시겠습니까?"
            onConfirm={handleDelete}
            trigger={
              <BorderBtn
                color={theme.colors.red}
                size={'sm'}
                onClick={() => setModalName(modalId.my.travelDelete)}
              >
                삭제
              </BorderBtn>
            }
          />
        </div>
      </div>
      <div css={dateWrapper}>
        <p>게시일: {formatDate(travelData.createdAt)}</p>
        <p>마지막 업데이트: {formatDate(travelData.updateAt)}</p>
      </div>
      <div css={{ display: 'flex', marginBottom: '15px' }}>
        <button css={tab(isOngoingTab === true)} onClick={() => setIsOngoingTab(!isOngoingTab)}>
          진행중인 여행
        </button>
        <button css={tab(isOngoingTab === false)} onClick={() => setIsOngoingTab(!isOngoingTab)}>
          완료된 여행
        </button>
      </div>
    </div>
  );
};

export default TravelManageHeader;
const titleWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h1 {
    font-size: 24px;
  }
`;

const btnWrapper = css`
  display: flex;
  & * {
    margin-right: 10px;
  }
`;

const dateWrapper = css`
  display: flex;
  margin: 10px 0 40px;
  & p {
    margin-right: 10px;
    font-size: 14px;
    color: #888;
  }
`;
const tab = (tab: boolean) => css`
  margin: 0 10px;
  font-weight: 700;
  color: #888;
  ${tab &&
  `
    color: #2467E3;
  `}
`;
