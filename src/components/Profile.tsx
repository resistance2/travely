import { css } from '@emotion/react';
import basicProfile from '@/assets/basicProfile.png';
interface UserProfileProps {
  url: string | null;
  size: string;
}

const Profile = ({ url, size }: UserProfileProps) => {
  return <img src={url || basicProfile} css={wrapper(size)} alt="Profile" />;
};

export default Profile;

const wrapper = (size: string) => css`
  width: ${size};
  height: ${size};
  border-radius: 50%;
  margin-right: 10px;
`;
