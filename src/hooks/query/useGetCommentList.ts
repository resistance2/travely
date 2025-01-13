import getCommentList from '@/api/findGuideDetail/getCommentList';
import { COMMENT_LIST } from '@/constants/queyKey';
import { useQuery } from '@tanstack/react-query';

const useGetCommentList = (guidePostId: string, page: number) => {
  return useQuery({
    queryKey: [COMMENT_LIST, guidePostId],
    queryFn: () => getCommentList(guidePostId, page),
  });
};

export default useGetCommentList;
