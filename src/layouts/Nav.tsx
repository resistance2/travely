import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Nav: React.FC<{ light?: boolean }> = ({ light = false }) => {
  return (
    <nav css={nav(light)}>
      <ul>
        <li>
          <Link to="/travel-list">함께 떠나요</Link>
        </li>
        <li>
          <Link to="/find-guide">가이드 찾아요</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

const nav = (light: boolean) => css`
  ul {
    display: flex;
    gap: 40px;

    li {
      font-size: 18px;
      font-weight: bold;
      color: ${light ? '#fff' : '#666'};
      &:hover {
        color: ${!light && '#333'};
        transition: color 0.2s ease-in-out;
      }
    }
  }
`;
