import BorderBtn from '@/components/BorderBtn';
import TagCardWrap from '@/components/TagCardWrap';
import TravelCard from '@/components/traveList/TravelCard';
import { tagDatas } from '@/data/tagDatas';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import SkeletonTravelCard from '@/components/SkeletonTravelCard';
import scrollToTop from '@/utils/scrollToTop';
import useGetTravelList from '@/hooks/query/useGetTravelList';
import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TRAVEL_LIST } from '@/constants/queryKey';

const TravelList = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const path = location.pathname.split('/').filter((item) => item !== '')[1] || '전체';
  const currentTag = tagDatas.find((data) => data.path === path) || { name: '전체', path: '전체' };
  const { name: pageTitle, path: searchTag } = currentTag;

  const navigate = useNavigate();

  const resetQueryData = useCallback(() => {
    queryClient.resetQueries({ queryKey: [TRAVEL_LIST] });
  }, [queryClient]);

  useEffect(() => {
    resetQueryData();
  }, [searchTag, resetQueryData]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTravelList({
    tag: searchTag,
  });

  const { ref } = useInView({
    threshold: 1,
    skip: !hasNextPage,
    onChange: useCallback(
      (inView: boolean) => {
        if (inView && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      [hasNextPage, isFetchingNextPage, fetchNextPage],
    ),
  });

  if (!data) {
    return <></>;
  }

  const cardDatas = data.pages.flatMap((page) => page.cardDatas);
  const currentPage = data.pages[data.pages.length - 1]?.currentPage;

  return (
    <div css={travelListWrap}>
      <TagCardWrap />
      <div className="page-title">
        <h2>{pageTitle}</h2>
        <BorderBtn color="#4a95f2" onClick={() => navigate('/add-travel')}>
          여행 만들기 +
        </BorderBtn>
      </div>

      <div className="card-wrap">
        {cardDatas.length === 0 ? (
          <p>데이터가 없습니다</p>
        ) : (
          cardDatas.map((cardData, i) => <TravelCard cardData={cardData} key={i} />)
        )}
        {isFetchingNextPage && <SkeletonTravelCard />}
      </div>

      {!hasNextPage && currentPage !== 1 && (
        <BorderBtn
          className="scroll-top"
          color="#4a95f2"
          size="full"
          hover="filled"
          onClick={() => scrollToTop()}
        >
          처음으로
        </BorderBtn>
      )}
      <div className="inView-target" ref={ref}></div>
    </div>
  );
};

export default TravelList;

const travelListWrap = css`
  .page-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;

    p {
      position: fixed;
      bottom: 0;
      right: 0;
    }
  }
  .card-wrap {
    display: grid;
    grid-template-columns: repeat(4, 250px);
    justify-content: space-between;
    gap: 20px 0;
  }
  .inView-target {
    height: 1px;
  }
  .scroll-top {
    margin-top: 30px;
  }
`;
