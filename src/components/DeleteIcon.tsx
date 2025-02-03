import { Trash2 } from 'lucide-react';
import styled from '@emotion/styled';

const DeleteButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const StyledTrash2 = styled(Trash2)`
  width: 20px;
  height: 20px;
  color: #b8bbbe;

  &:hover {
    color: #f04747;
  }
`;

interface DeleteIconProps {
  onClick: () => void;
}

const DeleteIcon = ({ onClick: onDelete }: DeleteIconProps) => {
  return (
    <DeleteButton onClick={onDelete} aria-label="삭제">
      <StyledTrash2 />
    </DeleteButton>
  );
};

export default DeleteIcon;
