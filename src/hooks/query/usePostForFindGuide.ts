import postForFindGuide from '@/api/addForFindGuide/postForFindGuide';
import { ShowToast } from '@/components/Toast';
import { TRAVEL_GUIDE_LIST } from '@/constants/queryKey';
import useFieldStore from '@/stores/useFieldStore';
import useImageStore from '@/stores/useImageStore';
import useSectionsStore from '@/stores/useSectionsStore';
import { AddForFindGuideData } from '@/types/guideFindDataType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostForFindGuide = () => {
  const navigate = useNavigate();
  const resetImages = useImageStore((state) => state.actions.resetImages);
  const resetField = useFieldStore((state) => state.actions.resetField);
  const resetSections = useSectionsStore((state) => state.resetSections);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dataToUpload }: { dataToUpload: AddForFindGuideData }) =>
      postForFindGuide(dataToUpload),

    onSuccess: () => {
      ShowToast('작성하신 글이 업로드 되었습니다.', 'success');
      setTimeout(() => {
        resetImages();
        resetField();
        resetSections();
        navigate('/find-guide');
        queryClient.invalidateQueries({ queryKey: [TRAVEL_GUIDE_LIST] });
      }, 300);
    },

    onError: () => {
      ShowToast('업로드 중 오류가 발생하였습니다. 다시 시도해주세요.', 'failed');
    },
  });
};

export default usePostForFindGuide;
