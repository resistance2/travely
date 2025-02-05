import DetailsList from '@/components/addTravel/DetailsList';
import GrayBack from '@/components/GrayBack';
import useFieldStore from '@/stores/useFieldStore';
import { css } from '@emotion/react';
import { CirclePlus } from 'lucide-react';
import { useRef } from 'react';

const Faq = () => {
  const addField = useFieldStore((state) => state.actions.addField);
  const newFieldRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const addFieldHandler = () => {
    if (newFieldRef.current?.value.trim() && answerRef.current?.value.trim()) {
      addField('faqs', newFieldRef.current.value, answerRef.current.value);
      newFieldRef.current.value = '';
      answerRef.current.value = '';
    }
  };

  return (
    <GrayBack title="FAQ" padding={true}>
      <DetailsList option="faqs" />
      <div css={{ display: 'flex' }}>
        <input
          css={textBox}
          ref={newFieldRef}
          maxLength={30}
          type="text"
          placeholder="30자 내외로 질문을 작성해주세요."
        />
        <button css={plusBtn} onClick={addFieldHandler}>
          <CirclePlus size={24} />
        </button>
      </div>
      <textarea
        css={textBox2}
        ref={answerRef}
        maxLength={150}
        placeholder="150자 내외로 답변을 작성해주세요."
      />
    </GrayBack>
  );
};

const textBox = css`
  border: 1px solid #dedede;
  border-radius: 8px;
  height: 35px;
  padding: 0 10px;
  margin: 10px 0;
`;

const plusBtn = css`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: #2467e3;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.2);
  }
`;

const textBox2 = css`
  border: 1px solid #dedede;
  border-radius: 8px;
  height: 80px;
  padding: 5px 10px;
`;

export default Faq;
