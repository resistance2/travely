import { css } from '@emotion/react';
import Rating from '@/components/Rating';
import Profile from './Profile';

export interface UserProfileProps {
  name: string;
  userEmailId?: string;
  rating?: number;
  imgURL?: string;
}

const GuideProfile = ({ name, userEmailId, rating, imgURL }: UserProfileProps) => {
  return (
    <div css={userProfileStyles}>
      <div className="profile-container">
        {<Profile url={imgURL ? imgURL : null} size="40px" />}
        <div className="user-info">
          <div className="name-rating">
            <div className="name">{name}</div>
            {rating === 0 || rating ? <Rating rating={rating} /> : null}
          </div>
          <span className="email">email:{userEmailId}</span>
        </div>
      </div>
    </div>
  );
};

const userProfileStyles = css`
  .profile-container {
    display: flex;
    align-items: center;
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

    .email {
      font-size: 14px;
      color: #6b7280;
      margin-top: 4px;
    }
  }
`;

export default GuideProfile;
