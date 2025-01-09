import useUserStore from '@/stores/useUserStore';
import FiledBtn from '../FiledBtn';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import { useState } from 'react';
import usePostComment from '@/hooks/query/usePostComment';
import { useParams } from 'react-router-dom';
import { ShowToast } from '../Toast';

interface WritingCommentProps {
  isEdit?: boolean;
}

const WritingComment = ({ isEdit = false }: WritingCommentProps) => {
  const [comment, setComment] = useState('');
  const { guidePostId } = useParams();
  const user = useUserStore((state) => state.user);
  const { mutate } = usePostComment();
  if (!user || !guidePostId) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === '') {
      ShowToast('댓글을 입력해주세요', 'failed');
      return;
    }

    mutate(
      { userId: user.userId, guidePostId, comment },
      {
        onSuccess: () => {
          setComment('');
        },
      },
    );
  };

  return (
    <form css={container} onSubmit={handleSubmit}>
      <p>{user.socialName}</p>
      <div css={fieldWrapper}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <FiledBtn color={theme.colors.primary} size="sm" type="submit">
          {isEdit ? '수정' : '등록'}
        </FiledBtn>
      </div>
    </form>
  );
};

export default WritingComment;

const container = css`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
`;

const fieldWrapper = css`
  display: flex;
  justify-content: space-between;
  input {
    width: 100%;
  }
`;
