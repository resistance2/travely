import { useTabStore } from '@/stores/useTabStore';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MyTravelTab = () => {
  const { selectedTab, setSelectedTab } = useTabStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/my-page/my-travel-list') {
      setSelectedTab('참여한 여행');
    } else if (location.pathname === '/my-page/my-created-travel') {
      setSelectedTab('내가 만든 여행');
    }
  }, [location.pathname, setSelectedTab]);

  const handleTabClick = (tab: '참여한 여행' | '내가 만든 여행') => {
    setSelectedTab(tab);
    if (tab === '참여한 여행') {
      navigate('/my-page/my-travel-list');
    } else if (tab === '내가 만든 여행') {
      navigate('/my-page/my-created-travel');
    }
  };

  return (
    <TabContainer>
      <TabButton
        selected={selectedTab === '참여한 여행'}
        onClick={() => handleTabClick('참여한 여행')}
      >
        참여한 여행
      </TabButton>
      <TabButton
        selected={selectedTab === '내가 만든 여행'}
        onClick={() => handleTabClick('내가 만든 여행')}
      >
        내가 만든 여행
      </TabButton>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  width: 270px;
  margin-bottom: 20px;
  gap: 30px;
`;

const TabButton = styled.button<{ selected: boolean }>`
  cursor: pointer;
  background-color: transparent;
  text-align: start;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#2467E3' : '#888888')};
`;

export default MyTravelTab;
