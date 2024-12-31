import { css } from '@emotion/react';

interface ThumbnailProps {
  thumbnail: string;
  tag: string[];
}

const Thumbnail = ({ thumbnail, tag }: ThumbnailProps) => {
  if (!thumbnail) return <div css={nodata}>썸네일을 불러오지 못했습니다. 다시 시도해주세요.</div>;
  return (
    <div css={thumbnailWrapper}>
      <img src={thumbnail} alt="thumbnail" />
      <div>{tag?.map((t) => <p key={t}>#{t}</p>)}</div>
    </div>
  );
};

export default Thumbnail;

const thumbnailWrapper = css`
  border-radius: 4px;
  overflow: hidden;
  img {
    width: 100%;
    height: 360px;
    object-fit: cover;
  }
  div {
    display: flex;
    gap: 10px;
    p {
      color: #888;
    }
  }
`;

const nodata = css`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  color: #888;
`;
