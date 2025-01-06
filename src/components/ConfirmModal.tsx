import { css } from '@emotion/react';
import useModalStore from '@/stores/useModalStore';
import FiledBtn from './FiledBtn';
import Modal from './Modal';
import { theme } from '@/styles/theme';

interface ConfirmModalProps {
  modalId: string;
  trigger: React.ReactNode;
  message: string;
  onConfirm?: () => void;
}

const ConfirmModal = ({ modalId, trigger, message, onConfirm }: ConfirmModalProps) => {
  const modalName = useModalStore((state) => state.modalName);
  const closeModal = useModalStore((state) => state.setModalName);
  const isModalOpen = modalName === modalId;

  return (
    <Modal open={isModalOpen} trigger={trigger}>
      <div css={wrapper}>
        <p>{message}</p>
        <div css={{ display: 'flex', gap: '20px' }}>
          <FiledBtn color={theme.colors.primary} size={'mdHeight'} onClick={onConfirm}>
            예
          </FiledBtn>
          <FiledBtn color={'#d7d7d7'} size={'mdHeight'} onClick={() => closeModal(null)}>
            아니오
          </FiledBtn>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  gap: 30px;
  p {
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }
`;
