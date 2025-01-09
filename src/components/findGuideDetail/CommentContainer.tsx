import CommentList from './CommentList';
import WritingComment from './WritingComment';
import { Comment } from '@/types/guideFindDataType';
import { css } from '@emotion/react';

interface CommentContainerProps {
  commentListData: Comment[];
}

const CommentContainer = ({ commentListData }: CommentContainerProps) => {
  return (
    <div css={container}>
      <h2>댓글</h2>
      <WritingComment />
      <CommentList commentListData={commentListData} />
    </div>
  );
};

export default CommentContainer;

const container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;
