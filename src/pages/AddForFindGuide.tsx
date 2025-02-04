import FloatingMenu from '@/components/addTravel/FloatingMenu';
import Introduction from '@/components/addTravel/Introduction';
import ScheduleTeam from '@/components/addTravel/ScheduleTeam';
import ImageUploadField from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import usePostForFindGuide from '@/hooks/query/usePostForFindGuide';
import { addTravelWrapper, noneStyleInput, pageLayoutWrapper } from '@/pages/AddTravel';
import useFieldStore from '@/stores/useFieldStore';
import useUserStore from '@/stores/useUserStore';
import { addForFindGuideDataValidate } from '@/utils/updateDataValidate';
import { useRef, useState } from 'react';

const AddForFindGuide = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const { mutate } = usePostForFindGuide();

  const [sections, setSections] = useState<string[]>(['제목', '글 내용', '일정 및 팀 추가']);

  const setOpenSection = (section: string) => {
    if (sections.includes(section)) {
      setSections(sections.filter((s) => s !== section));
    } else {
      setSections([...sections, section]);
    }
  };

  const [thumbnail, setThumbnail] = useState('');
  const [scheduleList, setScheduleList] = useState<
    {
      personLimit: number;
      travelStartDate: string;
      travelEndDate: string;
    }[]
  >([]);

  const handleAddSchedule = (newField: {
    personLimit: number;
    travelStartDate: string;
    travelEndDate: string;
  }) => {
    setScheduleList([...scheduleList, newField]);
  };

  const handleRemoveSchedule = (index: number) => {
    setScheduleList(scheduleList.filter((_, i) => i !== index));
  };

  // const handleFetchCheck = async () => {
  //   const images = useImageStore.getState().images;
  //   if (hasImageData(images)) {
  //     handleImageUpload(images);
  //     return;
  //   }
  //   handleSubmit();
  // };

  // const handleImageUpload = async (images: ImageStore) => {
  //   const res = await uploadImages(images);
  //   const introSrcs = res.introSrcs.reverse();
  //   const thumbnail = res.thumbnail?.[0];
  //   if (introSrcs?.length > 0 && fields.content !== '') {
  //     await setContent(replaceImageSrc(fields.content, introSrcs));
  //   }
  //   handleSubmit(thumbnail);
  // };

  const [content, setContent] = useState<string>('');
  const handleSubmit = () => {
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
        {sections.includes('대표이미지') && (
          <ImageUploadField imageUrl={thumbnail} setImageUrl={setThumbnail} title="대표이미지" />
        )}
        <Introduction title="내용" content={content} setContent={setContent} />
        <ScheduleTeam
          scheduleList={scheduleList}
          addField={handleAddSchedule}
          removeField={handleRemoveSchedule}
        />
      </div>

      <FloatingMenu onSubmit={handleSubmit} sections={sections} setOpenSection={setOpenSection} />
    </div>
  );
};

export default AddForFindGuide;
