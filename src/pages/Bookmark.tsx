import { ShowToast } from '@/components/Toast';
import TravelCard from '@/components/traveList/TravelCard';
import useGetBookmarkList from '@/hooks/query/useGetBookmarkList';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
const Bookmark = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookmarkList();

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    ShowToast('북막크 리스트를 불러오는데 오류가 발생했습니다.', 'failed');
    navigate('/');
    return null;
  }

  return (
    <div css={bookmarkWrap}>
      <div className="page-title">
        <h2>북마크</h2>
      </div>

      <div className="card-wrap">
        {data && data.length === 0 ? (
          <div>북마크를 추가해보세요!</div>
        ) : (
          data?.map((d, i) => <TravelCard cardData={d} key={i} />)
        )}
      </div>
    </div>
  );
};

export default Bookmark;

const bookmarkWrap = css`
  .page-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
  }
  .card-wrap {
    display: grid;
    grid-template-columns: repeat(4, 250px);
    justify-content: space-between;
    gap: 20px 0;
  }
`;
