import { css, SerializedStyles } from '@emotion/react';
import { forwardRef } from 'react';
interface BorderBtnProps {
  children: React.ReactNode;
  color: string;
  size?: string;
  onClick?: () => void;
  customStyle?: SerializedStyles;
  type?: 'button' | 'submit' | 'reset';
  hover?: 'scale' | 'filled';
  className?: string;
}

const BorderBtn = forwardRef<HTMLButtonElement, BorderBtnProps>(
  ({ children, color, size, onClick, customStyle, type, hover = 'scale', className = '' }, ref) => {
    return (
      <button
        ref={ref}
        css={[borderBtn(color, size, hover), customStyle]}
        onClick={onClick}
        type={type}
        className={className}
      >
        {children}
      </button>
    );
  },
);

BorderBtn.displayName = 'BorderBtn';

export default BorderBtn;

const borderBtn = (color: string, size: string | undefined, hover: 'scale' | 'filled') => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color};
  border: 1px solid ${color};
  border-radius: 8px;
  width: 100px;
  height: 30px;
  font-size: 14px;
  transition: transform 0.2s ease-in-out;
  :hover {
    ${hover === 'scale'
      ? `
    transform:scale(1.05);
  `
      : `background:#4a95f2;color:#fff`}
  }
  ${size === 'sm' &&
  `
    width: 80px;
  `}
  ${size === 'lg' &&
  `
    width: 140px;
  `}
  ${size === 'full' &&
  `
    width: 100%;
    height:35px;
  `}
`;
