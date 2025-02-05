import GrayBack from '@/components/GrayBack';
import { CirclePlus } from 'lucide-react';
import { css } from '@emotion/react';
import { useRef } from 'react';
import DetailsList from '@/components/addTravel/DetailsList';
import useComposing from '@/hooks/custom/useComposing';

interface IncludeListProps {
  addField: (values: string) => void;
}

const IncludeList = ({ addField }: IncludeListProps) => {
  const newFieldRef = useRef<HTMLInputElement>(null);
  const { setIsComposing, handleKeyDown } = useComposing();

  const addFieldHandler = () => {
    if (newFieldRef.current?.value.trim()) {
      addField(newFieldRef.current.value);
      newFieldRef.current.value = '';
    }
  };

  return (
    <GrayBack title="포함내용" padding={true}>
      <DetailsList option="includeList" />
      <div css={{ display: 'flex' }}>
        <input
          css={textBox}
          ref={newFieldRef}
          onKeyDown={(e) => handleKeyDown(e, addFieldHandler)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          maxLength={40}
          type="text"
          placeholder="40자 내외로 내용을 작성해주세요."
        />
        <button css={plusBtn} onClick={addFieldHandler}>
          <CirclePlus size={24} />
        </button>
      </div>
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

export default IncludeList;
