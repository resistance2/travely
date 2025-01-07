/* eslint-disable react-hooks/exhaustive-deps */
import GrayBack from '@/components/GrayBack';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useImageStore from '@/stores/useImageStore';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Introduction = () => {
  const [imgLimit, setImgLimit] = useState(false);
  const [value, setValue] = useState('');
  const setIntroSrcs = useImageStore((state) => state.setIntroSrcs);
  const setData = useAddTravelStore((state) => state.setData);

  useEffect(() => {
    const regex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;
    let match;
    const newSrcs: string[] = [];
    while ((match = regex.exec(value)) !== null) {
      newSrcs.push(match[1]);
    }
    if (newSrcs.length > 4) {
      const excessImgSrc = newSrcs[4];
      const newValue = value.replace(`<img src="${excessImgSrc}">`, '');
      setValue(newValue);
      newSrcs.pop();
      setImgLimit(true);
      setTimeout(() => {
        setImgLimit(false);
      }, 3000);
    }
    setIntroSrcs(newSrcs);
    setData({ travelContent: value });
  }, [value]);

  const modules = {
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

  return (
    <GrayBack title={'상품 소개'}>
      <ReactQuill value={value} onChange={setValue} modules={modules} css={textbox} />
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
