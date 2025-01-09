import SideTravelTeam from '@/components/detail/SideTravelTeam';
import useGetFindGuideDetail from '@/hooks/query/useGetFindGuideDetail';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import Title from '@/components/detail/Title';
import Thumbnail from '@/components/detail/Thumbnail';
import Introduction from '@/components/detail/Introduction';
import CommentContainer from '@/components/findGuideDetail/CommentContainer';

const FindGuideDetail = () => {
  const { guidePostId } = useParams();
  const { data: findGuideData } = useGetFindGuideDetail(guidePostId as string);

  if (!findGuideData) return null;

  const { title, createdAt, thumbnail, content, commentList, team } = findGuideData;

  return (
    <div css={container}>
      <div css={detailWrapper}>
        <Title title={title} createdAt={createdAt} />
        {thumbnail && <Thumbnail thumbnail={thumbnail} />}
        <Introduction content={content} />
        {commentList && <CommentContainer commentListData={commentList} />}
      </div>
      <div css={sideWrapper}>{team && <SideTravelTeam teams={team} />}</div>
    </div>
  );
};

export default FindGuideDetail;

const container = css`
  display: flex;
  justify-content: space-between;
`;

const detailWrapper = css`
  width: 680px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  gap: 20px;
  color: #333;
`;

const sideWrapper = css`
  width: 340px;
  margin-top: 82px;
`;
