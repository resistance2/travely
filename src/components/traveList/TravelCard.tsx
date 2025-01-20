import Price from '@/components/Price';
import Rating from '@/components/Rating';
import Tags from '@/components/Tags';
import { ShowToast } from '@/components/Toast';
import useUpdateBookmark from '@/hooks/query/useUpdateBookmark';
import useUserStore from '@/stores/useUserStore';
import { ITravelCard } from '@/types/travelCardType';
import { css } from '@emotion/react';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ITravelCardDataProps {
  cardData: ITravelCard;
}

const TravelCard: React.FC<ITravelCardDataProps> = ({ cardData }) => {
  const { id, thumbnail, travelTitle, createdBy, price, review, tag, bookmark } = cardData;
  const [isBookmark, setIsBookmark] = useState(bookmark);
  const { mutate: bookMarkMutate } = useUpdateBookmark();
  const userId = useUserStore((state) => state.user?.userId);

  const ToggleBookMark = () => {
    if (!userId) {
      ShowToast('로그인 후 이용하실 수 있습니다.', 'failed');
      return;
    }
    setIsBookmark((prev) => !prev);
    const newBookmarkState = !isBookmark;
    bookMarkMutate({ userId, travelId: id, isBookmark: newBookmarkState });
  };

  return (
    <Link to={`/travel-detail/${id}`}>
      <div css={card}>
        <div className="card-img">
          <img src={thumbnail} alt="" />
          <div className="img-cover"></div>
        </div>
        <div className="card-content">
          <p className="title">{travelTitle}</p>
          <div>
            <p className="user-name">{createdBy.userName}</p>
            <div className="price">
              <Price price={price} />
            </div>
            <div className="rating-tags">
              <Rating rating={Number(review.travelScore)} reviewCount={Number(review.reviewCnt)} />
              <Tags items={tag} textAlign="right" />
            </div>
          </div>
        </div>
        <p
          className="book-mark"
          onClick={(event) => {
            event.preventDefault();
            ToggleBookMark();
          }}
        >
          <Bookmark
            className={`check-${isBookmark}`}
            size="23"
            stroke={isBookmark ? '#4a95f2' : '#fff'}
            strokeWidth="1.5"
            fill={isBookmark ? '#4a95f2' : 'none'}
          />
        </p>
      </div>
    </Link>
  );
};

export default TravelCard;

const card = () => css`
  width: 250px;
  height: 320px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .card-img {
    width: 100%;
    height: 180px;
    overflow: hidden;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .img-cover {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.02);
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    border-top: 0;
    box-sizing: border-box;

    .title {
      font-size: 15px;
      font-weight: bold;
    }

    .user-name {
      margin-bottom: 6px;
      font-size: 12px;
      color: #666;
    }

    .price {
      margin-bottom: 6px;
    }

    .rating-tags {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .book-mark {
    position: absolute;
    top: 10px;
    right: 10px;
    svg {
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
    }
    svg.check-true {
      stroke: #4a95f2;
      fill: #4a95f2;
    }
    svg.check-false {
      stroke: #fff;
      fill: none;
    }
    &:hover {
      svg.check-false {
        stroke: #4a95f2;
        fill: none;
        filter: drop-shadow(0px 2px 4px rgba(74, 149, 242, 0.3));
      }
    }
  }
`;
