import { css } from '@emotion/react';

interface ThumbnailProps {
  thumbnail: string;
  tag: string[];
}

const Thumbnail = ({ thumbnail, tag }: ThumbnailProps) => {
  return (
    <div css={thumbnailWrapper}>
      <img src={thumbnail} alt="thumbnail" />
      <div>
        {tag.map((t) => (
          <p key={t}>#{t}</p>
        ))}
      </div>
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
