import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Bookmark } from 'lucide-react';
import GuideProfile from '@/components/GuideProfile';
import { GuideData, TravelTeamData } from '@/types/travelDataType';
import FiledBtn from '../FiledBtn';
import { formatDate } from '@/utils/format';
import useUpdateBookmark from '@/hooks/query/useUpdateBookmark';
import useUserStore from '@/stores/useUserStore';
import { ShowToast } from '../Toast';
import useRegisterTravel from '@/hooks/query/useregisterTravel';
import { useState } from 'react';

interface ApplicationProps {
  travelId: string;
  price: number;
  bookmark: number;
  isBookmark: boolean;
  teams: Pick<TravelTeamData, 'teamId' | 'travelStartDate' | 'travelEndDate'>[];
  guide: GuideData;
  isTraveler: boolean;
}

const Application = ({
  travelId,
  price,
  bookmark,
  isBookmark,
  teams,
  guide,
  isTraveler,
}: ApplicationProps) => {
  const { mutate } = useUpdateBookmark();
  const user = useUserStore((state) => state.user);
  const { mutate: registerTravel } = useRegisterTravel();
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const handleSelectTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamId(event.target.value);
  };

  const handleRegister = () => {
    if (!user) {
      ShowToast('로그인 후 이용 가능합니다.', 'failed');
      return;
    }
    // if (user.userId === guide.userId) {
    //   ShowToast('자신의 여행에는 신청할 수 없습니다.', 'failed');
    //   return;
    // }
    console.log(selectedTeamId);
    if (!selectedTeamId) {
      ShowToast('신청할 팀을 선택하세요.', 'failed');
      return;
    }

    registerTravel({ userId: user.userId, teamId: selectedTeamId });
  };

  const handleBookmark = () => {
    if (!user) {
      ShowToast('로그인 후 이용 가능합니다.', 'failed');
      return;
    }
    if (user.userId === guide.userId) {
      ShowToast('자신의 글은 북마크 할 수 없습니다.', 'failed');
      return;
    } else {
      mutate({ userId: user.userId, travelId, isBookmark: !isBookmark });
    }
  };

  return (
    <div css={container}>
      <div css={applicationInfoWrapper}>
        <div css={priceWrapper}>
          <h1>{Number(price).toLocaleString()}원</h1>
          <p>/ 1인</p>
        </div>
        <select onChange={handleSelectTeam}>
          <option value="">(여행 기간을 선택해주세요)</option>
          {teams.map((team) => (
            <option key={team.teamId} value={team.teamId}>
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
          {isTraveler ? null : (
            <FiledBtn color={theme.colors.primary} customStyle={applyBtn} onClick={handleRegister}>
              신청하기
            </FiledBtn>
          )}
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
