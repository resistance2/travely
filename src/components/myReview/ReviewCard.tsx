import DeleteIcon from '@/components/DeleteIcon';
import Rating from '@/components/Rating';
import UserProfile from '@/components/UserProfile';
import { textEllipsis } from '@/styles/GlobalStyles';
import { Review } from '@/types/reviewType';
import { dateToString } from '@/utils/dataToString';
import { css } from '@emotion/react';

interface ReviewCardProps {
  review: Review;
  showBackground?: boolean;
  showTitle?: boolean;
  showRating?: boolean;
  showDelete?: boolean;
  showProfile?: boolean;
  onDelete?: (id: string) => void;
}

const ReviewCard = ({
  review,
  showBackground = true,
  showRating = true,
  showTitle = true,
  showDelete = true,
  showProfile = true,
}: ReviewCardProps) => {
  return (
    <div css={reviewStyle(showBackground, showTitle)}>
      <div className="titleStyle">
        {showProfile && (
          <UserProfile
            name="김낙연"
            rating={review.rating}
            imgURL={review.imgSrc}
            showRating={true}
            showSocialName={false}
            showDate={false}
          />
        )}
        <div className="titleText">
          {showTitle && <h2>{review.title}</h2>}
          <p className="createAt">
            {review?.createdAt instanceof Date ? dateToString(review.createdAt) : ''}
          </p>
          <div className="ratingContaner">
            {showRating && review.rating && <Rating rating={review.rating} />}
          </div>
        </div>
        {showDelete && <DeleteIcon onDelete={() => console.log('delete')} />}
      </div>
      <div className="imgContainer">
        <img src={review.imgSrc} alt="review" />
      </div>
      <p css={textEllipsis(3)}>{review.content}</p>
    </div>
  );
};

export default ReviewCard;

const reviewStyle = (showBackground: boolean, showTitle: boolean) => css`
  border-radius: 10px;
  width: 800px;
  height: 290px;
  background-color: ${showBackground ? '#f8f8f8' : ''};
  padding: 10px 15px 15px 15px;
  margin-bottom: 20px;

  .titleStyle {
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    margin-top: ${showTitle ? '13px' : '0'};
    margin-bottom: 16px;
    border-radius: 5px;
    overflow: hidden;
  }
  img {
    width: 100%;
  }

  .ratingContaner {
    transform: translateY(-3px);
  }

  .createAt {
    font-size: 13px;
    color: #666;
    transform: translateY(-3px);
  }
`;
