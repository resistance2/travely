import { css } from '@emotion/react';
import { AlarmClock, LandPlot, MapPin } from 'lucide-react';
import Check from '@/assets/check.png';
import Remove from '@/assets/remove.png';
import useMoreBtn from '@/hooks/custom/useMoreBtn';
import FAQ from './FAQ';
import ReviewCard from '@/components/myReview/ReviewCard';
import { Review } from '@/types/reviewType';

import MoreBtn from '@/components/detail/MoreBtn';
import Rating from '@/components/Rating';

const TravelInformation = ({ children }: { children: React.ReactNode }) => {
  return <div css={container}>{children}</div>;
};

const Course = ({ course }: { course: string[] }) => {
  const { isOpen, handleToggle } = useMoreBtn();
  const slicedCourse = course?.length > 4 && !isOpen ? course.slice(0, 4) : course;
  return (
    <div css={courseWrapper}>
      <p>여행 코스</p>
      {slicedCourse?.map((c) => (
        <div key={c}>
          <MapPin size={20} />
          <span>{c}</span>
        </div>
      ))}
      {course?.length > 4 && <MoreBtn isOpen={isOpen} onChange={handleToggle} />}
    </div>
  );
};

const Notice = ({ type, notice }: { type: 'include' | 'exclude'; notice: string[] }) => {
  return (
    <div css={noticeWrapper}>
      <div>
        {type === 'include' ? (
          <>
            <img src={Check} alt="check" />
            <p>포함되어 있어요</p>
          </>
        ) : (
          <>
            <img src={Remove} alt="check" />
            <p>미포함된 사항이에요. 주의 해주세요.</p>
          </>
        )}
      </div>
      <ul>{notice?.map((item) => <li key={item}>• {item}</li>)}</ul>
    </div>
  );
};

const Meeting = ({
  meetingTime,
  meetingPlaceSrc,
}: {
  meetingTime: string[];
  meetingPlaceSrc: string;
}) => {
  return (
    <div css={meetingWrapper}>
      <p>이용 안내</p>
      <span>
        <AlarmClock size={20} />
        만나는 시간
      </span>
      <ul>{meetingTime?.map((time) => <li key={time}>• {time}</li>)}</ul>
      <span>
        <LandPlot size={20} />
        만나는 장소
      </span>
      <img src={meetingPlaceSrc} alt="meeting-place" />
    </div>
  );
};

const FAQList = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  return (
    <div css={qnaWrapper}>
      <p>자주 묻는 질문</p>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <FAQ question={faq.question} answer={faq.answer} />
        </div>
      ))}
    </div>
  );
};

const ReviewList = ({ reviews, totalRating }: { reviews: Review[]; totalRating: number }) => {
  const { isOpen, handleToggle } = useMoreBtn();
  const slicedReviews = reviews?.length > 3 && !isOpen ? reviews.slice(0, 3) : reviews;

  return (
    <div css={reviewContainer}>
      <div css={reviewHeader}>
        <h2>후기</h2>
        <Rating rating={totalRating} reviewCount={reviews?.length} size="medium" />
      </div>
      <div>
        {slicedReviews?.length > 0 ? (
          slicedReviews.map((review: Review) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
              showTitle={false}
              showUser={true}
              showDelete={false}
              showDate={false}
            />
          ))
        ) : (
          <div css={nodata}>등록된 리뷰가 없습니다.</div>
        )}
      </div>
      {reviews?.length > 3 && <MoreBtn isOpen={isOpen} onChange={handleToggle} />}
    </div>
  );
};

export default Object.assign(TravelInformation, {
  Course,
  Notice,
  Meeting,
  FAQList,
  ReviewList,
});

const column = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const text = css`
  font-size: 18px;
  font-weight: 600;
`;

const container = css`
  width: 680px;
  ${column};
  gap: 20px;
  color: #333;
`;

const courseWrapper = css`
  ${column};
  gap: 10px;
  p {
    ${text};
    margin-top: 10px;
  }
  div {
    display: flex;
    gap: 10px;
    border-radius: 8px;
    background-color: #f8f8f8;
    padding: 10px;
  }
`;

const noticeWrapper = css`
  ${column};
  margin-bottom: 10px;
  div {
    display: flex;
    margin: 10px 0;
    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      margin-right: 10px;
    }
    p {
      ${text};
    }
  }
  ul {
    margin-left: 20px;
  }
`;

const meetingWrapper = css`
  ${column};
  gap: 10px;
  p {
    ${text};
    margin-top: 10px;
  }
  span {
    display: flex;
    gap: 10px;
    font-weight: 600;
    align-items: center;
    margin-top: 4px;
  }
  img {
    width: 100%;
    height: 360px;
    object-fit: cover;
  }
  ul {
    margin-left: 20px;
    li {
      margin-bottom: 2px;
    }
  }
`;

const qnaWrapper = css`
  ${column};
  p {
    ${text};
    margin-top: 10px;
  }
`;

const reviewContainer = css`
  ${column};
  margin-top: 20px;
`;

const reviewHeader = css`
  display: flex;
  gap: 14px;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`;

const nodata = css`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  color: #888;
`;
