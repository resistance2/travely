/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import UserTable from '@/components/manageMyTravel/UserTable';
import Team from '@/components/Team';
import MultiPagination from '@/components/manageMyTravel/MultiPagination';
import { formatDate } from '@/utils/format';
import useGetManageTravelTeams from '@/hooks/query/useGetManageTravelTeams';
import isOngoingDate from '@/utils/teamDataFilter';
import usePageStore from '@/stores/usePageStore';
import { MANAGE_COUNT_PER_PAGE } from '@/constants/countPerPage';
import { useEffect } from 'react';

interface TravelTeamProps {
  travelId: string;
  teamId: string;
  isOngoing: boolean;
  hasAccount: boolean;
  handleHasData: (hasData: boolean) => void;
}

const TravelTeam = ({
  travelId,
  teamId,
  isOngoing,
  hasAccount,
  handleHasData,
}: TravelTeamProps) => {
  const pageContainer = usePageStore((state) => state.pageContainer);
  const currentPage = pageContainer.find((page) => page.paginationId === teamId)?.currentPage || 1;
  const { data: teamData } = useGetManageTravelTeams(
    travelId,
    currentPage,
    MANAGE_COUNT_PER_PAGE,
    teamId,
  );

  useEffect(() => {
    if (teamData && showTeamData) handleHasData(false);
  }, []);

  if (!teamData) return null;

  const showTeamData = isOngoingDate(teamData.travelEndDate) === isOngoing;
  const userMBTIList = teamData?.approvedUsers?.map((user) => user.mbti);

  return (
    <div css={teamWrapper}>
      {teamData && showTeamData && (
        <>
          <p>{formatDate(teamData.travelStartDate) + ' ~ ' + formatDate(teamData.travelEndDate)}</p>
          <Team max={teamData.personLimit} userList={userMBTIList?.map((mbti) => ({ mbti }))} />
          {teamData.appliedUsers ? (
            <div>
              <UserTable data={teamData.appliedUsers} teamId={teamId} hasAccount={hasAccount} />
              <MultiPagination pageData={teamData.pagination} teamId={teamData.teamId} />
            </div>
          ) : (
            <div css={noData}>신청한 유저가 없습니다.</div>
          )}
        </>
      )}
    </div>
  );
};

export default TravelTeam;

const teamWrapper = css`
  margin-bottom: 20px;
  & p {
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const noData = css`
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  color: #888;
  margin: 100px;
`;
