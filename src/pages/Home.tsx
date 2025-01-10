import GuideCard from '@/components/findGuideList/GuideCard';
import TagCardWrap from '@/components/TagCardWrap';
import TravelCard from '@/components/traveList/TravelCard';
import { HOME_GUIDE_LIST, HOME_TRAVEL_LIST } from '@/constants/queyKey';
import { SERVER } from '@/constants/url';
// import travelCardMockData from '@/data/travelCardMockData';
import useUserStore from '@/stores/useUserStore';
import { IGuideCard } from '@/types/guideCardType';
import { ITravelCard } from '@/types/travelCardType';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

// const mockDatas = travelCardMockData;

const Home = () => {
  const user = useUserStore((state) => state.user);
  const userId = user ? user.userId : null;
  const {
    data: travelData,
    isLoading: isTravelLoading,
    isError: isTravelError,
  } = useQuery({
    queryKey: [HOME_TRAVEL_LIST, userId],
    queryFn: () => fetchHomeTravelList(userId),
  });

  const {
    data: guideData,
    isLoading: isGuideLoading,
    isError: isGuideError,
  } = useQuery({
    queryKey: [HOME_GUIDE_LIST, userId],
    queryFn: () => fetchHomeGuideList(userId),
  });

  const fetchHomeTravelList = async (userId: string | null): Promise<ITravelCard[]> => {
    try {
      const res = await axios.get(
        `${SERVER}/api/v1/travels/travel-list?userId=${userId}&page=1&size=8`,
      );
      return res.data.data.travels;
    } catch (error) {
      console.error('여행 목록을 조회하는데 실패했습니다: ' + error);
      throw error;
    }
  };

  const fetchHomeGuideList = async (userId: string | null): Promise<IGuideCard[]> => {
    try {
      const res = await axios.get(
        `${SERVER}/api/v1/travels-guide/travel-list?userId=${userId}&page=1&size=8`,
      );

      return res.data.data.travels;
    } catch (error) {
      console.error('여행 목록을 조회하는데 실패했습니다: ' + error);
      throw error;
    }
  };

  if (isTravelLoading || isGuideLoading) {
    return <p>loading...</p>;
  }

  if (isTravelError || isGuideError) {
    alert('오류가 발생했습니다.');
    return null;
  }

  return (
    <div css={home}>
      <TagCardWrap shape="square" />

      <div className="card-wrap">
        <h3>
          <Link to="/travel-list">🔥 함께 떠나요 NEW</Link>
        </h3>
        <div className="grid">
          {travelData?.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            travelData?.map((data, i) => <TravelCard cardData={data} key={i} />)
          )}
        </div>
      </div>

      <div className="card-wrap">
        <h3>
          <Link to="/travel-list">🔥 가이드 찾아요 NEW</Link>
        </h3>
        <div className="grid">
          {guideData?.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            guideData?.map((data, i) => <GuideCard cardData={data} key={i} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

const home = css`
  h2 {
    margin: 30px 0;
  }
  .card-wrap {
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 250px);
      justify-content: space-between;
      gap: 20px 0;
    }
    h3 {
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      margin-top: 50px;
    }
  }
`;
