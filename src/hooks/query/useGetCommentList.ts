import getCommentList from '@/api/findGuideDetail/getCommentList';
import { COMMENT_LIST } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetCommentList = (guidePostId: string, page: number) => {
  return useQuery({
    queryKey: [COMMENT_LIST, guidePostId, page],
    queryFn: () => getCommentList(guidePostId, page),
  });
};

export default useGetCommentList;
