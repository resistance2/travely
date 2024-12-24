import { css } from '@emotion/react';
import FAQ from './FAQ';

interface FAQProps {
  faqs: { question: string; answer: string }[];
}

const FAQList = ({ faqs }: FAQProps) => {
  return (
    <div css={qnaWrapper}>
      <p>자주 묻는 질문</p>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <FAQ question={faq.question} answer={faq.answer} />
        </div>
      ))}
    </div>
  );
};

export default FAQList;

const qnaWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
  }
`;
