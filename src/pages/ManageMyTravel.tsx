/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import TravelTeam from '@/components/manageMyTravel/TravelTeam';
import TravelManageHeader from '@/components/manageMyTravel/TravelManageHeader';
import usePageStore from '@/stores/usePageStore';
import { useParams } from 'react-router-dom';
import useGetManageTravel from '@/hooks/query/useGetManageTravel';

const ManageMyTravel = () => {
  const [isOngoingTab, setIsOngoingTab] = useState(true);
  const [hasTeamData, setHasTeamData] = useState(true);
  const pageContainer = usePageStore((state) => state.pageContainer);
  const setMultiPagination = usePageStore((state) => state.setMultiPagination);
  const { travelId } = useParams();
  const { data: travelData } = useGetManageTravel(travelId as string);

  useEffect(() => {
    if (travelData && pageContainer?.length === 0) {
      setMultiPagination(travelData.teamTeams);
    }
  }, [isOngoingTab, travelData]);

  if (travelData?.travelId !== travelId) return;

  const handleHasData = (hasData: boolean) => {
    if (!hasData) setHasTeamData(hasData);
  };

  return (
    <div css={{ color: '#333' }}>
      {travelData && travelId && (
        <>
          <TravelManageHeader
            travelData={travelData}
            isOngoingTab={isOngoingTab}
            setIsOngoingTab={setIsOngoingTab}
          />
          {travelData.teamTeams.map((teamId) => (
            <TravelTeam
              key={teamId}
              travelId={travelId}
              teamId={teamId}
              isOngoing={isOngoingTab}
              hasAccount={typeof travelData?.bankAccount?.accountNumber === 'string'}
              handleHasData={handleHasData}
            />
          ))}
          {hasTeamData === isOngoingTab && (
            <div css={noData}>{isOngoingTab ? '진행중인' : '완료된'} 여행이 없습니다.</div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageMyTravel;

const noData = css`
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  color: #888;
  margin: 100px;
`;
