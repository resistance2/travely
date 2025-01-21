import MyTravelContent from '@/components/myTravel/MyTravelContent';
import MyTravelTab from '@/components/myTravel/MyTravelTab';
import { useTabStore } from '@/stores/useTabStore';
import { Outlet, useParams } from 'react-router-dom';

const MyCreatedTravel = () => {
  const { selectedTab } = useTabStore();
  const { travelId } = useParams();
  return (
    <div>
      {travelId ? null : (
        <>
          <MyTravelTab />
          {selectedTab === '내가 만든 여행' && <MyTravelContent />}
        </>
      )}
      <Outlet />
    </div>
  );
};

export default MyCreatedTravel;
