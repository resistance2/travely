import postForFindGuide from '@/api/addForFindGuide/postForFindGuide';
import { ShowToast } from '@/components/Toast';
import { GUIDE_LIST, HOME_GUIDE_LIST } from '@/constants/queryKey';
import useResetAddTravel from '@/hooks/custom/useResetAddTravel';
import { AddForFindGuideData } from '@/types/guideFindDataType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostForFindGuide = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const resetAddTravel = useResetAddTravel().resetAddTravel;
  return useMutation({
    mutationFn: ({ dataToUpload }: { dataToUpload: AddForFindGuideData }) =>
      postForFindGuide(dataToUpload),

    onSuccess: () => {
      ShowToast('작성하신 글이 업로드 되었습니다.', 'success');
      resetAddTravel();
      queryClient.invalidateQueries({ queryKey: [GUIDE_LIST] });
      queryClient.invalidateQueries({ queryKey: [HOME_GUIDE_LIST] });
      navigate('/find-guide');
    },

    onError: () => {
      ShowToast('업로드 중 오류가 발생하였습니다. 다시 시도해주세요.', 'failed');
    },
  });
};

export default usePostForFindGuide;
