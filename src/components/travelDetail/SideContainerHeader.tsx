import { css } from '@emotion/react';
import Rating from '@/components/Rating';
import basicprofile from '@/assets/basicProfile.png';
import { theme } from '@/styles/theme';
import { Bookmark } from 'lucide-react';

interface SideContainerHeaderProps {
  price: number;
  bookmark: number;
}

const SideContainerHeader = ({ price, bookmark }: SideContainerHeaderProps) => {
  return (
    <div css={sideContainerHeader}>
      <div css={priceContainer}>
        <h1>{price.toLocaleString()}원</h1>
        <p>/ 1인</p>
      </div>
      <div css={dropdownContainer}>
        <select>
          <option value="1">25.01.25 ~ 25.02.25</option>
          <option value="2">25.02.25 ~ 25.03.25</option>
          <option value="3">25.03.25 ~ 25.04.25</option>
        </select>
      </div>
      <div css={btnContainer}>
        <button css={bookmarkBtn}>
          <Bookmark size={20} />
          {bookmark}
        </button>
        <button css={applyBtn}>신청하기</button>
      </div>
      <hr css={hr} />
      <div css={userInfoContainer}>
        <div css={userInfoProfileContainer}>
          <img src={basicprofile} alt="basicprofile" />
        </div>
        <div css={userInfoContentContainer}>
          <div css={userInfoTitleContainer}>
            <p>하나투어</p>
            <Rating rating={5.0} />
          </div>
          <span>kakao : dirjsdk</span>
        </div>
      </div>
    </div>
  );
};

export default SideContainerHeader;

const sideContainerHeader = css`
  border-radius: 8px;
  border: 1px solid #c1c1c1;
`;

const priceContainer = css`
  display: flex;
  align-items: center;
  padding: 20px 20px 0 20px;
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }
  p {
    font-size: 24px;
    font-weight: 600;
    color: #838383;
  }
`;

const dropdownContainer = css`
  display: flex;
  align-items: center;
  justify-content: row;
  padding: 20px 20px 0 20px;
  select {
    width: 100%;
    height: 40px;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    padding: 4px;
  }
`;

const btnContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 10px 20px;
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
    transform: scale(1.04);
  }
`;

const applyBtn = css`
  width: 230px;
  height: 50px;
  border-radius: 8px;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const hr = css`
  width: 100%;
  height: 1px;
  background: #c1c1c1;
  margin: 20px 0;
`;

const userInfoContainer = css`
  display: flex;
  align-items: center;
  justify-content: row;
  padding: 0 20px 20px 20px;
`;

const userInfoProfileContainer = css`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: red;
  margin-right: 10px;
`;

const userInfoContentContainer = css`
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #888;
  }
`;

const userInfoTitleContainer = css`
  display: flex;
  align-items: center;
  justify-content: row;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #444;
    margin-right: 4px;
  }
`;
