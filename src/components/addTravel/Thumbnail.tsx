import GrayBack from '@/components/GrayBack';
import useGetImageUrl from '@/hooks/query/useGetImageUrl';
import { validateImageFile } from '@/utils/validCheck';
import { css } from '@emotion/react';
import { ImagePlus } from 'lucide-react';
import { ChangeEvent, memo, useState } from 'react';

interface ThumbnailProps {
  imageUrl: string;
  setImageUrl: (thumbnail: string) => void;
  title: string;
}

const ImageUploadField = memo(({ imageUrl, setImageUrl, title }: ThumbnailProps) => {
  const [errMessage, setErrMessage] = useState('');
  const { mutate: uploadImages } = useGetImageUrl();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateImageFile(file)) {
        setErrMessage('5MB 이하의 jpeg, png, jpg 형식의 이미지 파일만 업로드 가능합니다.');
        setTimeout(() => setErrMessage(''), 3000);
        return;
      }
      uploadImages(
        { file },
        {
          onSuccess: (uploadedImageUrl) => {
            setImageUrl(uploadedImageUrl);
          },
        },
      );
    }
  };

  return (
    <>
      <GrayBack title={title}>
        <div css={thumbnailStyle(imageUrl)}>
          <button onClick={() => document.getElementById(`image-input-${title}`)?.click()}>
            <ImagePlus size={100} css={{ color: '#fff' }} />
          </button>
          <input id={`image-input-${title}`} type="file" onChange={(e) => handleFileChange(e)} />
        </div>
      </GrayBack>
      <p css={{ fontSize: '14px', color: '#ff2020' }}>{errMessage}</p>
    </>
  );
});

export default ImageUploadField;

const thumbnailStyle = (thumbnail: string) => css`
  width: 100%;
  height: 400px;
  background-image: ${thumbnail === '' ? 'none' : `url(${thumbnail})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  & button {
    width: 100%;
    height: 100%;
  }
  & input {
    display: none;
  }
`;
