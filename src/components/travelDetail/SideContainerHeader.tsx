import { css } from '@emotion/react';
import basicprofile from '@/assets/basicProfile.png';
import { theme } from '@/styles/theme';
import { Bookmark } from 'lucide-react';
import GuideProfile from '@/components/GuideProfile';

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
      <div css={guideProfileContainer}>
        <GuideProfile name="하나투어" userEmailId="dirjsdk" rating={5.0} imgURL={basicprofile} />
      </div>
    </div>
  );
};

export default SideContainerHeader;

const guideProfileContainer = css`
  padding-bottom: 25px;
  padding-left: 17px;
`;

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
