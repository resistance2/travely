import { css } from '@emotion/react';
import Rating from '@/components/Rating';
import defaultProfile from '@/assets/defaultProfile.jpg';

export interface UserProfileProps {
  name: string;
  userEmailId?: string;
  rating?: number;
  imgURL?: string;
  showDate: boolean;
  showSocialName: boolean;
}

const UserProfile = ({
  name,
  userEmailId,
  rating,
  imgURL,
  showSocialName,
  showDate,
}: UserProfileProps) => {
  console.log(rating);
  return (
    <div css={userProfileStyles}>
      <div className="profile-container">
        <img src={imgURL || defaultProfile} alt="Profile" />
        <div className="user-info">
          <div className="name-rating">
            <div className="name">{name}</div>
            {rating && <Rating rating={rating} />}
          </div>
          {showDate && <span>2021.09.01</span>}
          {showSocialName && <span className="kakao">kakao:{userEmailId}</span>}
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

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
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

export default UserProfile;
