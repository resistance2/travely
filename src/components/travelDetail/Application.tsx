import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Bookmark } from 'lucide-react';
import GuideProfile from '@/components/GuideProfile';
import { GuideData, TravelTeamData } from '@/types/travelDataType';
import FiledBtn from '../FiledBtn';
import { formatDate } from '@/utils/format';
import useUpdateBookmark from '@/hooks/query/useUpdateBookmark';

interface ApplicationProps {
  travelId: string;
  price: number;
  bookmark: number;
  isBookmark: boolean;
  teams: Pick<TravelTeamData, 'teamId' | 'travelStartDate' | 'travelEndDate'>[];
  guide: GuideData;
}

const Application = ({ travelId, price, bookmark, isBookmark, teams, guide }: ApplicationProps) => {
  const { mutate } = useUpdateBookmark();

  const handleBookmark = () => {
    mutate({ userId: guide.userId, travelId, isBookmark });
  };

  return (
    <div css={container}>
      <div css={applicationInfoWrapper}>
        <div css={priceWrapper}>
          <h1>{Number(price).toLocaleString()}원</h1>
          <p>/ 1인</p>
        </div>
        <select>
          {teams.map((team, idx) => (
            <option key={team.teamId} value={idx}>
              {formatDate(team.travelStartDate) + ' ~ ' + formatDate(team.travelEndDate)}
            </option>
          ))}
        </select>
        <div css={btnWrapper}>
          <button css={bookmarkBtn} onClick={handleBookmark}>
            <Bookmark
              size={20}
              stroke={isBookmark ? theme.colors.primary : '#666'}
              fill={isBookmark ? theme.colors.primary : 'none'}
            />
            {bookmark}
          </button>
          <FiledBtn color={theme.colors.primary} customStyle={applyBtn}>
            신청하기
          </FiledBtn>
        </div>
      </div>
      <div css={guideProfileWrapper}>
        <GuideProfile
          name={guide.socialName}
          userEmailId={guide.userEmail}
          rating={guide.guideTotalRating}
          imgURL={guide.userProfileImage}
        />
      </div>
    </div>
  );
};

export default Application;

const container = css`
  border-radius: 8px;
  border: 1px solid #c1c1c1;
`;

const guideProfileWrapper = css`
  padding: 20px;
  border-top: 1px solid #c1c1c1;
`;

const applicationInfoWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  select {
    height: 40px;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 4px;
  }
`;

const priceWrapper = css`
  display: flex;
  align-items: end;
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }
  p {
    margin-left: 4px;
    font-size: 24px;
    font-weight: 600;
    color: #838383;
  }
`;

const btnWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const bookmarkBtn = css`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #999;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const applyBtn = css`
  width: 230px;
  height: 50px;
  font-size: 16px;
`;
