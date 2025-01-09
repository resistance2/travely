import GrayBack from '@/components/GrayBack';
import useImageStore from '@/stores/useImageStore';
import { css } from '@emotion/react';
import { ImagePlus } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

type ThumbnailType = 'thumbnail' | 'meetingSpace';

interface ThumbnailProps {
  type: ThumbnailType;
}

const Thumbnail = ({ type }: ThumbnailProps) => {
  const [errMessage, setErrMessage] = useState('');
  const { thumbnail, meetingSpace } = useImageStore((state) => state.images);
  const { setThumbnail, setMeetingSpace } = useImageStore((state) => state.actions);

  const validateFile = (file: File): string | null => {
    if (file.size > 5 * 1024 * 1024) {
      return '파일 크기는 5MB 이하여야 합니다.';
    }
    if (
      !file.type.startsWith('image/') ||
      !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
    ) {
      return 'jpeg, png, jpg 형식의 이미지 파일만 업로드 가능합니다.';
    }
    return null;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: ThumbnailType) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const errorMessage = validateFile(file);
      if (errorMessage) {
        setErrMessage(errorMessage);
        setTimeout(() => setErrMessage(''), 3000);
        return;
      }

      if (type === 'thumbnail') {
        setThumbnail(file);
      } else if (type === 'meetingSpace') {
        setMeetingSpace(file);
      }
    }
  };

  const getPreviewUrl = (file: File | null) => {
    return file ? URL.createObjectURL(file) : '';
  };

  const DATA_OF_TYPE = {
    thumbnail: {
      title: '대표 이미지',
      image: thumbnail,
    },
    meetingSpace: {
      title: '만나는 장소',
      image: meetingSpace,
    },
  };

  return (
    <>
      <GrayBack title={DATA_OF_TYPE[type].title}>
        <div css={thumbnailSize(getPreviewUrl(DATA_OF_TYPE[type].image))}>
          <button onClick={() => document.getElementById(type)?.click()}>
            <ImagePlus size={100} css={{ color: '#fff' }} />
          </button>
          <input id={type} type="file" onChange={(e) => handleFileChange(e, type)} />
        </div>
      </GrayBack>
      <p css={{ fontSize: '14px', color: '#ff2020' }}>{errMessage}</p>
    </>
  );
};

export default Thumbnail;

const thumbnailSize = (thumbnail: string) => css`
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
