import FloatingMenu from '@/components/addTravel/FloatingMenu';
import Introduction from '@/components/addTravel/Introduction';
import ScheduleTeam from '@/components/addTravel/ScheduleTeam';
import Thumbnail from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import { addTravelWrapper, noneStyleInput, pageLayoutWrapper } from '@/pages/AddTravel';
import useSectionsStore from '@/stores/useSectionsStore';
import { useRef } from 'react';

const AddForFindGuide = () => {
  const sections = useSectionsStore((state) => state.sections);
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <div css={pageLayoutWrapper}>
      <div css={addTravelWrapper}>
        <h1>가이드를 찾습니다</h1>
        <GrayBack title={'제목'} padding={true}>
          <input
            ref={titleRef}
            css={noneStyleInput}
            type="text"
            placeholder="30자 내외로 작성해주세요."
          />
        </GrayBack>
        {sections.includes('대표이미지') && <Thumbnail type="thumbnail" />}
        <Introduction />
        <ScheduleTeam />
      </div>

      <FloatingMenu />
    </div>
  );
};

export default AddForFindGuide;
