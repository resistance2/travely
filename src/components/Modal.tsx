import { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import styled from '@emotion/styled';
import { visuallyHidden } from '@/styles/GlobalStyles';
import useModalStore from '@/stores/useModalStore';

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onClose?: () => void;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ trigger, title, children, description, open, setOpen }) => {
  const closeModal = useModalStore((state) => state.setModalName);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title css={visuallyHidden}>{title}</Title>
          {children}
          <Dialog.Close asChild>
            <CloseButton onClick={() => closeModal(null)}>
              <X size={27} />
            </CloseButton>
          </Dialog.Close>
          <Dialog.Description css={visuallyHidden}>{description && ''}</Dialog.Description>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

const CloseButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => <StyledCloseButton ref={ref} {...props} />,
);

const StyledCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled(Dialog.Title)`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Overlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`;

const Content = styled(Dialog.Content)`
  background: white;
  border-radius: 4px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 450px;
  padding: 30px;
`;
