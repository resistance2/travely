import { css } from '@emotion/react';

interface MoreBtnProps {
  isOpen: boolean;
  onChange: () => void;
}

const MoreBtn = ({ isOpen, onChange }: MoreBtnProps) => {
  return (
    <button css={moreBtn} onClick={onChange}>
      {isOpen ? '접기' : '더보기'}
    </button>
  );
};

export default MoreBtn;

const moreBtn = css`
  width: 100%;
  height: 34px;
  background-color: #fff;
  color: #333;
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-top: auto;
`;
