import useUserStore from '@/stores/useUserStore';
import Profile from '../Profile';
import { Comment } from '@/types/guideFindDataType';
import { css } from '@emotion/react';
import { PencilLine, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/format';
import { useRef, useState } from 'react';
import WritingComment from './WritingComment';
import useDeleteComment from '@/hooks/query/useDeleteComment';
import ConfirmModal from '../ConfirmModal';
import useModalStore from '@/stores/useModalStore';
import { modalId } from '@/constants/modalId';

interface CommentListProps {
  guidePostId: string;
  commentListData: Comment[];
}

const CommentList = ({ guidePostId, commentListData: data }: CommentListProps) => {
  return (
    <div css={listContainer}>
      {data.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} guidePostId={guidePostId} />
      ))}
    </div>
  );
};

const CommentItem = ({ comment: data, guidePostId }: { comment: Comment; guidePostId: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const user = useUserStore((state) => state.user?.userId);
  const setModalName = useModalStore((state) => state.setModalName);
  const { mutate } = useDeleteComment(guidePostId);

  const handleEditComment = (id: string) => {
    if (data.commentId === id) {
      setIsEdit(true);
    }
  };

  const handleDeleteComment = (id: string) => {
    if (user && data.commentId === id) {
      mutate(
        { commentId: id },
        {
          onSuccess: () => {
            setModalName(null);
          },
        },
      );
    }
  };

  const isWriter = data.userId === user;

  return (
    <>
      {isEdit ? (
        <WritingComment
          isEdit={isEdit}
          guidePostId={guidePostId}
          commentId={data.commentId}
          oldComment={data.comment}
          onEditChange={() => setIsEdit(false)}
        />
      ) : (
        <div css={itemContainer}>
          <div css={commentHeader}>
            <div css={userWrapper}>
              <Profile url={data.userProfileImage} size="37px" />
              <div>
                <p>{data.socialName}</p>
                <span>{formatDate(data.updatedAt)}</span>
              </div>
            </div>
            {isWriter && (
              <div css={editWrapper}>
                <button
                  onClick={() => handleEditComment(data.commentId)}
                  type="button"
                  aria-label="댓글 수정"
                >
                  <PencilLine stroke="#888" size="20" />
                </button>
                <ConfirmModal
                  modalId={`${modalId.findGuide.commentDelete}-${data.commentId}`}
                  message="정말 삭제하시겠습니까?"
                  onConfirm={() => handleDeleteComment(data.commentId)}
                  trigger={
                    <button
                      onClick={() =>
                        setModalName(`${modalId.findGuide.commentDelete}-${data.commentId}`)
                      }
                      type="button"
                      aria-label="댓글 삭제"
                      ref={deleteButtonRef}
                    >
                      <Trash2 stroke="#888" size="20" />
                    </button>
                  }
                />
              </div>
            )}
          </div>
          <p css={commentWrapper}>{data.comment}</p>
        </div>
      )}
    </>
  );
};

export default CommentList;

const listContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
`;

const itemContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const commentHeader = css`
  display: flex;
  justify-content: space-between;
`;

const userWrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;
  div {
    width: 100%;
    span {
      font-size: 14px;
      color: #888;
    }
  }
`;

const editWrapper = css`
  display: flex;
  gap: 12px;
  button {
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const commentWrapper = css`
  padding-left: 52px;
`;
