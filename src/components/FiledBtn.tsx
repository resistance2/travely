import { forwardRef } from 'react';
import { css, SerializedStyles } from '@emotion/react';

interface FiledBtnProps {
  children: React.ReactNode;
  color: string;
  size?: string;
  onClick?: () => void;
  customStyle?: SerializedStyles;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const FiledBtn = forwardRef<HTMLButtonElement, FiledBtnProps>(
  ({ children, color, size, onClick, customStyle, type, className, disabled }, ref) => {
    return (
      <button
        ref={ref}
        css={[filedBtn(color, size, disabled), customStyle]}
        onClick={onClick}
        type={type}
        className={className}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

FiledBtn.displayName = 'FiledBtn';

export default FiledBtn;

const filedBtn = (color: string, size: string | undefined, disabled: boolean | undefined) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: ${color};
  border-radius: 8px;
  width: 100px;
  height: 30px;
  font-size: 14px;
  transition: transform 0.2s ease-in-out;
  cursor: ${disabled ? 'auto' : 'pointer'};
  :hover {
    ${disabled ? '' : `transform: scale(1.05);`}
  }
  ${size === 'sm' &&
  `
    width: 70px;
  `}
  ${size === 'mdHeight' &&
  `
    height: 40px;
  `}
  ${size === 'lg' &&
  `
    width: 140px;
  `}
`;
