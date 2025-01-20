import getHomeGuideList from '@/api/home/getHomeGuideList';
import getHomeTravelList from '@/api/home/getHomeTravelList';
import { HOME_GUIDE_LIST, HOME_TRAVEL_LIST } from '@/constants/queryKey';
import useUserStore from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';

const useGetHomeList = () => {
  const user = useUserStore((state) => state.user);
  const userId = user ? user.userId : null;

  const travelQuery = useQuery({
    queryKey: [HOME_TRAVEL_LIST, userId],
    queryFn: () => getHomeTravelList(userId),
  });

  const guideQuery = useQuery({
    queryKey: [HOME_GUIDE_LIST, userId],
    queryFn: () => getHomeGuideList(userId),
  });

  return {
    travel: travelQuery,
    guide: guideQuery,
  };
};

export default useGetHomeList;
