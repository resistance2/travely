import useUserStore from '@/stores/useUserStore';
import FiledBtn from '../FiledBtn';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import usePostComment from '@/hooks/query/usePostComment';
import { ShowToast } from '../Toast';
import { ChevronLast } from 'lucide-react';
import usePatchComment from '@/hooks/query/usePatchComment';

interface WritingCommentProps {
  isEdit?: boolean;
  guidePostId: string;
  commentId?: string;
  oldComment?: string;
  onEditChange?: () => void;
}

const WritingComment = ({
  isEdit = false,
  guidePostId,
  commentId,
  oldComment,
  onEditChange,
}: WritingCommentProps) => {
  const [comment, setComment] = useState('');
  const user = useUserStore((state) => state.user);
  const { mutate: postMutate } = usePostComment();
  const { mutate: patchMutate } = usePatchComment(guidePostId);

  useEffect(() => {
    if (isEdit && oldComment) {
      setComment(oldComment);
    }
  }, [isEdit, oldComment]);

  if (!user) return <p css={undefinedUser}>댓글 등록은 로그인 후 가능합니다.</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === '') {
      ShowToast('댓글을 입력해주세요', 'failed');
      return;
    }
    if (isEdit && commentId && onEditChange) {
      patchMutate(
        { userId: user.userId, commentId, comment },
        {
          onSuccess: () => {
            onEditChange();
          },
        },
      );
    } else {
      postMutate(
        { userId: user.userId, guidePostId, comment },
        {
          onSuccess: () => {
            setComment('');
          },
        },
      );
    }
  };

  return (
    <form css={container} onSubmit={handleSubmit}>
      <div css={fieldHeader}>
        <p>{user.socialName}</p>
        {isEdit && (
          <button onClick={onEditChange} type="button">
            <ChevronLast stroke="#888" size="20" />
          </button>
        )}
      </div>
      <div css={fieldWrapper}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
          aria-label="댓글 입력"
        />
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

const fieldHeader = css`
  display: flex;
  justify-content: space-between;
  button {
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const fieldWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  input {
    width: 100%;
  }
`;

const undefinedUser = css`
  margin: 26px auto;
  color: #888;
  font-size: 16px;
  font-weight: 600;
`;
