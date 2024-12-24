import { css } from '@emotion/react';
import MoreBtn from '../detail/MoreBtn';
import { AlarmClock, LandPlot, MapPin } from 'lucide-react';
import Check from '@/assets/check.png';
import Remove from '@/assets/remove.png';
import useMoreBtn from '@/hooks/custom/useMoreBtn';

const TravelInformation = ({ children }: { children: React.ReactNode }) => {
  return <div css={container}>{children}</div>;
};

const Course = ({ course }: { course: string[] }) => {
  const { isOpen, handleToggle } = useMoreBtn();
  const slicedCourse = course.length > 4 && !isOpen ? course.slice(0, 4) : course;
  return (
    <div css={courseWrapper}>
      <p>여행 코스</p>
      {slicedCourse.map((c) => (
        <div key={c}>
          <MapPin size={20} />
          <span>{c}</span>
        </div>
      ))}
      {course.length > 4 && <MoreBtn isOpen={isOpen} onChange={handleToggle} />}
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
            <span>포함되어 있어요</span>
          </>
        ) : (
          <>
            <img src={Remove} alt="check" />
            <span>미포함된 사항이에요. 주의 해주세요.</span>
          </>
        )}
      </div>
      <ul>{notice && notice.map((item) => <li key={item}>• {item}</li>)}</ul>
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
      <ul>
        {meetingTime.map((time) => (
          <li key={time}>• {time}</li>
        ))}
      </ul>
      <span>
        <LandPlot size={20} />
        만나는 장소
      </span>
      <img src={meetingPlaceSrc} alt="meeting-place" />
    </div>
  );
};

export default Object.assign(TravelInformation, {
  Course,
  Notice,
  Meeting,
});

const container = css`
  width: 680px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const courseWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 18px;
    font-weight: 600;
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
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  p {
    font-size: 18px;
  }
  div {
    display: flex;
    margin-bottom: 10px;
    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      margin-right: 10px;
    }
    span {
      font-weight: 600;
    }
  }
  ul {
    margin-left: 20px;
  }
`;

const meetingWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
  }
  span {
    display: flex;
    gap: 6px;
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
