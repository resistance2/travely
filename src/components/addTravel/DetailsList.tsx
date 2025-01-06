import { css } from '@emotion/react';
import useFieldStore, { FieldsOptions } from '@/stores/useFieldStore';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Dot, X } from 'lucide-react';

interface DetailsListProps {
  option: FieldsOptions;
}

const DetailsList = ({ option }: DetailsListProps) => {
  const [answerView, setAnswerView] = useState<boolean[]>([]);
  const fields = useFieldStore((state) => state.fields);
  const removeField = useFieldStore((state) => state.actions.removeField);

  const answerViewHandler = (index: number) => {
    setAnswerView((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <ul>
      {option === 'faqs'
        ? fields.faqs?.map((faq, index) => (
            <li key={index}>
              <div css={faqList}>
                <div>
                  <Dot size={24} />
                  <p>{faq.question}</p>
                </div>
                {answerView[index] ? (
                  <button onClick={() => answerViewHandler(index)}>
                    <ChevronUp />
                  </button>
                ) : (
                  <button onClick={() => answerViewHandler(index)}>
                    <ChevronDown />
                  </button>
                )}
              </div>
              {answerView[index] ? (
                <div css={answerWrapper}>
                  <p css={{ marginLeft: '30px' }}>{faq.answer}</p>
                  <button
                    onClick={() => {
                      removeField(option, index);
                      answerViewHandler(index);
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : null}
            </li>
          ))
        : fields[option]?.map((field, index) => (
            <li key={index}>
              <div css={list}>
                <Dot size={22} />
                {typeof field === 'string' && <p>{field}</p>}
                <button onClick={() => removeField(option, index)}>
                  <X size={20} />
                </button>
              </div>
            </li>
          ))}
    </ul>
  );
};

export default DetailsList;

const list = css`
  display: flex;
  align-items: center;
  margin-top: 3px;
  & button {
    color: #888;
    margin-left: 10px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
  & * {
    display: block;
  }
`;

const faqList = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  & button {
    color: #888;
    margin-left: 10px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
  & div {
    display: flex;
    & p {
      font-weight: 700;
    }
  }
  & * {
    display: block;
  }
`;

const answerWrapper = css`
  display: flex;
  & button {
    color: #888;
    margin-left: 10px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
`;
