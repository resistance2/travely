import { css } from '@emotion/react';
import SideContainerHeader from '../components/travelDetail/SideContainerHeader';
import SideTravelTeam, { TeamInfo } from '../components/travelDetail/SideTravelTeam';
import image from '../assets/kt.jpg';
import Location from '../assets/map.png';
import TravelInformation from '@/components/travelDetail/TravelInformation';
import Title from '@/components/detail/Title';
import Thumbnail from '@/components/detail/Thumbnail';
import Introduction from '@/components/detail/Introduction';
import reviewImage from '@/assets/reviewImg.png';
import { Review } from '@/types/reviewType';

import defaultProfile from '@/assets/defaultProfile.jpg';
const data: { reviews: Review[] } = {
  reviews: [
    {
      id: 1,
      title: '대한 고궁 투어',
      content:
        '경복궁은 한국의 역사와 전통을 온전히 느낄 수 있는 곳이었어요. 정문인 광화문을 지나 들어서면 웅장한 근정전과 경회루가 시선을 사로잡고, 조용한 연못과 정원은 마치 옛 시대로 돌아간 듯한 기분을 주었답니다. 주변의 한복 대여점에서 한복을 입고 방문하니 더욱 특별한 추억으로 남았어요. 고즈넉한 분위기 속에서 시간을 보내며 한국의 멋과 아름다움을 새삼 느낄 수 있었던 시간이었어요.',
      imgSrc: reviewImage,
      createdAt: new Date('2024-10-25'),
      reviewCount: 10,
      rating: 4.5,
      user: {
        userId: 'user1',
        socialName: '김철수',
        userProfileImage: defaultProfile,
        userEmail: 'nadsa@gmail.com"',
        isVerifiedUser: false,
      },
    },
    {
      id: 2,
      title: '대한 고궁 투어',
      content:
        '경복궁은 한국의 역사와 전통을 온전히 느낄 수 있는 곳이었어요. 정문인 광화문을 지나 들어서면 웅장한 근정전과 경회루가 시선을 사로잡고, 조용한 연못과 정원은 마치 옛 시대로 돌아간 듯한 기분을 주었답니다. 주변의 한복 대여점에서 한복을 입고 방문하니 더욱 특별한 추억으로 남았어요. 고즈넉한 분위기 속에서 시간을 보내며 한국의 멋과 아름다움을 새삼 느낄 수 있었던 시간이었어요.',
      imgSrc: reviewImage,
      createdAt: new Date('2024-10-25'),
      reviewCount: 10,
      rating: 5.0,
      user: {
        userId: 'user2',
        socialName: '김만두',
        userProfileImage: defaultProfile,
        userEmail: 'dsdasd@gmail.com',
        isVerifiedUser: false,
      },
    },
    {
      id: 3,
      title: '대한 고궁 투어',
      content:
        '경복궁은 한국의 역사와 전통을 온전히 느낄 수 있는 곳이었어요. 정문인 광화문을 지나 들어서면 웅장한 근정전과 경회루가 시선을 사로잡고, 조용한 연못과 정원은 마치 옛 시대로 돌아간 듯한 기분을 주었답니다. 주변의 한복 대여점에서 한복을 입고 방문하니 더욱 특별한 추억으로 남았어요. 고즈넉한 분위기 속에서 시간을 보내며 한국의 멋과 아름다움을 새삼 느낄 수 있었던 시간이었어요.',
      imgSrc: reviewImage,
      createdAt: new Date('2024-10-25'),
      reviewCount: 10,
      rating: 4.7,
      user: {
        userId: 'user3',
        socialName: '김만두2',
        userProfileImage: defaultProfile,
        userEmail: 'dsdasd2@gmail.com',
        isVerifiedUser: false,
      },
    },
  ],
};

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
        <TravelInformation.ReviewList reviews={data.reviews} />
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
