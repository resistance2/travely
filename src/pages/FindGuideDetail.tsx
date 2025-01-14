import useGetFindGuideDetail from '@/hooks/query/useGetFindGuideDetail';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import Title from '@/components/detail/Title';
import Thumbnail from '@/components/detail/Thumbnail';
import Introduction from '@/components/detail/Introduction';
import CommentContainer from '@/components/findGuideDetail/CommentContainer';
import SideBar from '@/components/findGuideDetail/SideBar';

const FindGuideDetail = () => {
  const { guidePostId } = useParams();
  const { data: findGuideData } = useGetFindGuideDetail(guidePostId as string);

  if (!findGuideData) return null;

  const { title, createdAt, thumbnail, content, team, author } = findGuideData;

  return (
    <div css={container}>
      <div css={detailWrapper}>
        <Title title={title} createdAt={createdAt} />
        {thumbnail && <Thumbnail thumbnail={thumbnail} />}
        <Introduction content={content} />
        {guidePostId && <CommentContainer guidePostId={guidePostId} />}
      </div>
      <SideBar team={team} author={author} />
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
  gap: 20px;
  color: #333;
`;
