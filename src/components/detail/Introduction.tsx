import { css } from '@emotion/react';
import GrayBack from '../GrayBack';
import MoreBtn from './MoreBtn';
import useMoreBtn from '@/hooks/custom/useMoreBtn';

const Introduction = ({ content }: { content: string }) => {
  const { isOpen, handleToggle, heightRef, height } = useMoreBtn();
  const isThreeLine = height && height > 60;

  return (
    <div css={introWrapper(isOpen)}>
      <GrayBack title={'여행 소개'}>
        <pre ref={heightRef}>{content}</pre>
        {isThreeLine ? <MoreBtn isOpen={isOpen} onChange={handleToggle} /> : null}
      </GrayBack>
    </div>
  );
};

export default Introduction;

const introWrapper = (isOpen: boolean) => css`
  p {
    font-weight: 600;
  }
  pre {
    ${!isOpen &&
    `
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }
`;
