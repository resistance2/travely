import { ImageStore } from '@/stores/useImageStore';
import prepareImageUpload from '@/utils/prepareImageUpload';
import { useRef } from 'react';
import useGetImageUrls from '../query/useGetImageUrls';

const useHandleImageUpload = () => {
  const preparedImageData = useRef<FormData | null>(null);
  const { mutateAsync } = useGetImageUrls();

  const uploadImages = async (images: ImageStore) => {
    preparedImageData.current = prepareImageUpload(images);
    const res = await mutateAsync(
      { preparedImageData: preparedImageData.current },
      {
        onSettled: () => {
          preparedImageData.current = null;
        },
      },
    );
    return res;
  };

  return { uploadImages };
};
export default useHandleImageUpload;
