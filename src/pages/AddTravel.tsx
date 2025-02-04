import ChoiceTags from '@/components/addTravel/ChoiceTags';
import Course from '@/components/addTravel/Course';
import ScheduleTeam from '@/components/addTravel/ScheduleTeam';
import Details from '@/components/addTravel/Details';
import ImageUploadField from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import { css } from '@emotion/react';
import Introduction from '@/components/addTravel/Introduction';
import FloatingMenu from '@/components/addTravel/FloatingMenu';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useHandleAddTravel from '@/hooks/custom/useHandleAddTravel';
import { useState } from 'react';
import { TagType } from '@/types/tagType';

const AddTravel = () => {
  const setData = useAddTravelStore((state) => state.setData);
  const data = useAddTravelStore((state) => state.data);
  const handleAddTravel = useHandleAddTravel().handleAddTravel;
  const [sections, setSections] = useState<string[]>([
    '제목',
    '대표 이미지',
    '상품소개',
    '코스',
    '태그',
    '예약 생성',
    '가격',
  ]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [courseList, setCourseList] = useState<string[]>([]);
  const [choseTag, setChoseTag] = useState<TagType[]>([]);

  const handleAddCourse = (newField: string) => {
    setCourseList([...courseList, newField]);
  };

  const handleRemoveCourse = (index: number) => {
    setCourseList(courseList.filter((_, i) => i !== index));
  };

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

  const setOpenSection = (section: string) => {
    if (sections.includes(section)) {
      setSections(sections.filter((s) => s !== section));
    } else {
      setSections([...sections, section]);
    }
  };

  const changeHandlers = {
    changeTitle: (travelTitle: string) => {
      setData({ travelTitle });
    },

    changePrice: (travelPrice: number) => {
      setData({ travelPrice });
    },
  };

  return (
    <div css={pageLayoutWrapper}>
      <div css={addTravelWrapper}>
        <h1>새로운 여행 계획하기</h1>
        <GrayBack title={'제목'} padding={true}>
          <input
            css={noneStyleInput}
            type="text"
            placeholder="30자 내외로 작성해주세요."
            onChange={(e) => changeHandlers.changeTitle(e.target.value)}
            value={data.travelTitle || ''}
          />
        </GrayBack>
        <ImageUploadField imageUrl={thumbnail} setImageUrl={setThumbnail} title={'대표 이미지'} />
        <Introduction content={content} setContent={setContent} />
        <Course
          courseList={courseList}
          addCourse={handleAddCourse}
          removeCourse={handleRemoveCourse}
        />
        <ChoiceTags choseTag={choseTag} setChoseTag={setChoseTag} />
        <ScheduleTeam
          scheduleList={scheduleList}
          addField={handleAddSchedule}
          removeField={handleRemoveSchedule}
        />
        <GrayBack title={'가격'} price={true} padding={true}>
          <input
            css={noneStyleInput}
            type="number"
            placeholder="0"
            onChange={(e) => changeHandlers.changePrice(Number(e.target.value))}
            value={data.travelPrice}
          />
          <span css={{ marginRight: '5px' }}>원</span>
          <span css={{ fontSize: '14px' }}>/ 1인</span>
        </GrayBack>
        {sections.includes('포함내용') && <Details title={'포함내용'} />}
        {sections.includes('미포함내용') && <Details title={'미포함내용'} />}
        {sections.includes('이용안내') && <Details title={'이용안내'} />}
        {sections.includes('FAQ') && <Details title={'FAQ'} />}
      </div>

      <FloatingMenu
        onSubmit={handleAddTravel}
        sections={sections}
        setOpenSection={setOpenSection}
      />
    </div>
  );
};

export default AddTravel;

export const addTravelWrapper = css`
  position: relative;
  width: 680px;
  margin-right: 200px;
  & h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const noneStyleInput = css`
  width: 100%;
  background-color: transparent;
  border: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
`;

export const pageLayoutWrapper = css`
  display: flex;
  position: relative;
`;
