import GrayBack from '@/components/GrayBack';
import useImageStore from '@/stores/useImageStore';
import { css } from '@emotion/react';
import { ImagePlus } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface ThumbnailProps {
  type: 'thumbnail' | 'meetingSpace';
}

const Thumbnail = ({ type }: ThumbnailProps) => {
  const [errMessage, setErrMessage] = useState('');
  const thumbnail = useImageStore((state) => state.images.thumbnail);
  const setThumbnail = useImageStore((state) => state.setThumbnail);
  const setMeetingSpace = useImageStore((state) => state.setMeetingSpace);
  const meetingSpace = useImageStore((state) => state.images.meetingSpace);
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

  const processFile = (file: File, onLoadCallback: (imageData: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      onLoadCallback(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setErrMessage: (message: string) => void,
    onSuccess: (imageData: string) => void,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const errorMessage = validateFile(file);
      if (errorMessage) {
        setErrMessage(errorMessage);
        setTimeout(() => {
          setErrMessage('');
        }, 3000);
        return;
      }
      processFile(file, onSuccess);
    }
  };

  const handleThumbnailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(e, setErrMessage, (imageData) => {
      setThumbnail(imageData);
    });
  };

  const handleMeetingLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(e, setErrMessage, (imageData) => {
      setMeetingSpace(imageData);
    });
  };

  if (type === 'thumbnail') {
    return (
      <>
        <GrayBack title="대표 이미지">
          <div css={thumbnailSize(thumbnail)}>
            <button onClick={() => document.getElementById('thumbnailUpload')?.click()}>
              <ImagePlus size={100} css={{ color: '#fff' }} />
            </button>
            <input id="thumbnailUpload" type="file" onChange={(e) => handleThumbnailChange(e)} />
          </div>
        </GrayBack>
        <p css={{ fontSize: '14px', color: '#ff2020' }}>{errMessage}</p>
      </>
    );
  } else if (type === 'meetingSpace') {
    return (
      <>
        <GrayBack title="만나는 장소">
          <div css={thumbnailSize(meetingSpace)}>
            <button onClick={() => document.getElementById('meetingLocationUpload')?.click()}>
              <ImagePlus size={100} css={{ color: '#fff' }} />
            </button>
            <input
              id="meetingLocationUpload"
              type="file"
              onChange={(e) => handleMeetingLocationChange(e)}
            />
          </div>
        </GrayBack>
        <p css={{ fontSize: '14px', color: '#ff2020' }}>{errMessage}</p>
      </>
    );
  }
};

export default Thumbnail;

const thumbnailSize = (thumbnail: string) => css`
  width: 100%;
  height: 400px;
  background-image: url(${thumbnail});
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
