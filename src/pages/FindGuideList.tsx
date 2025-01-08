import BorderBtn from '@/components/BorderBtn';
import GuideCard from '@/components/findGuideList/GuideCard';
import guideCardMockData from '@/data/guideCardMockData';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const mockDatas = guideCardMockData;

const FindGuide = () => {
  return (
    <div css={findGuideWrap}>
      <div className="page-title">
        <h2>가이드 찾아요</h2>
        <BorderBtn color="#4a95f2">
          <Link to="/add-for-find-guide">가이드 찾아요 +</Link>
        </BorderBtn>
      </div>

      <div className="card-wrap">
        {mockDatas.map((data, i) => (
          <GuideCard cardData={data} key={i} />
        ))}
      </div>
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
`;
