import FindGuideCard from '@/components/myFindGuide/FindGuideCard';
import { travelFindGuideMockData } from '@/data/travelFindGuideMockData';
import styled from '@emotion/styled';
import { useState } from 'react';

const FindGuideContent = () => {
  const [trips, setTrips] = useState(travelFindGuideMockData);

  const handleEnableCard = (index: number) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip, i) => (i === index ? { ...trip, travelActive: true } : trip)),
    );
  };

  return (
    <ScrollableContainer>
      <MyMadeTripsContainer>
        {trips.map((trip, index) => (
          <FindGuideCard
            key={index}
            title={trip.travelInfo.travelTitle}
            reviews={trip.travelInfo.travelReviewCount}
            onEnable={() => handleEnableCard(index)}
          />
        ))}
      </MyMadeTripsContainer>
    </ScrollableContainer>
  );
};

const ScrollableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const MyMadeTripsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

export default FindGuideContent;
