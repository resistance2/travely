import useAccordion from '@/hooks/custom/useAccordion';
import { css } from '@emotion/react';
import { ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';

const FAQ = ({ question, answer }: { question: string; answer: string }) => {
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const [isClose, setIsClose] = useState(false);
  const { openId, handleToggle, panelRef } = useAccordion();
  const hasOpenId = openId?.[question];

  useEffect(() => {
    if (panelRef.current && hasOpenId) {
      setPanelHeight(panelRef.current.scrollHeight);
    }
    if (!hasOpenId) {
      setIsClose(true);
      const timeout = setTimeout(() => {
        setIsClose(false);
        setPanelHeight(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [panelRef, hasOpenId]);

  return (
    <>
      <button css={trigger} onClick={() => handleToggle(question, !hasOpenId)}>
        <div>
          <CircleHelp size={20} />
          {question}
        </div>
        {hasOpenId ? <ChevronUp /> : <ChevronDown />}
      </button>
      <Answer
        answer={answer}
        ref={panelRef}
        isOpen={hasOpenId}
        isClose={isClose}
        height={panelHeight}
      />
    </>
  );
};

const Answer = forwardRef<
  HTMLDivElement | null,
  { answer: string; isOpen?: boolean; height: number; isClose: boolean }
>(({ answer, isOpen = false, isClose, height }, answerRef) => {
  return (
    <div ref={answerRef} css={panel(isOpen, isClose, height)}>
      <pre>{answer}</pre>
    </div>
  );
});

export default FAQ;

const trigger = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  padding: 10px 16px;
  border-radius: 5px;
  div {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #333;
  }
`;

const panel = (isOpen: boolean, isClose: boolean, height: number) => css`
  display: none;
  overflow: hidden;
  border: 1px solid #f1f1f1;
  padding: ${isOpen ? '10px 16px' : '0 16px'};
  margin-top: 4px;
  border-radius: 5px;
  color: #888;
  font-size: 15px;
  font-weight: 400;
  transition: height 0.3s cubic-bezier(0.2, 0.2, 0.2, 0.6);
  pre {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }
  ${isOpen &&
  `
  display: block;
  height: ${height}px;
  `}
  ${isClose &&
  `
    display: block;
    animation: accordionUp 0.3s cubic-bezier(0.2,0.2,0.2,0.6);
    pre {
      display: none;
    }
  `}

  @keyframes accordionUp {
    from {
      height: ${height}px;
    }
    to {
      height: 0;
    }
  }
`;
