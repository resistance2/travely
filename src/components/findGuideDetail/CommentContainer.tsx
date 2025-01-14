import Pagination from '@mui/material/Pagination';
import CommentList from './CommentList';
import WritingComment from './WritingComment';
import { css } from '@emotion/react';
import useGetCommentList from '@/hooks/query/useGetCommentList';
import { useState } from 'react';

interface CommentContainerProps {
  guidePostId: string;
}

const CommentContainer = ({ guidePostId }: CommentContainerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: commentData, refetch } = useGetCommentList(guidePostId as string, currentPage);

  const handlePage = async (_: React.ChangeEvent<unknown>, page: number) => {
    await setCurrentPage(page);
    refetch();
  };

  return (
    <div css={container}>
      <h2>댓글</h2>
      <WritingComment guidePostId={guidePostId} />
      <div css={listWrapper}>
        {commentData?.pageInfo && commentData?.commentList ? (
          <>
            <CommentList commentListData={commentData.commentList} guidePostId={guidePostId} />
            <Pagination
              count={commentData.pageInfo.totalPages || 0}
              page={currentPage}
              onChange={handlePage}
              color="primary"
              showFirstButton
              showLastButton
            />
          </>
        ) : (
          <p css={noList}>등록된 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CommentContainer;

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;

const listWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const noList = css`
  margin: 26px auto;
  color: #888;
  font-size: 16px;
  font-weight: 600;
`;
