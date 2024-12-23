import { css } from '@emotion/react';
import Rating from '@/components/Rating';
import defaultProfile from '@/assets/defaultProfile.jpg';

export interface UserProfileProps {
  name: string;
  userEmailId?: string;
  rating?: string;
  imgURL?: string;
  hideRating?: boolean;
  hideUserId?: boolean;
}

//!TODO 리뷰 숫자가 없을 때 에러처리 넣기
const UserProfile = ({
  name,
  userEmailId,
  rating,
  imgURL,
  hideRating = false,
  hideUserId = false,
}: UserProfileProps) => {
  return (
    <div css={userProfileStyles}>
      <div className="profile-container">
        <img src={imgURL || defaultProfile} alt="Profile" />
        <div className="user-info">
          <div className="name-rating">
            <div className="name">{name}</div>
            {!hideRating && <Rating rating={Number(rating) || -1} />}
          </div>
          {!hideUserId && <span className="kakao">kakao:{userEmailId}</span>}
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
