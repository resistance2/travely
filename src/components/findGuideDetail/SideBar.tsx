import { css } from '@emotion/react';
import SideTravelTeam from '../detail/SideTravelTeam';
import { Author, DetailTeam } from '@/types/guideFindDataType';
import GuideProfile from '../GuideProfile';

interface SideBarProps {
  team: DetailTeam[];
  author: Author;
}

const SideBar = ({ team, author }: SideBarProps) => {
  return (
    <aside css={sideContainer}>
      <SideTravelTeam teams={team} />
      <div css={guideWrapper}>
        <GuideProfile
          name={author.socialName}
          userEmailId={author.userEmail}
          rating={author.userScore}
          imgURL={author.userProfileImage}
        />
      </div>
    </aside>
  );
};

export default SideBar;

const sideContainer = css`
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 82px;
`;

const guideWrapper = css`
  padding: 20px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
`;
