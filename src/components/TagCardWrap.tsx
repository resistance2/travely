import { tagDatas } from '@/data/tagDatas';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ITagCardWrap {
  shape?: 'round' | 'square';
}
const tags = tagDatas;

function TagCardWrap({ shape = 'round' }: ITagCardWrap) {
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);

  if (shape === 'round') {
    return (
      <ul css={tagCardWrap}>
        {tags.map((tag, i) => (
          <li key={i}>
            <Link to={`/travel-list/${tag.path}`}>
              <div className="tag-img">
                <img
                  src={tag.imgSrc}
                  alt={tag.name}
                  loading="lazy"
                  width="90"
                  height="90"
                  fetchPriority={i < 4 ? 'high' : 'low'}
                />
              </div>
              <p className="tag-name">{tag.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div css={squareTagCardWrap} className="tagCard-wrap">
        <ChevronRight
          className="custom-swiper-btn-next"
          size="50"
          color={isEnd ? '#abcefa' : '#4a95f2'}
        />
        <ChevronLeft
          className="custom-swiper-btn-prev"
          size="50"
          color={isBeginning ? '#abcefa' : '#4a95f2'}
        />
        <Swiper
          spaceBetween={26}
          slidesPerView={4}
          slidesPerGroup={4}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.tagCard-wrap .custom-swiper-btn-next',
            prevEl: '.tagCard-wrap .custom-swiper-btn-prev',
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {tags.map((tag, i) => (
            <SwiperSlide key={i}>
              <div className="card">
                <Link to={`/travel-list/${tag.path}`}>
                  <div className="card-img">
                    <img
                      src={tag.imgSrc}
                      alt={tag.name}
                      loading="lazy"
                      width="350"
                      height="350"
                      fetchPriority={i < 4 ? 'high' : 'low'}
                    />
                  </div>
                  <p>{tag.name}</p>
                  <div className="btn-list">둘러보기</div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default TagCardWrap;

const tagCardWrap = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  li {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    .tag-img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .tag-name {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      font-weight: bold;
      color: #fff;
    }
  }
  li:hover {
    transform: translateY(-3px);
    &:before {
      display: none;
    }
  }

  li:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const squareTagCardWrap = css`
  position: relative;
  padding: 45px 0 30px;
  .card {
    position: relative;
    width: 100%;
    height: 350px;
    border-radius: 10px;
    overflow: hidden;

    .btn-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 60px;
      border-radius: 8px;
      font-size: 13px;
      background-color: #fff;
      transition: transform 0.2s ease-in-out;
    }

    &:hover {
      .btn-list {
        width: 80px;
        padding-right: 24px;
        padding-left: 8px;
      }
      .btn-list:after {
        opacity: 1;
        right: 7px;
      }
      .card-img:before {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }

    .card-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.2);
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    p {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 26px;
      color: #fff;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .btn-list {
      height: 40px;
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: #333;
      font-weight: bold;
      border-radius: 4px;
      transition: 0.2s;
    }
    .btn-list:after {
      content: '»';
      position: absolute;
      opacity: 0;
      top: 10px;
      right: -20px;
      transition: 0.3s;
    }
  }
  .custom-swiper-btn-prev,
  .custom-swiper-btn-next {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
  }
  .custom-swiper-btn-prev {
    left: -55px;
  }
  .custom-swiper-btn-next {
    right: -55px;
  }
`;
