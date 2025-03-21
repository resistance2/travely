import { isValidRatingNumber } from '@/utils/validCheck';
import { css, SerializedStyles } from '@emotion/react';
import { Star } from 'lucide-react';

type Size = 'small' | 'medium' | 'large';

interface IRatingProps {
  rating: number;
  reviewCount?: number;
  customStyle?: SerializedStyles;
  size?: Size;
}

const sizeMap = {
  small: {
    Star: 17,
    fontSize: 12,
    spanFontSize: 10,
  },
  medium: {
    Star: 20,
    fontSize: 14,
    spanFontSize: 12,
  },
  large: {
    Star: 24,
    fontSize: 20,
    spanFontSize: 15,
  },
};

function Rating({ rating, reviewCount, customStyle, size = 'small' }: IRatingProps) {
  return (
    <div css={[ratingWrap(size), customStyle]}>
      <Star size={sizeMap[size].Star} fill="#FFBF00" stroke="#FFBF00" />
      <p className="score">
        {isValidRatingNumber(rating) ? rating.toPrecision(2) : 0}
        {reviewCount ? `(${reviewCount})` : ''}
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
    transform: translateY(0.04vh);
    span {
      margin-left: 4px;
      font-size: ${sizeMap[size].spanFontSize}px;
      color: #666;
    }
  }
`;
