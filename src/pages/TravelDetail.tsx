import { css } from '@emotion/react';
import TravelInformation from '@/components/travelDetail/TravelInformation';
import Title from '@/components/detail/Title';
import Thumbnail from '@/components/detail/Thumbnail';
import Introduction from '@/components/detail/Introduction';
import { useParams } from 'react-router-dom';
import useGetTravelDetail from '@/hooks/query/useGetTravelDetail';
import SideBar from '@/components/travelDetail/SideBar';
import useUserStore from '@/stores/useUserStore';

const TravelDetail = () => {
  const { travelId } = useParams();
  const user = useUserStore((state) => state.user);
  const { data: travelData } = useGetTravelDetail(travelId as string, user ? user.userId : null);

  if (!travelData) return null;

  return (
    <div css={travelDetailContainer}>
      <TravelInformation>
        <Title
          title={travelData.title}
          rating={travelData.totalRating || 0}
          reviewCount={travelData.reviews?.length || 0}
        />
        <Thumbnail thumbnail={travelData.thumbnail} tag={travelData.tag} />
        <Introduction content={travelData.content} />
        <TravelInformation.Course course={travelData.travelCourse} />
        {travelData.includedItems && (
          <TravelInformation.Notice type="include" notice={travelData.includedItems} />
        )}
        {travelData.excludedItems && (
          <TravelInformation.Notice type="exclude" notice={travelData.excludedItems} />
        )}
        {travelData.meetingTime && travelData.meetingPlace && (
          <TravelInformation.Meeting
            meetingTime={travelData.meetingTime}
            meetingPlaceSrc={travelData.meetingPlace}
          />
        )}
        {travelData.FAQ && <TravelInformation.FAQList faqs={travelData.FAQ} />}
        <TravelInformation.ReviewList
          reviews={travelData.reviews}
          totalRating={travelData.totalRating}
        />
      </TravelInformation>
      {travelId && <SideBar travelId={travelId} travelData={travelData} />}
    </div>
  );
};

export default TravelDetail;

const travelDetailContainer = css`
  display: flex;
  justify-content: space-between;
`;
