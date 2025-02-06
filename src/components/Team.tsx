import { css } from '@emotion/react';
import { Smile } from 'lucide-react';

interface ITeamProps {
  max?: number;
  userList?: { mbti: string | null }[];
  size?: 'sm' | 'md';
}

const Team = ({ max = 1, userList = [], size = 'md' }: ITeamProps) => {
  const items = Array(max)
    .fill(0)
    .map((_, i) => userList[i] || null);

  return (
    <ul css={teamWrap} className={size}>
      {items.map((item, i) => {
        return (
          <li key={i}>
            <div className={`team-item${item !== null ? ' fill' : ''}`}>
              <Smile color="#fff" size={size === 'sm' ? 19 : 21} />
            </div>
            <p>{item ? item?.mbti || '미정' : ''}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Team;

const teamWrap = css`
  display: flex;
  gap: 10px;
  &.sm {
    gap: 4px;
    .team-item {
      width: 28px;
      height: 28px;
      border-radius: 5px;
    }
    p {
      font-size: 10px;
    }
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;

    .team-item {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ecebeb;
      border-radius: 10px;

      &.fill {
        background-color: #4a95f2;
      }
    }

    p {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
