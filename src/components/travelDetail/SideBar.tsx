import { css } from '@emotion/react';
import Application from './Application';
import SideTravelTeam from '../detail/SideTravelTeam';
import { TravelDetailData } from '@/types/travelDataType';

interface SideBarProps {
  travelId: string;
  travelData: TravelDetailData;
}

const SideBar = ({ travelId, travelData }: SideBarProps) => {
  return (
    <aside css={sideContainer}>
      <Application
        travelId={travelId}
        price={travelData.price}
        bookmark={travelData.bookmark || 0}
        isBookmark={travelData.isBookmark}
        teams={travelData.team}
        guide={travelData.guide}
        isTraveler={travelData.isTraveler}
      />
      <SideTravelTeam teams={travelData.team} />
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
