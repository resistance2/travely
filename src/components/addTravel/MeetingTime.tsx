import IncludeList from '@/components/addTravel/ExcludeList';
import DetailsList from '@/components/addTravel/DetailsList';
import ImageUploadField from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import { useState } from 'react';

const MeetingTime = () => {
  const [meetingPlaceImageUrl, setMeetingPlaceImageUrl] = useState('');
  return (
    <GrayBack title="이용안내" padding={true}>
      <span css={{ fontSize: '18px', fontWeight: '600' }}>만나는 시간</span>
      <DetailsList option="meetingTime" />
      <IncludeList />
      <ImageUploadField
        imageUrl={meetingPlaceImageUrl}
        setImageUrl={setMeetingPlaceImageUrl}
        title="만나는 장소"
      />
    </GrayBack>
  );
};

export default MeetingTime;
