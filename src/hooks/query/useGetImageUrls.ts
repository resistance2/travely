import getImageUrls from '@/api/addTravel/getImageUrls';
import { ShowToast } from '@/components/Toast';
import { useMutation } from '@tanstack/react-query';

interface UseImageUploadProps {
  preparedImageData: FormData | null;
}

const useGetImageUrls = () => {
  return useMutation({
    mutationFn: ({ preparedImageData }: UseImageUploadProps) => getImageUrls(preparedImageData),
    onError: () => {
      ShowToast('이미지 업로드 중 오류가 발생하였습니다. 다시 시도해주세요', 'failed');
    },
  });
};
export default useGetImageUrls;
