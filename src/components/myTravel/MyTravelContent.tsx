import styled from '@emotion/styled';
import TripCard from './MyTravelCard';
import useUserStore from '@/stores/useUserStore';
import useGetMyCreatedTravel from '@/hooks/query/useGetMyCreatedTravel';
import { myCreatedTravel } from '@/types/myCreatedTravelType';
import { Link } from 'react-router-dom';
import BorderBtn from '../BorderBtn';

const MyCreatedContent = () => {
  const { user } = useUserStore((state) => state);
  const { data: myCreatedTravelData } = useGetMyCreatedTravel(user?.userId as string);

  // const handleEnableCard = (index: number) => {
  //   setTrips((prevTrips) =>
  //     prevTrips.map((trip, i) => (i === index ? { ...trip, travelActive: true } : trip)),
  //   );
  // };
  // const handleEnableCard2 = (selectedTravelId: string) => {
  //   setTrips((prevTrips) =>
  //     prevTrips.map((trip) =>
  //       trip.travelId === selectedTravelId ? { ...trip, travelActive: true } : trip,
  //     ),
  //   );
  // };

  return (
    <ScrollableContainer>
      {myCreatedTravelData?.travels.length > 0 ? (
        <MyMadeTripsContainer>
          {myCreatedTravelData?.travels?.map((trip: myCreatedTravel) => (
            <TripCard
              travelId={trip.travelId}
              key={trip.travelId}
              title={trip.travelTitle}
              rating={trip.reviewAverage}
              reviews={trip.travelReviewCount}
              price={trip.travelPrice}
              badgeCount={trip.approveWatingCount}
              updateDate={trip.updatedAt}
              isDisabled={!trip.travelActive}
            />
          ))}
        </MyMadeTripsContainer>
      ) : (
        <EmptyMessage>
          여행을 생성해주세요
          <BorderBtn color="#4a95f2">
            <Link to="/add-travel">여행 만들기 +</Link>
          </BorderBtn>
        </EmptyMessage>
      )}

      {/* <MyMadeTripsContainer>
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            title={trip.travelInfo.travelTitle}
            rating={trip.travelInfo.travelTotalScore}
            reviews={trip.travelInfo.travelReviewCount}
            price={trip.travelInfo.travelPrice}
            badgeCount={trip.approveWaitingCount}
            updateDate={trip.travelInfo.updateAt}
            isDisabled={!trip.travelActive}
            onEnable={() => handleEnableCard(index)}
          />
        ))}
      </MyMadeTripsContainer> */}
    </ScrollableContainer>
  );
};

// 스타일 정의
const ScrollableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const MyMadeTripsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;
const EmptyMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin: 20px 0;
`;

export default MyCreatedContent;
