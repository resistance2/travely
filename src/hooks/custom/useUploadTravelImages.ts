import useHandleImageUpload from '@/hooks/custom/useHandleImageUpload';
import useImageStore from '@/stores/useImageStore';

const useUploadTravelImages = () => {
  const images = useImageStore((state) => state.images);
  const uploadImages = useHandleImageUpload().uploadImages;

  const upload = async () => {
    try {
      const { thumbnail, meetingSpace } = await uploadImages(images);
      if (!thumbnail || thumbnail[0].trim().length === 0) {
        console.error('썸네일 등록에 오류가 있습니다.');
        return false;
      }
      return {
        thumbnail: thumbnail[0],
        meetingPlace: meetingSpace[0],
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { upload };
};

export default useUploadTravelImages;
