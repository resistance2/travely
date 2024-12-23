import Rating from '@/components/Rating';
import { textEllipsis } from '@/styles/GlobalStyles';
import { dateToString } from '@/utils/dataToString';
import { css } from '@emotion/react';
import React from 'react';

// TODO 리뷰 타입 수정 필요, 공통 리뷰 타입 설정 필요
interface Review {
  id: string;
  title: string;
  createdAt: Date;
  rating: number;
  profileImage: string;
  imgSrcs: string[];
  content: string;
}

const MyTravelReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div key={review.id} css={reviewCardStyle}>
      <div css={userInfoStyle}>
        <img className="profile-image" src={review.profileImage} alt="User profile" />
        <div className="details">
          <span className="username">{review.title}</span>
          <div className="metadata">
            <span>{dateToString(review.createdAt)}</span>
            <Rating rating={review.rating} />
          </div>
        </div>
      </div>
      <div css={imageGridStyle}>
        {review.imgSrcs.slice(0, 4).map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Review image ${index + 1}`} />
        ))}
      </div>
      <p className="content" css={textEllipsis(3)}>
        {review.content}
      </p>
    </div>
  );
};

export default MyTravelReviewCard;

const reviewCardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .content {
    font-size: 14px;
    color: #333;
  }
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;

  .profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .username {
    font-size: 14px;
    font-weight: 500;
    color: #444;
  }

  .metadata {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
  }
`;

const imageGridStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  img {
    width: 140px;
    height: 160px;
    object-fit: cover;
    border-radius: 4px;
  }
`;
