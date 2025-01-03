import GrayBack from '@/components/GrayBack';
import { CirclePlus } from 'lucide-react';
import { css } from '@emotion/react';
import useFieldStore, { FieldsOptions } from '@/stores/useFieldStore';
import { useRef } from 'react';
import DetailsList from '@/components/addTravel/DetailsList';
import Thumbnail from '@/components/addTravel/Thumbnail';
import useComposing from '@/hooks/custom/useComposing';

interface DetailsProps {
  title: string;
}

const Details = ({ title }: DetailsProps) => {
  const { setIsComposing, handleKeyDown } = useComposing();
  const addField = useFieldStore((state) => state.actions.addField);
  const newFieldRef = useRef<HTMLInputElement>(null);
  const answer = useRef<HTMLTextAreaElement>(null);

  let option: FieldsOptions = 'inclusionList';
  if (title === '포함내용') {
    option = 'inclusionList';
  } else if (title === '미포함내용') {
    option = 'notInclusionList';
  } else if (title === 'FAQ') {
    option = 'faqs';
  } else if (title === '이용안내') {
    option = 'userGuide';
  }

  const addFieldPmCheck = () => {
    if (option === 'faqs') {
      if (newFieldRef.current && answer.current) {
        if (newFieldRef.current.value.trim() !== '' && answer.current.value.trim() !== '') {
          addField(option, newFieldRef.current.value, answer.current.value);
          newFieldRef.current.value = '';
          answer.current.value = '';
        }
      }
    } else {
      if (newFieldRef.current) {
        if (newFieldRef.current.value.trim() !== '') {
          addField(option, newFieldRef.current.value);
          newFieldRef.current.value = '';
        }
      }
    }
  };

  return (
    <GrayBack title={title} padding={true}>
      {title === '이용안내' ? (
        <>
          <span css={{ fontSize: '18px' }}>만나는 시간</span>
          <DetailsList option={option} />
          <div css={{ display: 'flex' }}>
            <input
              css={textBox}
              ref={newFieldRef}
              onKeyDown={(e) => handleKeyDown(e, addFieldPmCheck)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              maxLength={40}
              type="text"
              placeholder="40자 내외로 내용을 작성해주세요."
            />
            <button css={plusBtn} onClick={addFieldPmCheck}>
              <CirclePlus size={24} />
            </button>
          </div>
          <Thumbnail type="meetingSpace" />
        </>
      ) : (
        <>
          <DetailsList option={option} /> {/* 다른 페이지에서는 일반 필드 추가 */}
          <div css={{ display: 'flex' }}>
            {title === 'FAQ' ? (
              <input
                css={textBox}
                ref={newFieldRef}
                type="text"
                placeholder="30자 내외로 질문을 작성해주세요."
                maxLength={30}
              />
            ) : (
              <input
                css={textBox}
                ref={newFieldRef}
                onKeyDown={(e) => handleKeyDown(e, addFieldPmCheck)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                maxLength={40}
                type="text"
                placeholder="40자 내외로 내용을 작성해주세요."
              />
            )}
            <button css={plusBtn} onClick={addFieldPmCheck}>
              <CirclePlus size={24} />
            </button>
          </div>
        </>
      )}
      {title === 'FAQ' && (
        <textarea
          css={textBox2}
          ref={answer}
          maxLength={150}
          placeholder="150자 내외로 답변을 작성해주세요."
        />
      )}
    </GrayBack>
  );
};

export default Details;

export const textBox = css`
  border: 1px solid #dedede;
  border-radius: 8px;
  height: 35px;
  padding: 0 10px;
  margin: 10px 0;
`;

export const plusBtn = css`
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
