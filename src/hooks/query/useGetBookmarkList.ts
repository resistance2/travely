import getBookmarkList from '@/api/bookmark/getBookmarkList';
import { BOOKMARK_LIST } from '@/constants/queryKey';
import useUserStore from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';

const useGetBookmarkList = () => {
  const userId = useUserStore((state) => state.user?.userId);
  return useQuery({
    queryKey: [BOOKMARK_LIST, userId],
    queryFn: () => getBookmarkList(userId as string),
    enabled: !!userId,
  });
};

export default useGetBookmarkList;
