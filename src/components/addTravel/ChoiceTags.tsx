import FiledBtn from '@/components/FiledBtn';
import GrayBack from '@/components/GrayBack';
import { tagDatas } from '@/data/tagDatas';
import useAddTravelStore from '@/stores/useAddTravelStore';
import { TagType } from '@/types/tagType';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const ChoiceTags = () => {
  const [choicedTag, setChoicedTag] = useState<TagType[]>([]);
  const setData = useAddTravelStore((state) => state.setData);
  const tags = tagDatas.map((tag) => tag.name);
  const handleTag = (tag: TagType) => {
    if (choicedTag.includes(tag)) {
      setChoicedTag(choicedTag.filter((t) => t !== tag));
    } else {
      setChoicedTag([...choicedTag, tag]);
    }
  };

  useEffect(() => {
    setData({ tag: choicedTag });
  }, [choicedTag, setData]);

  return (
    <GrayBack title={'태그'} padding={true}>
      <div css={tagsWrapper}>
        {tags.map((tag) => (
          <FiledBtn
            color={choicedTag.includes(tag) ? '#4A95F2' : '#d6d6d6'}
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
