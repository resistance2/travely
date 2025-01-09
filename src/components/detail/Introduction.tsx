import { css } from '@emotion/react';
import GrayBack from '../GrayBack';
import MoreBtn from './MoreBtn';
import useMoreBtn from '@/hooks/custom/useMoreBtn';

const Introduction = ({ content }: { content: string }) => {
  const { isOpen, handleToggle, heightRef, height } = useMoreBtn<HTMLDivElement>();
  const isThreeLine = height && height > 60;
  const hasImage = content.includes('img');
  //TODO: dompurify 적용하기
  return (
    <div css={container}>
      <GrayBack title={'여행 소개'}>
        <div ref={heightRef} css={wrapper(isOpen)} dangerouslySetInnerHTML={{ __html: content }} />
        {isThreeLine || hasImage ? <MoreBtn isOpen={isOpen} onChange={handleToggle} /> : null}
      </GrayBack>
    </div>
  );
};

export default Introduction;

const container = css`
  p {
    font-weight: 600;
  }
`;

const wrapper = (isOpen: boolean) => css`
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
  img {
    max-width: 400px;
    max-height: 400px;
    ${!isOpen &&
    `
      display: none;
    `}
  }
`;
