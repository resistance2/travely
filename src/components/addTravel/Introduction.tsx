/* eslint-disable react-hooks/exhaustive-deps */
import GrayBack from '@/components/GrayBack';
import { ShowToast } from '@/components/Toast';
import useGetImageUrl from '@/hooks/query/useGetImageUrl';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useFieldStore from '@/stores/useFieldStore';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface IntroductionProps {
  title?: string;
}

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

const Introduction = ({ title = '상품 소개' }: IntroductionProps) => {
  const [imgLimit, setImgLimit] = useState(false);
  const [value, setValue] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { setContent } = useFieldStore((state) => state.actions);
  const setData = useAddTravelStore((state) => state.setData);
  const { mutate: uploadImage } = useGetImageUrl();

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

    if (imgUrls.length > 4) {
      setImgLimit(true);
      ShowToast('이미지는 최대 4개만 사용 가능합니다.', 'failed');
      return;
    }

    for (const imgSrc of imgUrls) {
      if (uploadedImages.includes(imgSrc)) continue;

      try {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const imageFile = new File([blob], 'image.jpg', { type: blob.type });

        uploadImage(
          { file: imageFile },
          {
            onSuccess: (uploadedImageUrl) => {
              setUploadedImages((prev) => [...prev, uploadedImageUrl]);
              const newValue = value.replace(
                `<img src="${imgSrc}">`,
                `<img src="${uploadedImageUrl}">`,
              );
              setValue(newValue);
            },
            onError: () => {
              const newValue = value.replace(`<img src="${imgSrc}">`, '');
              setValue(newValue);
            },
          },
        );
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    setContent(value);
    setData({ travelContent: value });
  };

  return (
    <GrayBack title={title}>
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
