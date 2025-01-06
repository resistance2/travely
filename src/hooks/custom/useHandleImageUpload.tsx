import getImageUrls from '@/api/addTravel/getImageUrls';
import { ImageStore } from '@/stores/useImageStore';
import prepareImageUpload from '@/utils/prepareImageUpload';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

const useHandleImageUpload = (images: ImageStore) => {
  const preparedImageData = useRef<FormData | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: getImageUrls,
    onError: (error) => {
      console.warn(error);
    },
    onSettled: () => {
      preparedImageData.current = null;
    },
  });

  const uploadImages = async () => {
    if (images.thumbnail === '') {
      alert('썸네일은 필수입니다.');
      return;
    }
    preparedImageData.current = prepareImageUpload(images);
    const res = await mutateAsync(preparedImageData.current);
    return res;
  };

  return { uploadImages };
};
export default useHandleImageUpload;
