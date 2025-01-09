/* eslint-disable react-hooks/exhaustive-deps */
import GrayBack from '@/components/GrayBack';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useFieldStore from '@/stores/useFieldStore';
import useImageStore from '@/stores/useImageStore';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const QUILL_MODULE = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      ['image'],
    ],
  },
};

const Introduction = () => {
  const [imgLimit, setImgLimit] = useState(false);
  const [value, setValue] = useState('');
  const { setIntroSrcs } = useImageStore((state) => state.actions);
  const { setContent } = useFieldStore((state) => state.actions);
  const setData = useAddTravelStore((state) => state.setData);

  useEffect(() => {
    handleContent();
  }, [value]);

  const handleContent = async () => {
    const regex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;
    const matches = [...value.matchAll(regex)];
    const imgUrls = matches.map((match) => match[1]);

    if (imgUrls.length === 0) {
      setContent(value);
      setData({ travelContent: value });
      return;
    }

    const newSrcs = await Promise.all(
      imgUrls.map(async (imgUrl) => {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        return new File([blob], 'image.jpg', { type: blob.type });
      }),
    );

    if (newSrcs.length > 4) {
      const excessImgSrc = newSrcs[4];
      const newValue = value.replace(`<img src="${excessImgSrc}">`, '');
      setValue(newValue);
      newSrcs.pop();
      setImgLimit(true);
      setTimeout(() => setImgLimit(false), 3000);
    }

    setIntroSrcs(newSrcs);
    setContent(value);
    setData({ travelContent: value });
  };

  return (
    <GrayBack title={'상품 소개'}>
      <ReactQuill value={value} onChange={setValue} modules={QUILL_MODULE} css={textbox} />
      {imgLimit ? (
        <p css={{ fontSize: '14px', color: '#ff2020' }}>이미지는 최대 4장까지 첨부 가능합니다.</p>
      ) : null}
    </GrayBack>
  );
};

export default Introduction;

const textbox = css`
  width: 100%;
  height: 400px;
  background-color: transparent;
  padding-bottom: 40px;
  font-size: 16px;
  & .ql-toolbar.ql-snow {
    border: none !important;
  }
  & .ql-snow {
    border: none !important;
    & * {
      font-size: 16px;
    }
  }
`;
