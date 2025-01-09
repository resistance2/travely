import useUserStore from '@/stores/useUserStore';
import Profile from '../Profile';
import { Comment } from '@/types/guideFindDataType';
import { css } from '@emotion/react';
import { Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/format';

interface CommentListProps {
  commentListData: Comment[];
}

const CommentList = ({ commentListData: data }: CommentListProps) => {
  const commentList = [...data].reverse();
  return (
    <div css={listContainer}>
      {commentList.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

const CommentItem = ({ comment: data }: { comment: Comment }) => {
  const user = useUserStore((state) => state.user?.userId);
  const isWriter = data.userId === user;
  return (
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
          <button>
            <Trash2 stroke="#888" size="22" />
          </button>
        )}
      </div>
      <p css={commentWrapper}>{data.comment}</p>
    </div>
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

const commentWrapper = css`
  padding-left: 52px;
`;
