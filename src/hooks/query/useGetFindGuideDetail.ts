import getFindGuideDetail from '@/api/findGuideDetail/getFindGuideDetail';
import { FIND_GUIDE_DETAIL } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetFindGuideDetail = (guidePostId: string) => {
  return useQuery({
    queryKey: [FIND_GUIDE_DETAIL, guidePostId],
    queryFn: () => getFindGuideDetail(guidePostId),
  });
};

export default useGetFindGuideDetail;
