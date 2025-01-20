import GuideCard from '@/components/findGuideList/GuideCard';
import TagCardWrap from '@/components/TagCardWrap';
import TravelCard from '@/components/traveList/TravelCard';
import useGetHomeList from '@/hooks/query/useGetHomeList';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { travel, guide } = useGetHomeList();

  if (travel.isLoading || guide.isLoading) {
    return <></>;
  }

  if (travel.isLoading || guide.isLoading) {
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
          {travel.data?.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            travel.data?.map((data, i) => <TravelCard cardData={data} key={i} />)
          )}
        </div>
      </div>

      <div className="card-wrap">
        <h3>
          <Link to="/find-guide">🔥 가이드 찾아요 NEW</Link>
        </h3>
        <div className="grid">
          {guide.data?.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            guide.data?.map((data, i) => <GuideCard cardData={data} key={i} />)
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
