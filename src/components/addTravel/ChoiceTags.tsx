import FiledBtn from '@/components/FiledBtn';
import GrayBack from '@/components/GrayBack';
import { theme } from '@/styles/theme';
import { TagType } from '@/types/tagType';
import { css } from '@emotion/react';
import { useState } from 'react';

const TAGS: TagType[] = [
  'Food',
  'Culture',
  'Healing',
  'Nature',
  'Sports',
  'Festival',
  'K-POP',
  'K-DRAMA',
  'JEJU',
  'etc.',
] as const;

const ChoiceTags = () => {
  const [choseTag, setChoseTag] = useState<TagType[]>([]);

  const handleTag = (tag: TagType) => {
    if (choseTag.includes(tag)) {
      setChoseTag(choseTag.filter((t) => t !== tag));
    } else {
      setChoseTag([...choseTag, tag]);
    }
  };
  return (
    <GrayBack title={'태그'} padding={true}>
      <div css={tagsWrapper}>
        {TAGS.map((tag) => (
          <FiledBtn
            color={choseTag.includes(tag) ? theme.colors.primary : '#d6d6d6'}
            size={'mdHeight'}
            onClick={() => handleTag(tag)}
            key={tag}
          >
            # {tag}
          </FiledBtn>
        ))}
      </div>
    </GrayBack>
  );
};

export default ChoiceTags;

const tagsWrapper = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
`;
