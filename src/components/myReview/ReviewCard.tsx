import DeleteIcon from '@/components/DeleteIcon';
import { textEllipsis } from '@/styles/GlobalStyles';
import { Review } from '@/types/reviewType';

import { css } from '@emotion/react';
import Rating from '@/components/Rating';
import Profile from '../Profile';
import { formatDate } from '@/utils/format';

interface ReviewCardProps {
  review: Review;
  onDelete?: () => void;
  showTitle: boolean;
  showUser: boolean;
  showDate: boolean;
  showDelete: boolean;
}

const ReviewCard = ({
  review,
  onDelete,
  showTitle,
  showUser,
  showDate,
  showDelete,
}: ReviewCardProps) => {
  return (
    <div css={reviewStyle}>
      <div className="titleStyle">
        <div className="titleText">
          {showUser && review.user && (
            <div css={userProfileStyles}>
              <div className="profile-container">
                <Profile url={review.user.userProfileImage} size="30px" />
                <div className="user-info">
                  <div className="name-rating">
                    <div className="name">{review.user.socialName}</div>
                  </div>
                  <p className="createAt">
                    {review?.createdAt ? formatDate(review.createdAt) : ''}
                  </p>
                </div>
              </div>
            </div>
          )}
          {showTitle && review?.title && <h2>{review.title}</h2>}
          {showDate && (
            <p className="createAt">{review?.createdAt ? formatDate(review.createdAt) : ''}</p>
          )}
          <div className="ratingContainer">
            <Rating rating={Number(review.rating)} />
          </div>
        </div>
        {showDelete && <DeleteIcon onDelete={onDelete || (() => {})} />}
      </div>
      <div className="imgContainer">
        <img src={review.imgSrc} alt="review" />
      </div>
      <p css={textEllipsis(3)}>{review.content}</p>
    </div>
  );
};

export default ReviewCard;

const userProfileStyles = css`
  .profile-container {
    display: flex;
    align-items: center;
    transform: translateY(3.5px);
  }

  .user-info {
    display: flex;
    flex-direction: column;

    .name-rating {
      display: flex;
      align-items: center;
    }

    .name {
      font-weight: 500;
      margin-right: 8px;
      font-size: 15px;
    }

    .kakao {
      font-size: 14px;
      color: #6b7280;
      margin-top: 4px;
    }
  }
`;

const reviewStyle = css`
  border-radius: 10px;
  width: 100%;
  background-color: #f8f8f8;
  padding: 10px 15px 15px 15px;
  margin-bottom: 20px;

  .titleStyle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

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
    transform: translateY(-0.8px);
  }

  .createAt {
    font-size: 13px;
    color: #666;
    transform: translateY(-3px);
  }
`;
