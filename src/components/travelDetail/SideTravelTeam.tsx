import { css } from '@emotion/react';
import Team from '../Team';

export interface TeamInfo {
  period: string;
  maxMembers: number;
  mbtiList: string[];
}

interface SideTravelTeamProps {
  teams: TeamInfo[];
}

const SideTravelTeam = ({ teams }: SideTravelTeamProps) => {
  return (
    <div css={sideTravelTeamContainer}>
      <h1>여행 기간</h1>
      {teams.map((team, index) => (
        <div key={index} css={teamContainer}>
          <span>{team.period}</span>
          <Team max={team.maxMembers} mbtiList={team.mbtiList} />
        </div>
      ))}
    </div>
  );
};

export default SideTravelTeam;

const sideTravelTeamContainer = css`
  border-radius: 8px;
  border: 1px solid #c1c1c1;
  padding: 20px 16px;

  h1 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

const teamContainer = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 14px;
  gap: 6px;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #555;
  }
`;
