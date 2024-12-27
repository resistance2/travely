import DeleteIcon from '@/components/DeleteIcon';
import { textEllipsis } from '@/styles/GlobalStyles';
import { Review } from '@/types/reviewType';
import { dateToString } from '@/utils/dataToString';

import { css } from '@emotion/react';
import Rating from '@/components/Rating';

interface ReviewCardProps {
  review: Review;
  onDelete?: (id: string) => void;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div css={reviewStyle}>
      <div className="titleStyle">
        <div className="titleText">
          <h2>{review.title}</h2>
          <p className="createAt">
            {review?.createdAt instanceof Date ? dateToString(review.createdAt) : ''}
          </p>
          <div className="ratingContainer">
            <Rating rating={Number(review.rating)} />
          </div>
        </div>
        <DeleteIcon onDelete={() => console.log('delete')} />
      </div>
      <div className="imgContainer">
        <img src={review.imgSrc} alt="review" />
      </div>
      <p css={textEllipsis(3)}>{review.content}</p>
    </div>
  );
};

export default ReviewCard;

const reviewStyle = css`
  border-radius: 10px;
  width: 800px;
  height: 290px;
  background-color: #f8f8f8;
  padding: 10px 15px 15px 15px;
  margin-bottom: 20px;

  .titleStyle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .titleText {
      display: flex;
      align-items: flex-end;
      gap: 9px;
    }
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  .imgContainer {
    display: flex;
    justify-content: center;
    width: 110px;
    height: 120px;
    margin-bottom: 16px;
    border-radius: 5px;
    overflow: hidden;
  }
  img {
    width: 100%;
  }

  .ratingContainer {
    transform: translateY(-3px);
  }

  .createAt {
    font-size: 13px;
    color: #666;
    transform: translateY(-3px);
  }
`;
