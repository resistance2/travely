import { css, SerializedStyles } from '@emotion/react';
import { Star } from 'lucide-react';

type Size = 'small' | 'middle' | 'large';

interface IRatingProps {
  rating: number;
  reviewCount?: number;
  customStyle?: SerializedStyles;
  size?: Size;
}

const sizeMap = {
  small: {
    Star: 13,
    fontSize: 13,
    spanFontSize: 12,
  },
  middle: {
    Star: 17,
    fontSize: 17,
    spanFontSize: 15,
  },
  large: {
    Star: 18,
    fontSize: 18,
    spanFontSize: 16,
  },
};

function Rating({ rating, reviewCount, customStyle, size = 'small' }: IRatingProps) {
  return (
    <div css={[ratingWrap(size), customStyle]}>
      <Star size={sizeMap[size].Star} fill="#FFBF00" stroke="#FFBF00" />
      <p className="score">
        {rating.toPrecision(2)}
        {reviewCount && <span>({reviewCount})</span>}
      </p>
    </div>
  );
}

export default Rating;

const ratingWrap = (size: Size) => css`
  display: flex;
  align-items: center;
  svg {
    margin-top: -2px;
  }
  .score {
    font-size: ${sizeMap[size].fontSize}px;
    margin-left: 3px;
    span {
      margin-left: 4px;
      font-size: ${sizeMap[size].spanFontSize}px;
      color: #666;
    }
  }
`;
