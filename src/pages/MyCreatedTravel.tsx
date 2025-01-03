import MyTravelContent from '@/components/myTravel/MyTravelContent';
import MyTravelTab from '@/components/myTravel/MyTravelTab';
import { useTabStore } from '@/stores/useTabStore';
import { Outlet } from 'react-router-dom';

const MyCreatedTravel = () => {
  const { selectedTab } = useTabStore();
  const managePage = location.pathname.startsWith('/my-page/my-created-travel/manage-my-travel/');
  return (
    <div>
      {managePage ? null : (
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
