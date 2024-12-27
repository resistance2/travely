import { css } from '@emotion/react';
import SideContainerHeader from '../components/travelDetail/SideContainerHeader';
import SideTravelTeam, { TeamInfo } from '../components/travelDetail/SideTravelTeam';
import image from '../assets/kt.jpg';
import Location from '../assets/map.png';
import TravelInformation from '@/components/travelDetail/TravelInformation';
import Title from '@/components/detail/Title';
import Thumbnail from '@/components/detail/Thumbnail';
import Introduction from '@/components/detail/Introduction';

const TravelDetail = () => {
  const price = 123000;
  const bookmark = 27;

  const faqs = [
    {
      question: '비용은어떻게되나요',
      answer:
        '오른쪽에 나와있습니다. 오른쪽에 나와있습니다. 오른쪽에 나와있습니다. 오른쪽에 나와있습니다. 오른쪽에 나와있습니다. 오른쪽에 나와있습니다.오른쪽에 나와있습니다',
    },
    {
      question: '위치는 어디인가요',
      answer: '위쪽에 나와있습니다',
    },
  ];

  const teams: TeamInfo[] = [
    { period: '25.01.25 ~ 25.02.25', maxMembers: 7, mbtiList: ['ENTJ', 'INFJ', 'ISFJ', 'INFP'] },
    { period: '25.03.01 ~ 25.03.10', maxMembers: 5, mbtiList: ['ESTP', 'INTJ', 'ESFP'] },
    { period: '25.04.15 ~ 25.04.20', maxMembers: 6, mbtiList: ['ENFJ', 'ISTP', 'ENFP', 'ISTJ'] },
    { period: '25.05.05 ~ 25.05.15', maxMembers: 4, mbtiList: ['INTP', 'ESFJ'] },
  ];

  const course = [
    '경복궁 관람 및 역사 해설',
    '창덕궁과 비밀정원 탐방',
    '점심 국밥 5그릇 싹 조질 예정',
    '종묘 탐방과 제례 문화 이해',
    '투어 끝',
  ];

  const content =
    '이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다. 이 여행은 이런저러한 여행입니다.';

  return (
    <div css={travelDetailContainer}>
      <TravelInformation>
        <Title title={'경복궁 투어'} rating={5.0} reviewCount={23} />
        <Thumbnail thumbnail={image} tag={['k-pop', '경복궁']} />
        <Introduction content={content} />
        <TravelInformation.Course course={course} />
        <p css={noticeTitle}>포함 • 미포함 사항</p>
        <TravelInformation.Notice type="include" notice={['식대', '숙박']} />
        <TravelInformation.Notice type="exclude" notice={['교통비']} />
        <TravelInformation.Meeting
          meetingTime={['수원역 오전8시', '경복궁 오전10시']}
          meetingPlaceSrc={Location}
        />
        <TravelInformation.FAQList faqs={faqs} />
      </TravelInformation>
      <div css={sideContainer}>
        <SideContainerHeader price={price} bookmark={bookmark} />
        <SideTravelTeam teams={teams} />
      </div>
    </div>
  );
};

export default TravelDetail;

const travelDetailContainer = css`
  display: flex;
  justify-content: space-between;
`;

const sideContainer = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: sticky;
  margin-top: 82px;
`;

const noticeTitle = css`
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
`;
