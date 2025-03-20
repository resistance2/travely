import { useMutation } from '@tanstack/react-query';
import { ShowToast } from '@/components/Toast';
// import getImageUrl from '@/api/addTravel/getImageUrl';
import { uploadImageWithPresignedUrl } from '@/api/addTravel/uploadImageWithPresignedUrl';

export interface UseImageUploadProps {
  file: File;
}

const useGetImageUrl = () => {
  return useMutation<string, Error, UseImageUploadProps>({
    mutationFn: ({ file }) => uploadImageWithPresignedUrl(file, 'travel'),
    onError: () => {
      ShowToast('이미지 업로드 중 오류가 발생하였습니다. 다시 시도해주세요', 'failed');
    },
    onSuccess: (imageUrl) => {
      ShowToast('이미지 업로드에 성공했습니다.', 'success');
      return imageUrl;
    },
  });
};

export default useGetImageUrl;
