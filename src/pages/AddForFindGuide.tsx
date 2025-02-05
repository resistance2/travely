import FloatingMenu from '@/components/addTravel/FloatingMenu';
import Introduction from '@/components/addTravel/Introduction';
import ScheduleTeam from '@/components/addTravel/ScheduleTeam';
import Thumbnail from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import useHandleImageUpload from '@/hooks/custom/useHandleImageUpload';
import useResetAddTravel from '@/hooks/custom/useResetAddTravel';
import usePostForFindGuide from '@/hooks/query/usePostForFindGuide';
import { addTravelWrapper, noneStyleInput, pageLayoutWrapper } from '@/pages/AddTravel';
import useFieldStore from '@/stores/useFieldStore';
import useImageStore from '@/stores/useImageStore';
import useSectionsStore from '@/stores/useSectionsStore';
import useUserStore from '@/stores/useUserStore';
import { addForFindGuideDataValidate, hasImageData } from '@/utils/updateDataValidate';
import { useEffect, useRef } from 'react';

const AddForFindGuide = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const sections = useSectionsStore((state) => state.sections);
  const user = useUserStore((state) => state.user);

  const { uploadImages } = useHandleImageUpload();
  const { mutate } = usePostForFindGuide();
  const resetAddTravel = useResetAddTravel().resetAddTravel;

  useEffect(() => {
    resetAddTravel();
  }, [resetAddTravel]);

  const handleFetchCheck = async () => {
    const images = useImageStore.getState().images;
    if (hasImageData(images)) {
      const res = await uploadImages({
        thumbnail: images.thumbnail,
        meetingSpace: null,
        introSrcs: [],
      });
      const thumbnail = res.thumbnail?.[0];
      handleSubmit(thumbnail);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = (thumbnail?: string) => {
    if (titleRef.current && user?.userId) {
      const { content, scheduleList } = useFieldStore.getState().fields;
      const dataToUpload = {
        userId: user.userId,
        travelTitle: titleRef.current.value,
        travelContent: content,
        thumbnail: thumbnail ? thumbnail : null,
        team: scheduleList,
      };
      if (addForFindGuideDataValidate(dataToUpload)) {
        mutate({ dataToUpload });
      }
    }
  };

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
        <Introduction title="내용" />
        <ScheduleTeam />
      </div>

      <FloatingMenu onSubmit={handleFetchCheck} />
    </div>
  );
};

export default AddForFindGuide;
