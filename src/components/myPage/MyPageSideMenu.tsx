import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import { NavLink, useLocation } from 'react-router-dom';

const sideMenuItems = [
  {
    name: '계정',
    activePaths: ['my-account'],
  },
  {
    name: '내 여행',
    activePaths: ['my-travel-list', 'my-created-travel'],
  },
  {
    name: '작성 후기',
    activePaths: ['my-reviews'],
  },
  {
    name: '가이드 찾아요',
    activePaths: ['my-find-guide'],
  },
];

const MyPageSideMenu = () => {
  const location = useLocation();

  return (
    <nav css={sideMenuStyle}>
      <ul>
        {sideMenuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.activePaths[0]}
              className={() =>
                item.activePaths.some((path) => location.pathname.includes(path)) ? 'active' : ''
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MyPageSideMenu;

const sideMenuStyle = css`
  height: 100%;
  border: 1px solid ${theme.colors.borderColor};
  border-radius: 5px;
  padding: 10px;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    border-radius: 5px;
    width: 230px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }

  a {
    display: block;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }

  a.active {
    background-color: #e9effc;
    color: ${theme.colors.primary};
  }
`;
