import { css } from '@emotion/react';
import Rating from '../Rating';
import { formatDate } from '@/utils/format';

interface TitleProps {
  title: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
}

const Title = ({ title, rating, reviewCount, createdAt }: TitleProps) => {
  return (
    <div css={titleWrapper}>
      <h1>{title}</h1>
      <div css={optionsWrapper}>
        <div>
          {rating || rating === 0 ? (
            <Rating size="large" rating={rating} reviewCount={reviewCount} />
          ) : null}
        </div>
        {createdAt && <span>게시일: {formatDate(createdAt)}</span>}
      </div>
    </div>
  );
};

export default Title;

const titleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
`;

const optionsWrapper = css`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    color: #888;
  }
`;
