import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateToTravelList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nowTag = location.pathname.split('/')[2] || '전체';

  const navigateToTravelList = (nextTag?: string) => {
    if (!nextTag) {
      navigate(`/travel-list`, { state: nowTag });
    } else {
      navigate(`/travel-list/${nextTag}`, { state: nowTag });
    }
  };

  return navigateToTravelList;
};
