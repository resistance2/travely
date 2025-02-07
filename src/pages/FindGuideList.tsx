import BorderBtn from '@/components/BorderBtn';
import GuideCard from '@/components/findGuideList/GuideCard';
import useGetGuideList from '@/hooks/query/useGetGuideList';
import scrollToTop from '@/utils/scrollToTop';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const FindGuide = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetGuideList();

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
    <div css={findGuideWrap}>
      <div className="page-title">
        <h2>가이드 찾아요</h2>
        <BorderBtn color="#4a95f2">
          <Link to="/add-for-find-guide">가이드 찾아요 +</Link>
        </BorderBtn>
      </div>

      <div className="card-wrap">
        {cardDatas.length === 0 ? (
          <p>데이터가 없습니다</p>
        ) : (
          cardDatas.map((data, i) => <GuideCard cardData={data} key={i} />)
        )}
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

export default FindGuide;

const findGuideWrap = css`
  .page-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
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
