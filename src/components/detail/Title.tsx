import { css } from '@emotion/react';
import Rating from '../Rating';

interface TitleProps {
  title: string;
  rating?: number;
  reviewCount?: number;
}

const Title = ({ title, rating, reviewCount }: TitleProps) => {
  return (
    <div css={titleWrapper}>
      <h1>{title}</h1>
      {rating && !Number.isNaN(reviewCount) && (
        <Rating size="large" rating={rating} reviewCount={reviewCount} />
      )}
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
